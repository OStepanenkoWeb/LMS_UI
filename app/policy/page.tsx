"use client";
import React, { useState } from "react";
import Heading from "@/app/utils/Heading";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import Policy from "@/app/components/Policy/Policy";

const Page = () => {
    const [open, setOpen] = useState(false);
    const [activeItem, setActiveItem] = useState(3);
    const [route, setRoute] = useState("Login");

    return (
        <div>
            <Heading
                title={"Все курсы - LMS"}
                description={"LMS - сообщество разработчиков."}
                keywords={
                    "сообщество разработчиков, навыки разработки, мнения экспертов, объединение, рост"
                }
            />
            <Header
                open={open}
                setOpen={setOpen}
                activeItem={activeItem}
                setRoute={setRoute}
                route={route}
            />
            <Policy />
            <Footer />
        </div>
    );
};

export default Page;