'use client';
import {FC} from 'react'
import CoursePlayer from "@/app/utils/CoursePlayer";
import { CiCircleCheck } from "react-icons/ci"
import {inspect} from "util";
import {styles} from "@/app/styles/style"
import Ratings from "@/app/utils/Ratings";
import {IoCheckmarkDoneOutline} from "react-icons/io5";

type ICoursePreview = {
    courseData:any,
    handelCourseCreation:any,
    active: number;
    setActive: (e: any) => void
    isEdit?: boolean
}

const CoursePreview:FC<ICoursePreview> = ({courseData, handelCourseCreation,active, setActive, isEdit}) => {
    const discountPercentage = ((courseData?.estimatedPrice - courseData?.price) / courseData?.estimatedPrice)* 100
    const discountPercentagePrice = discountPercentage.toFixed(0)
    const prevButton = () => setActive(active - 1)
    const createCourse = () => handelCourseCreation()


    return (
        <div className="w-[90%] m-auto py-5 mb-5">
            <div className='w-full relative'>
               <div className="w-full mt-10">
                   <CoursePlayer
                       videoUrl={courseData?.demoUrl}
                       title={courseData?.name}
                   />
               </div>
                <div className="flex items-center">
                    <h1 className="pt-5 text-[25px]">
                        {courseData?.price ===0 ? 'Бесплатно' : courseData?.price + '₽'}
                    </h1>
                    <h5 className='pl-3 text-[20px] mt-2 line-through opacity-80'>
                        {courseData.estimatedPrice}₽
                    </h5>
                    <h4 className='pl-5 pt-4 text-[22px]'>
                        На {discountPercentagePrice}% дешевле
                    </h4>
                </div>
                <div className='flex items-center'>
                    <div
                        className={`${styles.button} !w-[280px] my-3 fontPoppins !bg-[crimson] cursor-not-allowed`}
                    >
                        Купить сейчас за {courseData?.price}₽
                    </div>
                </div>
                <div className='flex items-center'>
                    <input
                        type='text'
                        name='apply'
                        placeholder='Ввести код скидки'
                        className={`${styles.input} 1500:!w-[50%] 1100:!w-[60%] !mt-0`}
                    />
                    <div className={`${styles.button} !w-[120px] my-3 ml-4 font-Poppins cursor-pointer`}>
                        Применить
                    </div>
                </div>
                <div className='pb-1 flex items-center dark:text-white text-black'><CiCircleCheck className='mr-2'/> Включены исходники кода </div>
                <div className='pb-1 flex items-center dark:text-white text-black'><CiCircleCheck className='mr-2'/> Поддержка на всех этапах обучения </div>
                <div className='pb-1 flex items-center dark:text-white text-black'><CiCircleCheck className='mr-2'/> Сертификат по окончании курса </div>
                <div className='pb-1 flex items-center pb-3 800px:pb-1 dark:text-white text-black'><CiCircleCheck className='mr-2'/> Премиум поддержка </div>
            </div>
            <div className='w-full'>
                <div className='w-full 800px:pr-5'>
                    <h1 className='text-[25px] font-Poppins font-[600]'>
                        {courseData?.name}
                    </h1>
                    <div className='flex items-center justify-between pt-3'>
                        <div className='flex items-center'>
                            <Ratings rating={0}/>
                            <h5>0 Оценок</h5>
                        </div>
                        <h5>0 Изучающих</h5>
                        <br/>
                    </div>
                    <h1 className='text-[25px] font-Poppins font-[600]'>
                        Почему вы хотите изучить этот курс?
                    </h1>
                    {
                        courseData?.benefits?.map((item:any, index:number) => (
                            <div className='w-full flex 800px:items-center py-2' key={index}>
                                <div className='w-[15px] mr-1'>
                                    <IoCheckmarkDoneOutline size={20}/>
                                </div>
                                <p className='pl-2'>{item.title}</p>
                            </div>
                        ))
                    }
                    <br/>
                    <br/>
                    <h1 className="text-[25px] font-Poppins font-[600]">
                       Что вы должны знать перед изучением курса?
                    </h1>
                    {courseData?.prerequisites?.map((item: any, index: number) => (
                        <div
                            className="w-full flex 800px:items-center py-2"
                            key={index}
                        >
                            <div className="w-[15px] mr-1">
                                <IoCheckmarkDoneOutline size={20} />
                            </div>
                            <p className="pl-2">{item.title}</p>
                        </div>
                    ))}
                    <br />
                    <br />
                    <div className='w-full'>
                        <h1 className='text-[25px] font-Poppins font-[600]'>
                            Детали курса
                        </h1>
                        {courseData?.description}
                    </div>
                    <br/>
                    <br/>
                </div>
                <div className="w-full flex items-center justify-between">
                    <div
                        className="w-full 800px:w-[180px] flex items-center justify-center h-[40px] bg-[#37a39a] text-center text-[#fff] rounded mt-8 cursor-pointer"
                        onClick={() => prevButton()}
                    >
                        Назад
                    </div>
                    <div
                        className="w-full 800px:w-[180px] flex items-center justify-center h-[40px] bg-[#37a39a] text-center text-[#fff] rounded mt-8 cursor-pointer"
                        onClick={() => createCourse()}
                    >
                        {isEdit ? "Обновить" : "Создать"}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CoursePreview