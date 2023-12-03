"use client";
import { useGetUsersAllCoursesQuery } from "@/redux/features/courses/coursesApi";
import { useGetHeroDataQuery } from "@/redux/features/layout/layoutApi";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Loader from "@/app/components/Loader/Loader";
import Header from "@/app/components/Header";
import Heading from "@/app/utils/Heading";
import {styles} from "@/app/styles/style";
import CourseCard from "@/app/components/Course/CourseCard";
import Footer from "@/app/components/Footer";

const Page = () => {
    const searchParams = useSearchParams();
    const search = searchParams?.get("title");
    const { data, isLoading } = useGetUsersAllCoursesQuery(undefined, {});
    const { data: categoriesData } = useGetHeroDataQuery("Categories", {});
    const [route, setRoute] = useState("Login");
    const [open, setOpen] = useState(false);
    const [courses, setCourse] = useState([]);
    const [category, setCategory] = useState("All");

    useEffect(() => {
        console.log(category, data?.courses)
        console.log(category === ('All'))
        if (category === ('All')) {
            setCourse(data?.courses);
        }
        if (category !== ('All')) {
            setCourse(
                data?.courses.filter((item: any) => item.categories.find((cat: any) => cat.title === category))
            );
        }
        if (search) {
            setCourse(
                data?.courses.filter((item: any) =>
                    item.name.toLowerCase().includes(search.toLowerCase())
                )
            );
        }
    }, [data, category, search]);

    const categories = categoriesData?.layout.categories;

    return (
        <div>
            {isLoading ? (
                <Loader />
            ) : (
                <>
                    <Header
                        route={route}
                        setRoute={setRoute}
                        open={open}
                        setOpen={setOpen}
                        activeItem={1}
                    />
                    <div className="w-[95%] 800px:w-[85%] m-auto min-h-[70vh]">
                        <Heading
                            title={"Все курсы - LMS"}
                            description={"LMS - сообщество разработчиков."}
                            keywords={
                                "сообщество разработчиков, навыки разработки, мнения экспертов, объединение, рост"
                            }
                        />
                        <br />
                        <div className="w-full flex items-center flex-wrap">
                            <div
                                className={`h-[35px] ${category === "All" ? "bg-[#ffffff] text-black"
                                    : "bg-[#9a9797]"
                                } m-3 px-3 rounded-[30px] flex items-center justify-center font-Montserrat cursor-pointer`}
                                onClick={() => setCategory("All")}
                            >
                                Все категории
                            </div>
                            {categories &&
                                categories.map((item: any, index: number) => (
                                    <div key={index}>
                                        <div
                                            className={`h-[35px] ${category === item.title
                                                ? "bg-[#ffffff] text-black"
                                                : "bg-[#878496]"
                                            } m-3 px-3 rounded-[30px] flex items-center justify-center font-Poppins cursor-pointer`}
                                            onClick={() => setCategory(item.title)}
                                        >
                                            {item.title}
                                        </div>
                                    </div>
                                ))}
                        </div>
                        {
                            courses && courses.length === 0 && (
                                <p className={`${styles.label} justify-center min-h-[50vh] flex items-center`}>
                                    {search ? "Курсы не найдены!" : "Не найдены курсы в выбранной категории. Попробуйте изменить категорию!"}
                                </p>
                            )
                        }
                        <br />
                        <br />
                        <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] 1500px:grid-cols-4 1500px:gap-[35px] mb-12 border-0">
                            {courses &&
                                courses.map((item: any, index: number) => (
                                    <CourseCard item={item} key={index} />
                                ))}
                        </div>
                    </div>
                    <Footer />
                </>
            )}
        </div>
    );
};

export default Page;