import { styles } from '@/app/styles/style';
import React, { FC, useState } from 'react';
import Image from "next/image"
import {GetStaticUrl} from "@/app/utils/GetStaticPath";

type ICourseInformation = {
    courseInfo: any;
    setCourseInfo: (courseInfo: any) => void;
    active: number;
    setActive: (active: number) => void;
};

const CourseInformation: FC<ICourseInformation> = ({
                                          courseInfo,
                                          setCourseInfo,
                                          active,
                                          setActive,
                                      }) => {
    const [dragging, setDragging] = useState(false);

    const handleSubmit = (e: any) => {
        e.preventDefault();
        setActive(active + 1);
    };

    const handleChange = (e: any) => {
        //TODO - edit upload
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                if (reader.readyState === 2) {
                    setCourseInfo({ ...courseInfo, thumbnail: reader.result });
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const handleDragOver = (e: any) => {
        e.preventDefault();
        setDragging(true);
    };

    const handleDragLeave = (e: any) => {
        e.preventDefault();
        setDragging(false);
    };

    const handleDrop = (e: any) => {
        e.preventDefault();
        setDragging(false);
        const file = e.dataTransfer.files?.[0];

        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                if (reader.readyState === 2) {
                    setCourseInfo({ ...courseInfo, thumbnail: reader.result });
                }
            };
            reader.readAsDataURL(file);
        }
    };
    return (
        <div className='w-[80%] m-auto my-24'>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor='' className={`${styles.label}`}>
                        Название курса
                    </label>
                    <input
                        type='name'
                        name=''
                        required
                        value={courseInfo.name}
                        onChange={(e: any) =>
                            setCourseInfo({
                                ...courseInfo,
                                name: e.target.value,
                            })
                        }
                        id='name'
                        placeholder='MERN стэк LMS платформы на nextjs 13'
                        className={`${styles.input}`}
                    />
                </div>
                <br />
                <div className='mb-5'>
                    <label htmlFor=''>Содержание</label>
                    <textarea
                        name=''
                        id=''
                        cols={30}
                        rows={8}
                        value={courseInfo.description}
                        placeholder='Добавьте короткое описание вашего курса...'
                        onChange={(e: any) =>
                            setCourseInfo({
                                ...courseInfo,
                                description: e.target.value,
                            })
                        }
                        className={`${styles.input} !h-min !py-2`}
                    />
                </div>
                <br />
                <div className='w-full flex justify-between'>
                    <div className='w-[45%]'>
                        <label className={`${styles.label} `}>
                            Стоимость
                        </label>
                        <input
                            type='number'
                            name=''
                            required
                            value={courseInfo.price}
                            onChange={(e: any) =>
                                setCourseInfo({
                                    ...courseInfo,
                                    price: e.target.value,
                                })
                            }
                            id='price'
                            placeholder='29'
                            className={`${styles.input}`}
                        />
                    </div>
                    <div className='w-[50%]'>
                        <label className={`${styles.label} w-[50%]`}>
                            Старая цена (Опционально)
                        </label>
                        <input
                            type='number'
                            name=''
                            required
                            value={courseInfo.estimatedPrice}
                            onChange={(e: any) =>
                                setCourseInfo({
                                    ...courseInfo,
                                    estimatedPrice: e.target.value,
                                })
                            }
                            id='price'
                            placeholder='79'
                            className={`${styles.input}`}
                        />
                    </div>
                </div>
                <br />
                <div>
                    {/* email */}
                    <label className={`${styles.label}`} htmlFor='tags'>
                        {' '}
                        Тэги
                    </label>
                    <input
                        type='text'
                        name=''
                        required
                        value={courseInfo.tags}
                        onChange={(e: any) =>
                            setCourseInfo({
                                ...courseInfo,
                                tags: e.target.value,
                            })
                        }
                        id='tags'
                        placeholder='react, nextjs, typescript, javascript'
                        className={`${styles.input}`}
                    />
                </div>
                <br />
                <div className='w-full flex justify-between'>
                    <div className='w-[45%]'>
                        <label htmlFor='level' className={`${styles.label} `}>
                            Уровень сложности
                        </label>
                        <input
                            type='text'
                            name=''
                            required
                            value={courseInfo.level}
                            onChange={(e: any) =>
                                setCourseInfo({
                                    ...courseInfo,
                                    level: e.target.value,
                                })
                            }
                            id='level'
                            placeholder='Начинающий/Средний/Продвинутый'
                            className={`${styles.input}`}
                        />
                    </div>
                    <div className='w-[50%]'>
                        <label
                            htmlFor='demoUrl'
                            className={`${styles.label} w-[50%]`}
                        >
                            URL Демо
                        </label>
                        <input
                            type='text'
                            name=''
                            required
                            value={courseInfo.demoUrl}
                            onChange={(e: any) =>
                                setCourseInfo({
                                    ...courseInfo,
                                    demoUrl: e.target.value,
                                })
                            }
                            id='demoUrl'
                            placeholder='eer74fd'
                            className={`${styles.input}`}
                        />
                    </div>
                </div>
                <br />
                <div className='w-full'>
                    <input
                        type='file'
                        accept='image/*'
                        id='file'
                        className='hidden'
                        onChange={handleChange}
                    />
                    <label
                        htmlFor='file'
                        className={`w-full min-h-[10vh] dark:border-white rounded border-[#00000026] p-3 border flex items-center justify-center ${
                            dragging ? 'bg-blue-500' : 'bg-transparent'
                        } `}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                    >
                        {courseInfo.thumbnail ? (
                            <Image
                                src={GetStaticUrl(courseInfo.thumbnail)}
                                alt=''
                                className='w-full max-h-full object-cover'
                            />
                        ) : (
                            <p className='text-center text-black dark:text-white'>
                                Перетащите миниатюру сюда, или нажмите для выбора
                            </p>
                        )}
                    </label>
                </div>

                <div className='w-full flex items-center justify-end'>
                    <input
                        type='submit'
                        value='Далее'
                        className='w-full 800px:w-[180px] h-[40px] bg-[#37a39a] text-center text-[#fff] rounded mt-8 cursor-pointer'
                    />
                </div>
            </form>
        </div>
    );
};

export default CourseInformation;