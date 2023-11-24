import React, { FC } from "react";
import { IoCheckmarkDoneOutline } from "react-icons/io5";
import CoursePlayer from "@/app/utils/CoursePlayer";
import Ratings from "@/app/utils/Ratings";
import {styles} from "@/app/styles/style";

type Props = {
    active: number;
    setActive: (active: number) => void;
    courseData: any;
    handleCourseCreate: any;
    isEdit?: boolean;
};

const CoursePreview: FC<Props> = ({
                                      courseData,
                                      handleCourseCreate,
                                      setActive,
                                      active,
                                      isEdit,
                                  }) => {
    const dicountPercentenge =
        ((courseData?.estimatedPrice - courseData?.price) /
            courseData?.estimatedPrice) *
        100;

    const discountPercentengePrice = dicountPercentenge.toFixed(0);

    const prevButton = () => {
        setActive(active - 1);
    };

    const createCourse = () => {
        handleCourseCreate();
    };
    return (
        <div className="w-[90%] m-auto py-5 mb-5">
            <div className="w-full relative">
                <div className="w-full mt-10">
                    <CoursePlayer
                        videoUrl={courseData?.demoUrl}
                        title={courseData?.title}
                    />
                </div>
                <div className="flex items-center">
                    <h1 className="pt-5 text-[25px]">
                        {courseData?.price === 0 ? "Free" : courseData?.price + "$"}
                    </h1>
                    <h5 className="pl-3 text-[20px] mt-2 line-through opacity-80">
                        {courseData?.estimatedPrice}$
                    </h5>

                    <h4 className="pl-5 pt-4 text-[22px]">
                        {discountPercentengePrice}% Off
                    </h4>
                </div>

                <div className="flex items-center">
                    <div
                        className={`${styles.button} !w-[180px] my-3 font-Montserrat !bg-[crimson] cursor-not-allowed`}
                    >
                        Купить {courseData?.price}$
                    </div>
                </div>

                <div className="flex items-center">
                    <input
                        type="text"
                        name=""
                        id=""
                        placeholder="Код скидки..."
                        className={`${styles.input} 1500px:!w-[50%] 1100px:w-[60%] ml-3 !mt-0`}
                    />
                    <div
                        className={`${styles.button} !w-[120px] my-3 ml-4 font-Montserrat cursor-pointer`}
                    >
                        Применить
                    </div>
                </div>
                <p className="pb-1">• Исходники и дополнительные маиериалы</p>
                <p className="pb-1">• Доступ навсегда</p>
                <p className="pb-1">• Сертификат об окончании</p>
                <p className="pb-3 800px:pb-1">• Премиум поддержка</p>
            </div>
            <div className="w-full">
                <div className="w-full 800px:pr-5">
                    <h1 className="text-[25px] font-Montserrat font-[600]">
                        {courseData?.name}
                    </h1>
                    <div className="flex items-center justify-between pt-3">
                        <div className="flex items-center">
                            <Ratings rating={0} />
                            <h5>0 Отзывов</h5>
                        </div>
                        <h5>0 Студентов</h5>
                    </div>
                    <br />
                    <h1 className="text-[25px] font-Montserrat font-[600]">
                        Что даст вам изучение курса?
                    </h1>
                </div>
                {courseData?.benefits?.map((item: any, index: number) => (
                    <div className="w-full flex 800px:items-center py-2" key={index}>
                        <div className="w-[15px] mr-1">
                            <IoCheckmarkDoneOutline size={20} />
                        </div>
                        <p className="pl-2">{item.title}</p>
                    </div>
                ))}
                <br />
                <br />
                <h1 className="text-[25px] font-Montserrat font-[600]">
                    Что вы должны уметь перед началом изучения курса?
                </h1>
                {courseData?.prerequisites?.map((item: any, index: number) => (
                    <div className="w-full flex 800px:items-center py-2" key={index}>
                        <div className="w-[15px] mr-1">
                            <IoCheckmarkDoneOutline size={20} />
                        </div>
                        <p className="pl-2">{item.title}</p>
                    </div>
                ))}
                <br />
                <br />
                {/* course description */}
                <div className="w-full">
                    <h1 className="text-[25px] font-Montserrat font-[600]">
                        Детали курса
                    </h1>
                    <p className="text-[18px] mt-[20px] whitespace-pre-line w-full overflow-hidden">
                        {courseData?.description}
                    </p>
                </div>
                <br />
                <br />
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
    );
};

export default CoursePreview;