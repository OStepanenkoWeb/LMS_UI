'use client'

import React, {FC, useEffect, useState} from 'react';
import * as Yup from 'yup'
import {useFormik} from "formik";
import {styles} from "@/app/styles/style";
import {AiFillGithub, AiOutlineEye, AiOutlineEyeInvisible} from "react-icons/ai";
import {FcGoogle} from "react-icons/fc";
import Input from "@/app/components/Inputs/Input";
import {useLoginMutation} from "@/redux/features/auth/authApi";
import toast from "react-hot-toast";
import {signIn} from "next-auth/react";

interface ILogin {
    setRoute: (route: string) => void
    setOpen: (open: boolean) => void
    refetch?: any
}

const schema = Yup.object().shape({
    email: Yup.string().email("Не верный формат email").required("Пожалуйста укажите свой email"),
    password: Yup.string().required("Пожалуйста укажите свой пароль").min(6)
})

const Login: FC<ILogin> = ({setRoute, setOpen, refetch}) => {
    const [show, setShow] = useState<boolean>(false)
    const [login, { isSuccess, error }] = useLoginMutation()

    const formik = useFormik({
        initialValues: {email: '', password: ''},
        validationSchema: schema,
        onSubmit: async ({email, password}) => {
            await login({email, password})
        }
    })

    useEffect(() => {
        if(isSuccess) {
            toast.success('Вы успешно авторизовались')
            setOpen(false)
            refetch()
        }

        if (error) {
            if('data' in error) {
                const errorData = error as any
                toast.error(errorData.data.message)
            }
        }

    }, [isSuccess, error])

    const {errors, touched, values, handleChange, handleSubmit} = formik

    const handleChangeInput = (event:React.ChangeEvent<any>) => {
        handleChange(event)
    }

    return (
        <div className='w-full'>
            <h1 className={`${styles.title}`}>
                Авторизация
            </h1>
            <form onSubmit={handleSubmit}>
                <Input
                    id='email'
                    errors={errors}
                    values={values}
                    touched={touched}
                    placeholder='loginmail@mail.ru'
                    label='Введите свой email'
                    type='email'
                    handleChange={handleChangeInput}
                />
                <Input
                    id='password'
                    errors={errors}
                    values={values}
                    touched={touched}
                    label='Введите пароль'
                    placeholder='Пароль!#%'
                    type={!show ? 'password' : 'text'}
                    icon={!show ? AiOutlineEyeInvisible : AiOutlineEye}
                    handleChange={handleChange}
                    handleIcon={() => setShow(!show)}
                />
                <div className='w-full mt-5'>
                    <input
                        type='submit'
                        value='Войти'
                        className={`${styles.button}`}
                    />
                </div>
                <br/>
                <h5 className='text-center pt-4 font-Poppins text-[14px] text-black dark:text-white'>
                    Или войдите через
                </h5>
                <div className='flex items-center justify-center my-3'>
                    <FcGoogle
                        size={30}
                        className='cursor-pointer mr-2'
                        onClick={() => signIn('google')}
                    />
                    <AiFillGithub
                        size={30}
                        className='cursor-pointer ml-2'
                        onClick={() => signIn('github')}
                    />
                </div>
                <h5 className='text-center pt-4 fontPoppins text-[14px]'>
                    Еще не зарегестрированны?{""}
                    <span
                        className='text-[#2190ff] pl-1 cursor-pointer'
                        onClick={() => setRoute('SignUp')}
                    >
                        Зарегестрироваться
                    </span>
                </h5>
                <br/>
            </form>
        </div>
    );
};

export default Login;