"use client";
import React from "react";
import Heading from "@/app/utils/Heading";
import AdminSidebar from "@/app/components/Admin/Sidebar/AdminSidebar";
import DashboardHeader from "@/app/components/Admin/DashboardHeader";
import UserAnalytics from "@/app/components/Admin/Analytics/UserAnalytics";

const page = () => {
    return (
        <div>
            <Heading
                title='LMS - Панель администратора'
                description='Обучающая платформа для преподавателей и слушателей'
                keywords="Разработка, программирование, обучение, LMS"
            />
            <div className="flex">
                <div className="1500px:w-[16%] w-1/5">
                    <AdminSidebar />
                </div>
                <div className="w-[85%]">
                    <DashboardHeader />
                    <UserAnalytics />
                </div>
            </div>
        </div>
    );
};

export default page;