'use client'

import {FC, useState} from "react";
import Heading from "@/app/utils/Heading";
import Header from "./components/Header.tsx"
import Hero from "@/app/components/Route/Hero";

interface IProps {
}

const Page: FC<IProps> = () => {
    const [open, setOpen] = useState(false)
    const [activeItem, setActiveItem] = useState(5)
    const [route, setRoute] = useState("Login")

    return (
        <div>
            <Heading
                title="LMS"
                description="Обучающая платформа для преподавателей и слушателей"
                keywords="Разработка, программирование, обучение, LMS">
            </Heading>
            <Header
                open={open}
                setOpen={setOpen}
                activeItem={activeItem}
                setRoute={setRoute}
                route={route}
            />
            <Hero/>
        </div>
    )

}

export default Page
