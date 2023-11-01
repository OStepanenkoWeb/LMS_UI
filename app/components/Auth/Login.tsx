'use client'

import React, {FC, useState} from 'react';
import * as Yup from 'yup'
import {useFormik} from "formik";
import {styles} from "@/app/styles/style";
import {AiFillGithub, AiOutlineEye, AiOutlineEyeInvisible} from "react-icons/ai";
import {FcGoogle} from "react-icons/fc";
import Input from "@/app/components/Inputs/Input";

interface ILogin {
    setRoute: (route: string) => void

}

const schema = Yup.object().shape({
    email: Yup.string().email("Не верный формат email").required("Пожалуйста укажите свой email"),
    password: Yup.string().required("Пожалуйста укажите свой пароль").min(6)
})

const Login: FC<ILogin> = ({setRoute}) => {
    const [show, setShow] = useState<boolean>(false)

    const formik = useFormik({
        initialValues: {email: '', password: ''},
        validationSchema: schema,
        onSubmit: async ({email, password}) => {

        }
    })

    const {errors, touched, values, handleChange, handleSubmit} = formik
    console.log('Render Login')

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
                    handleChange={handleChange}
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
                    />
                    <AiFillGithub
                        size={30}
                        className='cursor-pointer ml-2'
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