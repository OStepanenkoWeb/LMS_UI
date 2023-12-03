'use client'

import React, {FC, useEffect, useState} from 'react';
import SidebarProfile from "@/app/components/Profile/SidebarProfile";
import {IUser} from "@/app/interfaces/IUser";
import {useLogOutQuery} from "@/redux/features/auth/authApi";
import {signOut} from "next-auth/react";
import ProfileInfo from "@/app/components/Profile/ProfileInfo";
import ChangePassword from "@/app/components/Profile/ChangePassword";
import CourseCard from "@/app/components/Course/CourseCard";
import {useGetUsersAllCoursesQuery} from "@/redux/features/courses/coursesApi";

interface IProfile {
    user: IUser
}

const Profile:FC<IProfile> = ({user}) => {
    const [scroll, setScroll] = useState(false);
    const [logout, setLogout] = useState(false);
    const [courses, setCourses] = useState<any>([]);
    const { data } = useGetUsersAllCoursesQuery(undefined, {});
    const {} = useLogOutQuery(undefined, {
        skip: !logout
    });

    const [active, setActive] = useState(1);

    const logOutHandler = async () => {
        setLogout(true);
        await signOut();
    };

    if (typeof window !== "undefined") {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 85) {
                setScroll(true);
            } else {
                setScroll(false);
            }
        });
    }

    useEffect(() => {
        if (data) {
            const filteredCourses = user.courses
                .map((userCourse: any) =>
                    data.courses.find((course: any) => course._id === userCourse._id)
                )
                .filter((course: any) => course !== undefined);
            setCourses(filteredCourses);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]);

    return (
        <div className='w-[85%] flex mx-auto'>
            <div className={`w-[60px] 800px:w-[310px] h-[450px] dark:bg-slate-900 bg-white bg-opacity-90 dark:border-[#ffffff1d] border-[#000] rounded-[5px] shadow-xl mt-[80px] mb-[80px] sticky ${
                scroll ? 'top-[120px]' : 'top-[30px]'
            } left-[30px] `}>
                <SidebarProfile
                    user={user}
                    active={active}
                    setActive={setActive}
                    logOutHandler={logOutHandler}
                />
            </div>
            {
                active === 1 && (
                    <div className='w-full h-full bg-transparent mt-[80px]'>
                        <ProfileInfo user={user}/>
                    </div>
                )
            }
            {
                active === 2 && (
                    <div className='w-full h-full bg-transparent mt-[80px]'>
                        <ChangePassword/>
                    </div>
                )
            }
            {active === 3 && (
                <div className="w-full pl-7 px-2 800px:px-10 800px:pl-8 mt-[80px]">
                    <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] 1500px:grid-cols-4 1500px:gap-[35px] mb-12 border-0">
                        {courses &&
                            courses.map((item: any, index: number) => (
                                <CourseCard item={item} key={index} isProfile={true} />
                            ))}
                    </div>
                    {courses.length === 0 && (
                        <h1 className="text-center text-[18px] font-Poppins dark:text-white text-black">
                            У вас нет приобретенных курсов.!
                        </h1>
                    )}
                </div>
            )}
        </div>
    );
};

export default Profile;