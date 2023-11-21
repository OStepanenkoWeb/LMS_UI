"use client";
import DashboardHero from "@/app/components/Admin/DashboardHero";
import AdminProtected from "@/app/hooks/useAdminProtected";
import Heading from "@/app/utils/Heading";
import React from "react";
import AdminSidebar from "@/app/components/Admin/Sidebar/AdminSidebar";
import EditHero from "@/app/components/Admin/Customization/EditHero";

const page = () => {
    return (
        <div>
            <AdminProtected>
                <Heading
                    title='LMS - Панель администратора'
                    description='Обучающая платформа для преподавателей и слушателей'
                    keywords="Разработка, программирование, обучение, LMS"
                />
                <div className="flex h-screen">
                    <div className="1500px:w-[16%] w-1/5">
                        <AdminSidebar />
                    </div>
                    <div className="w-[85%]">
                        <DashboardHero />
                        <EditHero />
                    </div>
                </div>
            </AdminProtected>
        </div>
    );
};

export default page;