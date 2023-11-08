'use client';
import React from 'react';
import AdminSidebar from '@/app/components/Admin/Sidebar/AdminSidebar';
import Heading from '@/app/utils/Heading';
import CreateCourse from '@/app/components/Admin/Course/CreateCourse';
import DashboardHeader from '@/app/components/Admin/DashboardHeader';

type Props = {};

const Page = () => {
    return (
        <div>
            <Heading
                title='LMS - Панель администратора'
                description='Обучающая платформа для преподавателей и слушателей'
                keywords="Разработка, программирование, обучение, LMS"
            />
            <div className='flex'>
                <div className='1500px:w-[16%] w-[1/5]'>
                    <AdminSidebar />
                </div>
                <div className='w-[85%]'>
                    <DashboardHeader />
                    <CreateCourse />
                </div>
            </div>
        </div>
    );
};

export default Page