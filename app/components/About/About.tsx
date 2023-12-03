'use client'
import React from "react";
import Image from "next/image";
import Link from "next/link";
import {styles} from "@/app/styles/style";
import avatar from '@/public/avatars/avatar.png'
import client1 from '@/public/avatars/client-1.jpg'
import client2 from '@/public/avatars/client-2.jpg'


const About = () => {
    return (
        <>
            <figure className="1500px:px-24 1500px:py-8 900px:flex bg-slate-100 rounded-xl dark:bg-black">

                <Image
                    className="rounded-none mx-auto mt-16"
                    src={avatar}
                    width={50}
                    height={50}
                    alt=""
                />
                <div className="pt-6 md:p-8 text-center md:text-left space-y-4">
                    <blockquote>
                        <br />
                        <h1 className={`${styles.title} 800px:!text-[45px]`}>
                            Что такое <span className="text-gradient">LMS?</span>
                        </h1>
                        <br />
                        <p className="text-lg font-medium">
                            “Готовы ли вы поднять свои навыки программирования на новый уровень? Предлагаем вашему
                            вниманию LMS, сообщество и площадку для разработчиков программного обеспечения, ориентированную
                            на помощь начинающим программистам в достижении своих целей и помогающую раскрыть свои возможности и
                            потенциал.
                            <br />
                            <br />
                            Как основатель и генеральный директор LMS, я не понаслышке знаю о проблемах.
                            которые приходят с обучением и развитием специалиста в индустрии программирования.
                            Вот почему я создал платформу LMS &ndash; позволяющую начинающим рамработчикам получать
                            необходимые ресурсы и поддержку, которые им необходимы для достижения успеха.
                            <br />
                            <br />
                            Наш YouTube-канал — кладезь познавательных видеороликов на
                            всех этапах обучения, от основ программирования до передовых методов разработки. Но
                            это только начало. Наши доступные курсы созданы для того, чтобы
                            дать вам высококачественное образование, необходимое для достижения успеха в
                            професси, не требуя от вас излишних затрат.
                            <br />
                            <br />
                            Но LMS — это больше, чем просто сообщество &ndash; мы являемся
                            семьей. Наше сообщество объединяет единомышленников, чтобы
                            помогать вам на каждом этапе сложного пути обучения, даже если вы только начинаете его
                            или же хотите поднять свои навыки на новый уровень.”
                        </p>
                    </blockquote>
                    <figcaption className="font-medium">
                        <div className="text-sky-500 dark:text-sky-400">
                            stepooleg@gmail.com
                        </div>
                        <div className="text-slate-700 dark:text-slate-500">
                            ООО Техностек
                        </div>
                    </figcaption>
                </div>
            </figure>
            <div >
                <br />
                <h1 className={`${styles.title} 800px:!text-[45px]`}>
                    Информация об авторах <span className="text-gradient">LMS!!</span>
                </h1>
                <br />
                <br />

                <div className="lg:px-80 lg:flex md:flex sm:block mx-10 sm:mx-0">
                    <div className="mx-auto w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 my-10 sm:my-0">
                        <div className="flex flex-col items-center pb-10">
                            <Image className="w-24 h-24 mb-3 rounded-full shadow-lg mt-5" src={client1} alt="Иванов Иван" width={300} height={300}/>
                            <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">Иванов Иван</h5>
                            <span className="text-sm text-gray-500 dark:text-gray-400">Студент последнего курса</span>
                            <div className="flex mt-4 space-x-3 md:mt-6">
                                <Link href="https://www.linkedin.com/in/oleg-stepanenko/" className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Connect</Link>

                                <Link href="https://twitter.com/oleg-stepanenko" className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700">Message</Link>
                            </div>
                        </div>
                    </div>
                    {
                        typeof window !== "undefined" && window.innerWidth <= 650 && <br />
                    }
                    <div className="mx-auto w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                        <div className="flex flex-col items-center pb-10">
                            <Image className="w-24 h-24 mb-3 rounded-full shadow-lg mt-5" src={client2} alt="Петров Петр" width={200} height={200}/>
                            <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">Петров Петр</h5>
                            <span className="text-sm text-gray-500 dark:text-gray-400">Студент последнего курса</span>
                            <div className="flex mt-4 space-x-3 md:mt-6">
                                <Link href="https://www.linkedin.com/in/oleg-stepanenko/" className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Connect</Link>

                                <Link href="https://twitter.com/oleg-stepanenko" className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700">Message</Link>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    );
};

export default About;