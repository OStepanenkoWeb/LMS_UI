import React, { useState } from 'react';
import { IoMdNotificationsOutline } from 'react-icons/io';
import ThemeSwitcher from "@/app/utils/ThemeSwitcher";

type Props = {};

const DashboardHeader = () => {
    const [open, setOpen] = useState(false);
    return (
        <div className='w-full flex items-center justify-end p-6 fixed top-5 right-0'>
            <ThemeSwitcher />
            <div
                className='relative cursor-pointer m-2'
                onClick={() => setOpen(!open)}
            >
                <IoMdNotificationsOutline className='text-2xl cursor-pointer dark:text-white text-black' />
                <span className='absolute -top-2 -right-2 bg-[#3ccba0] rounded-full w-[20px] h-[20px] text-[12px] flex items-center justify-center text-white'>
					3
				</span>
            </div>
            {open && (
                <div className='w-[350px] h-[50vh] overflow-y-auto dark:bg-[#111c43] bg-white shadow-xl absolute top-16 z-10 rounded'>
                    <h5 className='text-center text-[20px] text-black dark:text-white p-3'>
                        Уведомления
                    </h5>
                    <div className='dark:bg-[#2d3a4ea1] bg-[#00000013] border-b dark:border-b-[#ffffff47] border-b-[#0000000f]'>
                        <div className='w-full items-center justify-between p-2'>
                            <p className='text-black dark:text-white'>
                                Получены новые вопросы
                            </p>
                            <p className='text-black dark:text-white cursor-pointer'>
                                Пометить как прочитанное
                            </p>
                        </div>
                        <p className='px-2 text-black dark:text-white'>
                            Текст какого то комментария или вопроса к курсам
                        </p>
                        <p className='p-2 text-black dark:text-white  text-[14px]'>
                            5 дней назад
                        </p>
                    </div>
                    <div className='dark:bg-[#2d3a4ea1] bg-[#00000013] border-b dark:border-b-[#ffffff47] border-b-[#0000000f]'>
                        <div className='w-full items-center justify-between p-2'>
                            <p className='text-black dark:text-white'>
                                Получены новые вопросы
                            </p>
                            <p className='text-black dark:text-white cursor-pointer'>
                                Пометить как прочитанное
                            </p>
                        </div>
                        <p className='px-2 text-black dark:text-white'>
                            Текст какого то комментария или вопроса к курсам
                        </p>
                        <p className='p-2 text-black dark:text-white  text-[14px]'>
                            5 дней назад
                        </p>
                    </div>
                    <div className='dark:bg-[#2d3a4ea1] bg-[#00000013] border-b dark:border-b-[#ffffff47] border-b-[#0000000f]'>
                        <div className='w-full items-center justify-between p-2'>
                            <p className='text-black dark:text-white'>
                                Получены новые вопросы
                            </p>
                            <p className='text-black dark:text-white cursor-pointer'>
                                Пометить как прочитанное
                            </p>
                        </div>
                        <p className='px-2 text-black dark:text-white'>
                            екст какого то комментария или вопроса к курсам
                        </p>
                        <p className='p-2 text-black dark:text-white  text-[14px]'>
                            5 дней назад
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DashboardHeader;