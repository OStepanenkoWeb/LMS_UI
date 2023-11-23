import Link from 'next/link'
import React from 'react'

const Footer = () => {
    return (
        <footer>
            <div className="border border-[#0000000e] dark:border-[#ffffff1e]" />
            <br />
            <div className="w-[95%] 800px:w-full 800px:max-w-[85%] mx-auto px-2 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4">
                    <div className="space-y-3">
                        <h3 className="text-[20px] font-[600] text-black dark:text-white">О нас</h3>
                        <ul className="space-y-4">
                            <li>
                                <Link
                                    href="/about"
                                    className="text-base text-black dark:text-gray-300 dark:hover:text-white"
                                >
                                    Наша история
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/privacy-policy"
                                    className="text-base text-black dark:text-gray-300 dark:hover:text-white"
                                >
                                    Политика конфиденциальности
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/faq"
                                    className="text-base text-black dark:text-gray-300 dark:hover:text-white"
                                >
                                    FAQ
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="space-y-3">
                        <h3 className="text-[20px] font-[600] text-black dark:text-white">Быстрые ссылки</h3>
                        <ul className="space-y-4">
                            <li>
                                <Link
                                    href="/courses"
                                    className="text-base text-black dark:text-gray-300 dark:hover:text-white"
                                >
                                    Курсы
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/profile"
                                    className="text-base text-black dark:text-gray-300 dark:hover:text-white"
                                >
                                    Мой аккаунт
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/course-dashboard"
                                    className="text-base text-black dark:text-gray-300 dark:hover:text-white"
                                >
                                    Панель курсов
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="space-y-3">
                        <h3 className="text-[20px] font-[600] text-black dark:text-white">Социальные сети</h3>
                        <ul className="space-y-4">
                            <li>
                                <Link
                                    href="#CoursePool"
                                    className="text-base text-black dark:text-gray-300 dark:hover:text-white"
                                >
                                    Youtube
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#CoursePool"
                                    className="text-base text-black dark:text-gray-300 dark:hover:text-white"
                                >
                                    Instagram
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="https://github.com/OStepanenkoWeb"
                                    className="text-base text-black dark:text-gray-300 dark:hover:text-white"
                                >
                                    github
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-[20px] font-[600] text-black dark:text-white pb-3">Контактная информация</h3>
                        <p className="text-base text-black dark:text-gray-300 dark:hover:text-white pb-2">
                            Call Us: 8-900-000-0000
                        </p>

                        <p className="text-base text-black dark:text-gray-300 dark:hover:text-white pb-2">
                            Адресс: +8 Россия, Москва
                        </p>

                        <p className="text-base text-black dark:text-gray-300 dark:hover:text-white  pb-2">
                            Напишите нам: stepooleg@gmail.com
                        </p>

                    </div>
                </div>
                <br />
                <p className="text-center text-black dark:text-white">
                    Copyright © 2023 LMS | Все права защищены
                </p>
            </div>
            <br />
        </footer>
    )
}

export default Footer