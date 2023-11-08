'use client'

import React, {FC} from 'react';
import Heading from "@/app/utils/Heading";
import AdminSidebar from "@/app/components/Admin/Sidebar/AdminSidebar";
import AdminProtected from "@/app/hooks/useAdminProtected";

const Page:FC = () => {
    return (
        <AdminProtected>
            <div>
                <Heading
                    title='LMS - Панель администратора'
                    description='Обучающая платформа для преподавателей и слушателей'
                    keywords="Разработка, программирование, обучение, LMS"
                />
                <div className='flex h-[200vh]'>
                    <div className='1500px:w-[16%] w-1/5'>
                        <AdminSidebar/>
                    </div>
                    <div className='w-[85%]'>

                    </div>
                </div>

            </div>
        </AdminProtected>
    );
};

export default Page;