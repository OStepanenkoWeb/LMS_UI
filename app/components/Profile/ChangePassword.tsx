import React, {FC, useEffect, useState} from 'react';
import {useUpdatePasswordMutation} from "@/redux/features/user/userApi";
import toast from "react-hot-toast";
import {styles} from "@/app/styles/style";

const ChangePassword:FC = () => {
    const [confirm, setConfirm] = useState('')
    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')

    const [updatePassword, { isSuccess, error }] = useUpdatePasswordMutation()

    useEffect(() => {
        if (isSuccess) {
            toast.success('Ваш пароль успешно обновлен')
        }

        if(error) {
            if('data' in error) {
                const errorData = error as any
                toast.error(errorData.data.message)
            }
        }
    }, [isSuccess, error])

    const passwordChangeHandler = async (event: any) => {
        event.preventDefault();
        if (newPassword !== confirm) {
            toast.error('Новый пароль и его повтор не совпадают');
        } else {
            await updatePassword({
                oldPassword: oldPassword,
                newPassword: newPassword,
            });
        }
    };
    return (
        <div className='w-full pl-7 px-2 800px:px-5 800px:pl-0'>
            <h1 className='block text-[25px] 800px:text-[30px] font-poppins text-center font-[500] dark:text-white text-black pb-2 '>
                Редактирование пароля
            </h1>
            <div className='w-full dark:text-white text-black '>
                <form
                    aria-required
                    onSubmit={passwordChangeHandler}
                    className='flex flex-col items-center'
                >
                    <div className='w-[100%] 800px:w-[60%] mt-5'>
                        <label className='block dark:text-white text-black'>Введите Ваш прежний пароль</label>
                        <input
                            type='password'
                            className={`${styles.input} !w-[95%] mb-4 800px:mb-0 dark:text-white text-black`}
                            required
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                        />
                    </div>
                    <div className='w-[100%] 800px:w-[60%] mt-5'>
                        <label className='block dark:text-white text-black'>Введите Ваш новый пароль</label>
                        <input
                            type='password'
                            className={`${styles.input} !w-[95%] mb-4 800px:mb-0 dark:text-white text-black`}
                            required
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                    </div>
                    <div className='w-[100%] 800px:w-[60%] mt-5'>
                        <label className='block dark:text-white text-black'>
                            Повторите новый пароль
                        </label>
                        <input
                            type='password'
                            className={`${styles.input} !w-[95%] mb-4 800px:mb-0 dark:text-white text-black`}
                            required
                            value={confirm}
                            onChange={(e) => setConfirm(e.target.value)}
                        />
                        <input
                            type='submit'
                            value='Обновить пароль'
                            className={`w-[95%] h-[40px] border border-[#37a39a] text-center dark:text-white text-black mt-8 cursor-pointer rounded-[3px]`}
                        />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ChangePassword;