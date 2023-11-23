import { styles } from "@/app/styles/style";
import Image from "next/image";
import React from "react";
import ReviewCard from "@/app/components/Rewiew/RewiewCard";

export const reviews = [
    {
        name: "Gene Bates",
        avatar: "https://randomuser.me/api/portraits/men/1.jpg",
        profession: "Student | Cambridge university",
        comment:
            "Я был полностью впечатлен своим опытом, поскольку веб-сайт предлагает широкий выбор курсов, отвечающих разным уровням навыков и интересов. Если вы хотите улучшить свои знания и навыки в сфере высоких технологий, я настоятельно рекомендую посетить LMS!",
    },
    {
        name: "Verna Santos",
        avatar: "https://randomuser.me/api/portraits/women/1.jpg",
        profession: "Full stack developer | Quarter ltd.",
        comment:
            "Спасибо за ваш потрясающий обучающий канал по программированию! Ваш стиль преподавания выдающийся, а качество ваших уроков на высшем уровне. Ваша способность разбивать сложные темы на понятные части и охватывать различные языки программирования и темы действительно впечатляет. Практические приложения и примеры из реальной жизни, которые вы включаете, укрепляют теоретические знания и дают ценную информацию. Ваше взаимодействие с аудиторией способствует созданию благоприятной среды обучения. Благодарим вас за преданность делу, опыт и страсть к преподаванию программирования. Продолжайте в том же духе!",
    },
    {
        name: "Jay Gibbs",
        avatar: "https://randomuser.me/api/portraits/men/2.jpg",
        profession: "computer systems engineering student | Zimbabwe",
        comment:
            "Спасибо за ваш потрясающий обучающий сервис по программированию! Ваш стиль преподавания необыкновенный, а качество ваших уроков на высшем уровне. Ваша способность разбивать сложные темы на понятные части и охватывать различные языки программирования и темы действительно впечатляет. Практические приложения и примеры из реальной жизни, которые вы включаете, укрепляют теоретические знания и дают ценную информацию. Ваше взаимодействие с аудиторией способствует созданию благоприятной среды обучения. Благодарим вас за преданность делу, опыт и страсть к преподаванию программирования. Продолжайте в том же духе!"},
    {
        name: "Mina Davidson",
        avatar: "https://randomuser.me/api/portraits/women/2.jpg",
        profession: "Junior Web Developer | Indonesia",
        comment:
            "Я имел удовольствие изучить на LMS создание веб сайта. Я был полностью впечатлен своим опытом",
    },
    {
        name: "Rosemary Smith",
        avatar: "https://randomuser.me/api/portraits/women/3.jpg",
        profession: "Full stack web developer | Algeria",
        comment:
            "Ваш контент особенный. Больше всего мне понравилось то, что видео уроки подробные, а значит, в них все подробно описанну все ньюансы. Для любого человека с начальным уровнем програмиррования можно понять суть занятия, просматривая видео. Большое спасибо. Я очень жду следующих видео. Продолжайте делать эту потрясающую работу.",
    },
    {
        name: "Laura Mckenzie",
        avatar: "https://randomuser.me/api/portraits/women/4.jpg",
        profession: "Full stack web developer | Canada",
        comment:
            "Присоединяйтесь к LMS! LMS фокусируется на практическом освоении навыков, а не просто на преподавании теории языков программирования или фреймворков. Я взял урок по созданию интернет магазина с использованием React JS, и он очень помог мне понять различные этапы создания проекта от начала до конца. В целом, я настоятельно рекомендую LMS всем, кто хочет улучшить свои навыки программирования и создавать реальные проекты. LMS — отличный ресурс, который поможет вам поднять свои навыки на новый уровень.",
    },
];

const Reviews = () => {
    return (
        <div className="w-[90%] 800px:w-[85%] m-auto">
            <div className="w-full 800px:flex items-center">
                <div className="800px:w-[50%] w-full">
                    <Image
                        src={require("../../../public/assets/business.png")}
                        alt="business"
                        width={700}
                        height={700}
                    />
                </div>
                <div className="800px:w-[50%] w-full">
                    <h3 className={`${styles.title} 800px:!text-[40px]`}>
                        Наши студенты <span className="text-gradient">Наша сила</span>{" "}
                        <br /> Посмотрите, что они говорят о нас
                    </h3>
                    <br />
                    <p className={styles.label}>
                        Истории наших студентов являются источником вдохновения для всех. Просмотрите их отзывы, чтобы понять, как наши курсы обогатили их знания.
                    </p>
                </div>
                <br />
                <br />
            </div>
            <div className="grid grid-cols-1 gap-[25px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-2 lg:gap-[25px] xl:grid-cols-2 xl:gap-[35px] mb-12 border-0 md:[&>*:nth-child(3)]:!mt-[-60px] md:[&>*:nth-child(6)]:!mt-[-20px]">
                {reviews &&
                    reviews.map((i, index) => <ReviewCard item={i} key={index} />)}
            </div>
        </div>
    );
};

export default Reviews;