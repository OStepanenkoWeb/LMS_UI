import React, {FC, useEffect, useState} from 'react';
import Link from "next/link";
import NavItems from "@/app/utils/NavItems";
import ThemeSwitcher from "@/app/utils/ThemeSwitcher";
import {HiOutlineMenuAlt3, HiOutlineUserCircle} from "react-icons/hi";
import CustomModal from "@/app/utils/CustomModal";
import Login from "@/app/components/Auth/Login";
import SignUp from "@/app/components/Auth/SignUp";
import Verification from "@/app/components/Auth/Verification";
import {useSelector} from "react-redux";
import Image from "next/image";
import avatar from '../../public/avatars/avatar.png'
import {useSession} from "next-auth/react";
import {useLogOutQuery, useSocialAuthMutation} from "@/redux/features/auth/authApi";
import toast from "react-hot-toast";
import {useLoadUserQuery} from "@/redux/features/api/apiSlice";
import {GetStaticUrl} from "@/app/utils/GetStaticPath";

interface IHeaderProps {
    open: boolean
    setOpen: (open: boolean) => void
    activeItem: number
    route: string
    setRoute: (route: string) => void
}

const Header: FC<IHeaderProps> = ({activeItem, setOpen, route, setRoute, open}) => {
    const [active, setActive] = useState(false)
    const [openSidebar, setOpenSidebar] = useState(false)
    const {user} = useSelector((state: any) => state.auth)
    const {data} = useSession()
    const [socialAuth, {error, isSuccess}] = useSocialAuthMutation()
    const [logout, setLogout] = useState(false)

    const {} = useLoadUserQuery(undefined, {
        skip: !user.auth && !isSuccess
    })
    const {} = useLogOutQuery(undefined, {
        skip: !logout,
    })

    useEffect(() => {
        if(!user) {
           if(data) {
               socialAuth({
                       email: data?.user?.email,
                       name: data?.user?.name,
                       avatar: data?.user?.image,
                   })
           }
        }

        if(isSuccess) {
            toast.success('Вы успешно авторизовались')
        }


        if(!data && user === null) {
            setLogout(true)
        }

        if (error) {
            if('data' in error) {
                const errorData = error as any
                toast.error(errorData.data.message)
            }
        }

    }, [data, user, error, isSuccess, socialAuth])

    if (typeof window !== 'undefined') {
        window.addEventListener('scroll', () => {
            setActive(window.scrollY > 85)
        })
    }

    const handleClose = (emmit: any) => {
        if (emmit.target.id === 'screen') {
            setOpenSidebar(false)

        }
    }

    const mapComponent= new Map([
        ['Login', Login],
        ['SignUp', SignUp],
        ['Verification', Verification]
    ])

    let component = mapComponent.get(route || 'Login')

    return (<div className='w-full relative'>
            <div
                className={`${active ? 'dark: bg-opacity-50 dark:bg-gradient-to-b dark:from-gray-900 dark:to-black fixed top-0 left-0 w-full h-[80px] z-[80] border-b dark:border-[#ffffff1c] shadow-xl transition duration-500' : 'w-full border-b dark:border-[#ffffff1c] h-[80px] z-[80] dark:shadow'}`}>

                <div>
                    <div className='w-[95%] 800px:w-[92%] m-auto py-2 h-full'>
                        <div className='w-full h-[80px] flex items-center justify-between p-3'>
                                <Link
                                    href={"/"}
                                    className={`text-3xl font-Montserrat font-[500] text-black dark:text-white`}
                                >
                                    LMS
                                </Link>
                            <div className="flex items-center">
                                <NavItems
                                    activeItem={activeItem}
                                    isMobile={false}
                                />
                                <ThemeSwitcher/>
                                {/* only for mobile */}
                                <div className="800px:hidden">
                                    <HiOutlineMenuAlt3
                                        size={25}
                                        className="cursor-pointer dark:text-white text-black"
                                        onClick={() => setOpenSidebar(true)}
                                    />
                                </div>
                                {
                                    user ? (
                                        <Link href={'/profile'}>
                                            <Image
                                                src={GetStaticUrl(user.avatar || avatar)}
                                                alt=''
                                                className='w-[30px] h-[30px] rounded-full cursor-pointer'
                                                width={30} height={30}
                                                style={{border: activeItem === 5 ? '2px solid #37a39a' : 'none'}}
                                            />
                                        </Link>
                                    ) : (
                                        <HiOutlineUserCircle
                                            size={25}
                                            className='hidden 800px:block cursor-pointer dark:text-white text-black'
                                            onClick={() => setOpen(true)}
                                        />
                                    )
                                }

                            </div>
                        </div>
                    </div>
                    {/* mobile sidebar*/}
                    {openSidebar && (<div
                            className="fixed w-full h-screen top-0 left-0 z-[99999] dark:bg-[unset] bg-[#00000024]"
                            onClick={handleClose}
                            id='screen'
                        >
                            <div
                                className='w-[70%] fixed z-[999999999] h-screen bg-white dark:bg-slate-900 dark:bg-opacity-90 top-0 right-0'>
                                <NavItems activeItem={activeItem} isMobile={true}/>
                                <HiOutlineUserCircle
                                    size={25}
                                    className='cursor-pointer ml-5 my-2 dark:text-white text-black'
                                    onClick={() => setOpen(true)}
                                />
                                <br/>
                                <br/>
                                <p className='text-[16px] px-2 pl-5 text-black dark:text-white'>
                                    Copyring © 2023 ООО Техностек
                                </p>
                            </div>
                        </div>)}
                </div>

            </div>

            {open && (<CustomModal
                    open={open}
                    setOpen={setOpen}
                    setRoute={setRoute}
                    activeItem={activeItem}
                    component={component}
                />)}
        </div>)
};

export default Header;