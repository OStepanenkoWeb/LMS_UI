"use client";
import React, { useState } from "react";
import Heading from "@/app/utils/Heading";
import Header from "@/app/components/Header";
import FAQ from "@/app/components/FAQ/FAQ";
import Footer from "@/app/components/Footer";

const Page = () => {
    const [open, setOpen] = useState(false);
    const [activeItem] = useState(4);
    const [route, setRoute] = useState("Login");

    return (
        <div className="min-h-screen">
            <Heading
                title='LMS'
                description='Обучающая платформа для преподавателей и слушателей'
                keywords="Разработка, программирование, обучение, LMS"
            />
            <Header
                open={open}
                setOpen={setOpen}
                activeItem={activeItem}
                setRoute={setRoute}
                route={route}
            />
            <br />
            <FAQ />
            <Footer />
        </div>
    );
};

export default Page;