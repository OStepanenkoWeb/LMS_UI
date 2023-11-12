import React, {FC, useEffect, useState} from 'react';
import Image from "next/image";
import {IUser} from "@/app/interfaces/IUser";
import avatarDefault from '../../../public/avatars/avatar.png'
import {AiOutlineCamera} from "react-icons/ai";
import {useUpdateAvatarMutation, useUpdateProfileMutation} from "@/redux/features/user/userApi";
import {useLoadUserQuery} from "@/redux/features/api/apiSlice";
import {styles} from "@/app/styles/style";
import {GetStaticUrl} from "@/app/utils/GetStaticPath";
import toast from "react-hot-toast";
import {uploadAvatar} from "@/app/utils/Supabase";

interface IProfileInfo {
    user: IUser
}

const ProfileInfo:FC<IProfileInfo> = ({user}) => {
    const [name, setName] =  useState(user?.name || 'Инкогнито')
    const [loadUser, setLoadUser] =  useState(false)
    const [updateAvatar, {isSuccess: isSuccessUpdateAvatar , error: errorUpdateAvatar}] = useUpdateAvatarMutation()
    const [updateProfile, {isSuccess: isSuccessUpdateProfile , error: errorUpdateProfile}] = useUpdateProfileMutation()
    const {} = useLoadUserQuery(undefined, {
        skip: !loadUser
    })

    useEffect(() => {
        if(isSuccessUpdateProfile) {
            setLoadUser(true)
        }

        if (isSuccessUpdateProfile) {
            toast.success('Имя вашего профиля успешно обновлено')
        }

        if(errorUpdateAvatar || errorUpdateProfile) {
            if((errorUpdateAvatar && 'data' in errorUpdateAvatar) || (errorUpdateProfile && 'data' in errorUpdateProfile)) {
                const errorData = errorUpdateAvatar as any || errorUpdateProfile as any
                toast.error(errorData.data.message)
            }
        }

    }, [isSuccessUpdateAvatar, errorUpdateAvatar, errorUpdateProfile, isSuccessUpdateProfile])



    const imageHandler = async (event: any) => {

       const avatar = await uploadAvatar(event.target.files[0])

        updateAvatar({avatar: avatar})
    }

    const handleSubmit = async (event: any) => {
        event.preventDefault()

        if(name !== '') {
            await updateProfile({
                name: name
            })
        } else {
            toast.error('Имя не может быть пустым')
        }

    }


    return (
        <>
            <div className="w-full flex justify-center">
                <div className="relative">
                    <Image
                        src={GetStaticUrl(user?.avatar as string || avatarDefault)}
                        alt=""
                        width={120}
                        height={120}
                        className="w-[120px] h-[120px] cursor-pointer border-[3px] border-[#37a39a] rounded-full"
                    />
                    <input
                        type="file"
                        name=""
                        id="avatar"
                        className="hidden"
                        onChange={imageHandler}
                        accept="image/png,image/jpg,image/jpeg,image/webp"
                    />
                    <label htmlFor="avatar">
                        <div className="w-[30px] h-[30px] bg-slate-900 rounded-full absolute bottom-2 right-2 flex items-center justify-center cursor-pointer">
                            <AiOutlineCamera size={20} className="z-1" />
                        </div>
                    </label>
                </div>
            </div>
            <br />
            <br />
            <div className="w-full pl-6 800px:pl-10">
                <form onSubmit={handleSubmit}>
                    <div className="800px:w-[50%] m-auto block pb-4">
                        <div className="w-[100%]">
                            <label className="block pb-2 dark:text-white text-black">
                                Полное имя
                            </label>
                            <input
                                name="name"
                                type="text"
                                className={`${styles.input} !w-[95%] mb-4 800px:mb-0 dark:text-white text-black `}
                                required
                                value={name}
                                onChange={(e) => {setName(e.target.value)}}
                            />
                        </div>
                        <div className="w-[100%] pt-2">
                            <label className="block pb-2 dark:text-white text-black">
                                Email
                            </label>
                            <input
                                type="text"
                                readOnly
                                className={`${styles.input} !w-[95%] mb-1 800px:mb-0 dark:text-white text-black`}
                                required
                                value={user?.email}
                            />
                        </div>
                        <input
                            className={`w-full 800px:w-[250px] h-[40px] border border-[#37a39a] text-center dark:text-[#fff] text-black rounded-[3px] mt-8 cursor-pointer`}
                            required
                            value="Обновить"
                            type="submit"
                        />
                    </div>
                </form>
                <br />
            </div>
        </>
    );
};

export default ProfileInfo;