import React, {FC, useEffect, useState} from 'react';
import {styles} from "@/app/styles/style";
import Input from "@/app/components/Inputs/Input";
import {useFormik} from "formik";
import * as Yup from 'yup'
import {AiFillGithub, AiOutlineEye, AiOutlineEyeInvisible} from "react-icons/ai";
import {FcGoogle} from "react-icons/fc";
import {useRegisterMutation} from "@/redux/features/auth/authApi";
import toast from "react-hot-toast";

interface ISignUp {
    setRoute: (route: string) => void

}

const schema = Yup.object().shape({
    name: Yup.string().required("Введите пожалуйста свое имя"),
    email: Yup.string().email("Не верный формат email").required("Пожалуйста укажите свой email"),
    password: Yup.string().required("Пожалуйста укажите свой пароль").min(6)
})

const SignUp:FC<ISignUp> = ({setRoute}) => {
    const [show, setShow] = useState<boolean>(false)
    const [register, {isSuccess, data, error}] = useRegisterMutation()

    useEffect(() => {
        if(isSuccess){
            const message = data?.message || 'Registration successful'
            toast.success(message)
            setRoute('Verification')
        }
         if (error) {
             if('data' in error) {
                 const errorData = error as any
                 toast.error(errorData.data.message)
             }
         }
    }, [isSuccess, error])

    const formik = useFormik({
        initialValues: { name: '', email: '', password: ''},
        validationSchema: schema,
        onSubmit: async ({name, email, password}) => {
            const data = {
                name,
                email,
                password
            }
            await register(data)
        }
    })

    const {errors, touched, values, handleChange, handleSubmit} = formik

    return (
        <div className='w-full'>
            <h1 className={`${styles.title}`}>
                Регистрация
            </h1>
            <form onSubmit={handleSubmit}>
                <Input
                    id='name'
                    errors={errors}
                    values={values}
                    touched={touched}
                    placeholder='Иванов Иван'
                    className='mb-3'
                    label='Введите свое имя'
                    handleChange={handleChange}
                />
                <Input
                    id='email'
                    errors={errors}
                    values={values}
                    touched={touched}
                    placeholder='loginmail@mail.ru'
                    label='Введите свой email'
                    type='email'
                    handleChange={handleChange}
                />
                <Input
                    id='password'
                    errors={errors}
                    values={values}
                    touched={touched}
                    label='Введите пароль'
                    type={!show ? 'password' : 'text'}
                    placeholder='Пароль!#%'
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
                    />
                    <AiFillGithub
                        size={30}
                        className='cursor-pointer ml-2'
                    />
                </div>
                <h5 className='text-center pt-4 fontPoppins text-[14px]'>
                    Уже зарегестрированны?{""}
                    <span
                        className='text-[#2190ff] pl-1 cursor-pointer'
                        onClick={() => setRoute('Login')}
                    >
                        Войти
                    </span>
                </h5>
                <br/>
            </form>
        </div>
    );
};

export default SignUp;