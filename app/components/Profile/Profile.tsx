'use client'

import React, {FC, useState} from 'react';
import SidebarProfile from "@/app/components/Profile/SidebarProfile";
import {IUser} from "@/app/interfaces/IUser";
import {useLogOutQuery} from "@/redux/features/auth/authApi";
import {signOut} from "next-auth/react";
import ProfileInfo from "@/app/components/Profile/ProfileInfo";
import ChangePassword from "@/app/components/Profile/ChangePassword";

interface IProfile {
    user: IUser
}

const Profile:FC<IProfile> = ({user}) => {
    const [scroll, setScroll] = useState(false)
    const [active, setActive] = useState(1)
    const [logout, setLogout] = useState(false)
    const {} = useLogOutQuery(undefined, {
        skip: !logout
    })

    const logOutHandler = async () => {
        setLogout(true)
        await signOut()
    }

    if(typeof window !== 'undefined') {
        window.addEventListener('scroll', () => {
            setScroll(window.scrollY > 85)
        })
    }
    return (
        <div className='w-[85%] flex mx-auto'>
            <div className={`w-[60px] 800px:w-[310px] h-[450px] dark:bg-slate-900 bg-white bg-opacity-90 dark:border-[#ffffff1d] border-[#000] rounded-[5px] shadow-xl mt-[80px] mb-[80px] sticky ${
                scroll ? 'top-[120px]' : 'top-[30px]'
            } left-[30px] `}>
                <SidebarProfile
                    user={user}
                    active={active}
                    setActive={setActive}
                    logOutHandler={logOutHandler}
                />
            </div>
            {
                active === 1 && (
                    <div className='w-full h-full bg-transparent mt-[80px]'>
                        <ProfileInfo user={user}/>
                    </div>
                )
            }
            {
                active === 2 && (
                    <div className='w-full h-full bg-transparent mt-[80px]'>
                        <ChangePassword/>
                    </div>
                )
            }
        </div>
    );
};

export default Profile;