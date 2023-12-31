'use client'
import React, {FC, useState} from 'react';
import Protected from "@/app/hooks/useProtected";
import Heading from "@/app/utils/Heading";
import Header from "@/app/components/Header";
import {useSelector} from "react-redux";
import Profile from "@/app/components/Profile/Profile";
import Footer from "@/app/components/Footer";

const Page:FC = () => {
    const [open, setOpen] = useState(false)
    const [activeItem] = useState(5)
    const [route, setRoute] = useState("Login")
    const {user} = useSelector((state: any) => state.auth)

    return (
        <div className='min-h-screen'>
            <Protected>
                <Heading
                    title={`LMS ${user?.name} кабинет пользователя`}
                    description="Обучающая платформа для преподавателей и слушателей"
                    keywords="Разработка, программирование, обучение, LMS"
                />
                <Header
                    open={open}
                    setOpen={setOpen}
                    activeItem={activeItem}
                    setRoute={setRoute}
                    route={route}
                />
                <Profile
                    user={user}
                />
                <Footer />
            </Protected>
        </div>
    );
};

export default Page;