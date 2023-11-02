import React, {FC, RefObject, useEffect, useRef, useState} from 'react';
import {styles} from "@/app/styles/style";
import {VscWorkspaceTrusted} from "react-icons/vsc";
import {useSelector} from "react-redux";
import {useActivationMutation} from "@/redux/features/auth/authApi";
import toast from "react-hot-toast";

interface IVerification {
    setRoute: (route: string) => void
}

type VerifyNumber = {
    0: string
    1: string
    2: string
    3: string
}

const Verification:FC<IVerification> = ({setRoute}) => {
    const {token} = useSelector((state:any) => state.auth)
    const [activation, {isSuccess, error}] =useActivationMutation()
    const [invalidError, setInvalidError] = useState<boolean>(false)
    const [verifyNumber, setVerifyNumber] = useState<VerifyNumber>({
        0: "",
        1: "",
        2: "",
        3: "",
    })
    useEffect(() => {
        if(isSuccess){
            toast.success('Ваш аккаунт активирован')
            setRoute('Login')
        }
        if (error) {
            if('data' in error) {
                const errorData = error as any
                toast.error(errorData.data.message)
                setInvalidError(true)
            } else {
                console.log('An error occurred:', error)
            }
        }
    }, [isSuccess, error])

    const inputRefs: RefObject<HTMLInputElement>[] = [
        useRef<HTMLInputElement | null>(null),
        useRef<HTMLInputElement | null>(null),
        useRef<HTMLInputElement | null>(null),
        useRef<HTMLInputElement | null>(null)
    ]

    const verificationHandler = async () => {
        console.log(verifyNumber)
        const verificationNumber = Object.values(verifyNumber).join('')

        if(verificationNumber.length !== 4) {
            setInvalidError(true)
            return
        }
        console.log(token, verificationNumber)
        await activation({
            activationToken: token,
            activationCode: verificationNumber
        })

    }

    const handleInputChange = (index: number, value: string) => {
        setInvalidError(false)

        const newVerifyNumber = {...verifyNumber, [index]: value}
        setVerifyNumber(newVerifyNumber)

        if(value === '' && index > 0) {
            const current = inputRefs[index - 1].current as HTMLInputElement
            current.focus()
        } else if (value.length ===1 && index < 3) {
            const current = inputRefs[index + 1].current as HTMLInputElement
            current.focus()
        }

    }

    return (
        <div>
            <h1 className={`${styles.title}`}> Верификация Вашего аккаунта</h1>
            <br/>
            <div className='w-full flex items-center justify-center mt-2'>
                <div className="w-[80px] h-[80px] rounded-full bg-[#497DF2] flex items-center justify-center">
                    <VscWorkspaceTrusted size={40}/>
                </div>
            </div>
            <br/>
            <br/>
            <div className='m-auto flex items-center justify-around'>
                {
                    Object.keys(verifyNumber).map((key, index) => (
                        <input
                            type="number"
                            key={key}
                            ref={inputRefs[index]}
                            className={`w-[65px] h-[65px] bg-transparent border-[3px] rounded-[10px] flex items-center text-black dark:text-white justify-center text-[18px] font-Poppins outline-none text-center ${
                                invalidError ? 'shake border-red-500' : 'dark:border-white border-[#0000004a]'
                            }`}
                            placeholder=''
                            maxLength={1}
                            value={verifyNumber[key as keyof VerifyNumber]}
                            onChange={(e) => handleInputChange(index, e.target.value)}
                        />
                    ))
                }
            </div>
            <br/>
            <br/>
            <div className='w-full flex justify-center'>
                <button
                    className={`${styles.button}`}
                    onClick={verificationHandler}
                >
                    Верификация OTP
                </button>
            </div>
            <br/>
            <h5 className='text-center pt-4 fontPoppins text-[14px] text-black dark:text-white'>
                Хотите вернуться к форме входа?
                <span
                    className='text-[#2190ff] pl-1 cursor-pointer'
                    onClick={() => setRoute('Login')}
                >
                    Вернуться
                </span>
            </h5>
        </div>
    );
};

export default Verification;