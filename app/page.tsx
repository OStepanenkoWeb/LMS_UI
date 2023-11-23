'use client'

import {FC, useState} from "react";
import Heading from "@/app/utils/Heading";
import Header from "./components/Header"
import Hero from "@/app/components/Route/Hero";
import Courses from "@/app/components/Route/Courses";
import Reviews from "@/app/components/Route/Reviews";
import FAQ from "@/app/components/FAQ/FAQ";
import Footer from "@/app/components/Footer";

interface IProps {
}

const Page: FC<IProps> = () => {
    const [open, setOpen] = useState(false)
    const [activeItem ] = useState(5)
    const [route, setRoute] = useState("Login")

    return (
        <div>
            <Heading
                title="LMS"
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
            <Hero/>
            <Courses/>
            <Reviews />
            <FAQ />
            <Footer />
        </div>
    )

}

export default Page
