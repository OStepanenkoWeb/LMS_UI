import { styles } from '@/app/styles/style';
import React, { FC, useState } from 'react';
import {AiOutlineDelete, AiOutlineLink, AiOutlinePlusCircle} from 'react-icons/ai';
import { BiSolidPencil } from 'react-icons/bi';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import toast from "react-hot-toast";
import {BsArrowLeftShort, BsArrowRightShort} from "react-icons/bs";

type Props = {
    active: number;
    setActive: (active: number) => void;
    courseContentData: any;
    setCourseContentData: (courseContentData: any) => void;
    handleSubmit: any;
};

const CourseContent: FC<Props> = ({
                                      active,
                                      setActive,
                                      courseContentData,
                                      setCourseContentData,
                                      handleSubmit: handleCourseSubmit,
                                  }) => {
    const [isCollapsed, setIsCollapsed] = useState(
        Array(courseContentData.length).fill(false)
    );

    const [activeSection, setActiveSection] = useState(1);

    const newContent = {
        videoUrl: "",
        title: "",
        description: "",
        videoSection: `Безымянный урок ${activeSection}`,
        links: [{ title: "", url: "" }],
    }

    const prevContentDataIndex = courseContentData.length - 1

    const ifEmptyField =  courseContentData[prevContentDataIndex] && (
        courseContentData[prevContentDataIndex].title === "" ||
        courseContentData[prevContentDataIndex].description === "" ||
        courseContentData[prevContentDataIndex].videoUrl === "" ||
        courseContentData[prevContentDataIndex]?.links[0]?.title === "" ||
        courseContentData[prevContentDataIndex]?.links[0]?.url === "")



    const handleCollapseToggle = (index: number) => {
        const updatedIsCollapsed = [...isCollapsed];
        updatedIsCollapsed[index] = !updatedIsCollapsed[index];
        setIsCollapsed(updatedIsCollapsed);
    };

    const handleRemoveLink = (index: number, linkIndex: number) => {
        if (linkIndex > 0) {
            const updatedData = [...courseContentData];
            updatedData[index].links.splice(linkIndex, 1);
            setCourseContentData(updatedData);
        }
    };

    const handleAddLink = (index: number) => {
        const updatedData = [...courseContentData];
        updatedData[index].links.push({ title: "", url: "" });
        setCourseContentData(updatedData);
    };

    const newContentHandler = (item: any) => {
        if (
            item.title === "" ||
            item.description === "" ||
            item.videoUrl === "" ||
            item.links[0].title === "" ||
            item.links[0].url === ""
        ) {
            toast.error("Пожалуйста, заполните полностью предыдущий урок!");
        } else {
            let newVideoSection = "";
            if (courseContentData.length > 0) {
                const lastVideoSection =
                    courseContentData[courseContentData.length - 1].videoSection;
                // use the last videoSection if available, else user user input
                if (lastVideoSection) {
                    newVideoSection = lastVideoSection;
                }
            }

            setCourseContentData([...courseContentData, newContent]);
        }
    }

    const addNewSection = () => {
        if (ifEmptyField) {
            toast.error("Пожалуйста, заполните все поля предыдущего урока!");
        } else {
            setActiveSection(activeSection + 1);

            setCourseContentData([...courseContentData, newContent]);
        }
    }

    const handelOptions = ()=>{
        if(ifEmptyField){
            toast.error("Пожалуйста, заполните все поля в предыдущих разделах!");
        }else{
            setActive(active + 1)

            handleCourseSubmit()
        }
    }

    return (
        <div className='w-[80%] m-auto mt-24 p-3'>
            <form>
                {courseContentData?.map((item: any, index: number) => {
                    const showSectionInput =
                        index === 0 ||
                        item.videoSection !==
                        courseContentData[index - 1].videoSection;
                    return (
                        <>
                            <div
                                className={`w-full bg-[#cdc8c817] p-4 ${
                                    showSectionInput ? 'mt-10' : 'mb-0'
                                }`}
                            >
                                {showSectionInput && (
                                    <>
                                        <div className='flex w-full items-center'>
                                            <input
                                                type='text'
                                                className={`text-[20px] ${
                                                    item.videoSection ===
                                                    'Untitled Section'
                                                        ? 'w-[170px]'
                                                        : ' w-max'
                                                } cursor-pointer dark:text-white text-black bg-transparent outline-none`}
                                                value={item.videoSection}
                                                onChange={(e) => {
                                                    const updatedData = [
                                                        ...courseContentData,
                                                    ];
                                                    updatedData[
                                                        index
                                                        ].videoSection =
                                                        e.target.value;
                                                    setCourseContentData(
                                                        updatedData
                                                    );
                                                }}
                                            />
                                            <BiSolidPencil className='cursor-pointer dark:text-white text-black' />
                                        </div>
                                    </>
                                )}
                                <div className='flex w-full items-center justify-between my-0'>
                                    {isCollapsed[index] ? (
                                        <>
                                            {item.title ? (
                                                <p className='dark:text-white text-black'>
                                                    {index + 1}. {item.title}
                                                </p>
                                            ) : (
                                                <div></div>
                                            )}
                                        </>
                                    ) : (
                                        <div></div>
                                    )}
                                    {/* arrow button for collapsed video content */}
                                    <div className='flex items-center'>
                                        <AiOutlineDelete
                                            className={`dark:text-white text-[20px] mr-2 text-black ${
                                                index > 0
                                                    ? 'cursor-pointer'
                                                    : 'cursor-no-drop'
                                            }`}
                                            onClick={() => {
                                                if (index > 0) {
                                                    const updatedData = [
                                                        ...courseContentData,
                                                    ];
                                                    updatedData.splice(
                                                        index,
                                                        1
                                                    );
                                                    setCourseContentData(
                                                        updatedData
                                                    );
                                                }
                                            }}
                                        />
                                        <MdOutlineKeyboardArrowDown
                                            fontSize='large'
                                            className='dark:text-white text-black '
                                            style={{
                                                transform: isCollapsed[index]
                                                    ? 'rotate(180deg)'
                                                    : 'rotate(0deg)',
                                            }}
                                            onClick={() => {
                                                handleCollapseToggle(index);
                                            }}
                                        />
                                    </div>
                                </div>
                                {!isCollapsed[index] && (
                                    <>
                                        <div className='my-3'>
                                            <label
                                                className={styles.label}
                                            >
                                                Заголовок видео
                                            </label>
                                            <input
                                                type='text'
                                                placeholder='План проекта...'
                                                className={`${styles.input}`}
                                                value={item.title}
                                                onChange={(e) => {
                                                    const updatedData = [
                                                        ...courseContentData,
                                                    ];
                                                    updatedData[index].title =
                                                        e.target.value;
                                                    setCourseContentData(
                                                        updatedData
                                                    );
                                                }}
                                            />
                                        </div>
                                        <div className="my-3">
                                            <label className={styles.label}>
                                                Ссылка на видео
                                            </label>
                                            <input
                                                type="text"
                                                className={`${styles.input} py-2 flex-grow`}
                                                placeholder="Укажите ссылку на ваше видео"
                                                value={item.videoUrl}
                                                onChange={(e) => {
                                                    const updatedData = [...courseContentData];
                                                    updatedData[index].videoUrl =
                                                        e.target.value;
                                                    setCourseContentData(updatedData);
                                                }}
                                            />
                                        </div>
                                        <div className="my-3">
                                            <label className={styles.label}>
                                                Продолжительность видео
                                            </label>
                                            <input
                                                type="text"
                                                className={`${styles.input} py-2 flex-grow`}
                                                placeholder="Укажите продолжительность вашего видео"
                                                value={String(item.videoLength)}
                                                onChange={(e) => {
                                                    const updatedData = [...courseContentData];
                                                    updatedData[index].videoLength =
                                                        Number(e.target.value);
                                                    setCourseContentData(updatedData);
                                                }}
                                            />
                                        </div>
                                        <div className="my-3">
                                            <label className={styles.label}>
                                                Описание к видео
                                            </label>
                                            <textarea
                                                rows={8}
                                                cols={30}
                                                className={`${styles.input} py-2 !h-min`}
                                                placeholder="Добавьте описание к вашему видео"
                                                value={item.description}
                                                onChange={(e) => {
                                                    const updatedData = [...courseContentData];
                                                    updatedData[index].description =
                                                        e.target.value;
                                                    setCourseContentData(updatedData);
                                                }}></textarea>
                                        </div>
                                        <br />
                                        {item?.links.map((link: any, linkIndex: number) => (
                                            <div className="mb-3 block" key={linkIndex}>
                                                <div className="w-full items-center flex justify-between">
                                                    <label className={styles.label}>
                                                        Вспомогательные материалы {linkIndex + 1}
                                                    </label>
                                                    <AiOutlineDelete
                                                        className={`dark:text-white text-[20px] mr-2 text-black ${
                                                            index > 0
                                                                ? 'cursor-pointer'
                                                                : 'cursor-no-drop'
                                                        }`}
                                                        onClick={() => linkIndex === 0
                                                            ? null
                                                            : handleRemoveLink(index, linkIndex)}
                                                    />
                                                </div>
                                                <div className="my-3">
                                                    <input
                                                        type="text"
                                                        className={`${styles.input} my-2 flex-grow`}
                                                        placeholder="Укажите описание для ссылки на материал"
                                                        value={link.title}
                                                        onChange={(e) => {
                                                            const updatedData = [...courseContentData];
                                                            updatedData[index].links[
                                                                linkIndex
                                                                ].title = e.target.value;
                                                            setCourseContentData(updatedData);
                                                        }}
                                                    />
                                                </div>
                                                <div className="my-3">
                                                    <input
                                                        type="text"
                                                        className={`${styles.input} my-2 flex-grow`}
                                                        placeholder="Укажите ссылку на материал"
                                                        value={link.url}
                                                        onChange={(e) => {
                                                            const updatedData = [...courseContentData];
                                                            updatedData[index].links[
                                                                linkIndex
                                                                ].url = e.target.value;
                                                            setCourseContentData(updatedData);
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                        <button
                                            className="text-black dark:text-white flex gap-2 items-center mt-3"
                                            onClick={() => handleAddLink(index)}
                                        >
                                            <AiOutlineLink className='dark:text-white text-[20px] mr-2 text-black cursor-pointer'/>
                                            <span>Добавить ссылку</span>
                                        </button>
                                    </>
                                )}
                                {index === courseContentData.length - 1 && (
                                    <button
                                        className="dark:text-white text-black flex gap-2 items-center mt-4 duration-300 cursor-pointer"
                                        onClick={() => newContentHandler(item)}>
                                        <AiOutlinePlusCircle
                                            className="dark:text-white text-black duration-300"
                                        />

                                        <span>
                                            Добавить новый контент
                                        </span>
                                    </button>
                                )}
                            </div>
                        </>
                    );
                })}
                <br/>
                <button
                    className="flex items-center justify-center text-[20px] cursor-pointer dark:text-white text-black"
                    onClick={addNewSection}
                >
                    <AiOutlinePlusCircle className="mr-2" />
                    <span>Добавить новый урок</span>
                </button>
            </form>
            <div className="flex justify-between">
                <div
                    className='w-full 800px:w-[180px] flex items-center justify-center h-[40px] bg-[#37a39a] text-center dark:text-white text-black rounded mt-8 cursor-pointer'
                    onClick={() =>  setActive(active - 1)}
                >
                    <span>
                        <BsArrowLeftShort size={30}/>
                    </span>
                    Назад
                </div>
                <div
                    className='w-full 800px:w-[180px] flex items-center justify-center h-[40px] bg-[#37a39a] text-center dark:text-white text-black rounded mt-8 cursor-pointer'
                    onClick={handelOptions}
                >
                    Далее
                    <span>
                        <BsArrowRightShort size={30}/>
                    </span>
                </div>
            </div>
        </div>
    );
};

export default CourseContent;