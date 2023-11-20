'use client'

import React, {FC} from 'react';
import Heading from "@/app/utils/Heading";
import AdminSidebar from "@/app/components/Admin/Sidebar/AdminSidebar";
import DashboardHero from "@/app/components/Admin/DashboardHero";
import AdminProtected from "@/app/hooks/useAdminProtected";
import AllCourses from "@/app/components/Admin/Course/AllCourses";

const Page:FC = () => {
    return (
        <div>
            <AdminProtected>
                    <Heading
                        title='LMS - Панель администратора'
                        description='Обучающая платформа для преподавателей и слушателей'
                        keywords="Разработка, программирование, обучение, LMS"
                    />
                    <div className='flex h-screen'>
                        <div className='1500px:w-[16%] w-1/5'>
                            <AdminSidebar/>
                        </div>
                        <div className='w-[85%]'>
                            <DashboardHero/>
                            <AllCourses/>
                        </div>
                    </div>
            </AdminProtected>
        </div>
    );
};

export default Page;