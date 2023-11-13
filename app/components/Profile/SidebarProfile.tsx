import React, {FC} from 'react';
import {IUser} from "@/app/interfaces/IUser";
import Image from "next/image";
import avatarDefault from '../../../public/avatars/avatar.png'
import {RiLockPasswordLine} from "react-icons/ri";
import {SiCoursera} from "react-icons/si";
import {AiOutlineLogout} from "react-icons/ai";
import {GetStaticUrl} from "@/app/utils/GetStaticPath";
import {MdOutlineAdminPanelSettings} from "react-icons/md";
import Link from "next/link";

interface ISidebarProfile {
    user: IUser
    active: number
    setActive: (active: number) => void
    logOutHandler: () => void
}
const SidebarProfile:FC<ISidebarProfile> = ({user, active, setActive,logOutHandler}) => {
    return (
        <div className='w-full'>
            <div className={`w-full flex items center px-3 py-4 cursor-pointer ${
                active ===1 ? 'dark:bg-slate-800 bg-white' : 'bg-transparent'
            }`}
                 onClick={() => setActive(1)}
            >
                <Image
                    src={GetStaticUrl(user?.avatar as string)}
                    alt=''
                    className={'w-[20px] h-[20px] 800px:w-[30px] 800px:h-[30px] cursor-pointer rounded-full'}
                    width={30} height={30}
                />
                <h5 className='pl-2 800px:block hidden font-Poppins dark:text-white text-black'>
                    Мой аккаунт
                </h5>
            </div>
            <div className={`w-full flex items center px-3 py-4 cursor-pointer ${
                active ===2 ? 'dark:bg-slate-800 bg-white' : 'bg-transparent'
            }`}
                 onClick={() => setActive(2)}
            >
                <RiLockPasswordLine size={20} className="dark:text-white text-black"/>
                <h5 className='pl-2 800px:block hidden font-Poppins dark:text-white text-black'>
                    Сменить пароль
                </h5>
            </div>
            <div className={`w-full flex items center px-3 py-4 cursor-pointer ${
                active ===3 ? 'dark:bg-slate-800 bg-white' : 'bg-transparent'
            }`}
                 onClick={() => setActive(3)}
            >
                <SiCoursera size={20} className="dark:text-white text-black"/>
                <h5 className='pl-2 800px:block hidden font-Poppins dark:text-white text-black'>
                    Мои курсы
                </h5>
            </div>
            {
                user.role === 'admin' && (
                    <Link
                        href={'/admin'}
                        className={`w-full flex items center px-3 py-4 cursor-pointer ${
                        active ===5 ? 'dark:bg-slate-800 bg-white' : 'bg-transparent'
                    }`}
                         onClick={() => setActive(5)}
                    >
                        <MdOutlineAdminPanelSettings size={20} className="dark:text-white text-black"/>
                        <h5 className='pl-2 800px:block hidden font-Poppins dark:text-white text-black'>
                            Панель администратора
                        </h5>
                    </Link>
                )
            }
            <div className={`w-full flex items center px-3 py-4 cursor-pointer ${
                active ===4 ? 'dark:bg-slate-800 bg-white' : 'bg-transparent'
            }`}
                 onClick={() => logOutHandler()}
            >
                <AiOutlineLogout size={20} className="dark:text-white text-black"/>
                <h5 className='pl-2 800px:block hidden font-Poppins dark:text-white text-black'>
                    Выйти
                </h5>
            </div>

        </div>
    );
};

export default SidebarProfile;