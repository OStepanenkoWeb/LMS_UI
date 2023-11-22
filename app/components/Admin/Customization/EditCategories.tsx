import {useEditLayoutMutation, useGetHeroDataQuery,} from "@/redux/features/layout/layoutApi";
import React, {useEffect, useState} from "react";
import {styles} from "@/app/styles/style";
import {AiOutlineDelete} from "react-icons/ai";
import {IoMdAddCircleOutline} from "react-icons/io";
import {toast} from "react-hot-toast";
import Loader from "@/app/components/Loader/Loader";

type Props = {};

const EditCategories = (props: Props) => {
    const {data, isLoading, refetch} = useGetHeroDataQuery("Categories", {
        refetchOnMountOrArgChange: true,
    });
    const [editLayout, {isSuccess: layoutSuccess, error}] =
        useEditLayoutMutation();
    const [categories, setCategories] = useState<any>([]);

    useEffect(() => {
        if (data) {
            setCategories(data.layout.categories);
        }
        if (layoutSuccess) {
            toast.success("Категории успешно обновлены");
            refetch();
        }

        if (error) {
            if ("data" in error) {
                const errorData = error as any;
                toast.error(errorData?.data?.message);
            }
        }
    }, [data, layoutSuccess, error, refetch]);

    const handleCategoriesAdd = (id: any, value: string) => {
        setCategories((prevCategory: any) =>
            prevCategory.map((i: any) => (i._id === id ? {...i, title: value} : i))
        );
    };

    const newCategoriesHandler = () => {
        if (categories[categories.length - 1].title === "") {
            toast.error("Заголовок категории не может быть пустым");
        } else {
            setCategories((prevCategory: any) => [...prevCategory, {title: ""}]);
        }
    };

    const areCategoriesUnchanged = (
        originalCategories: any[],
        newCategories: any[]
    ) => {
        return JSON.stringify(originalCategories) === JSON.stringify(newCategories);
    };

    const isAnyCategoryTitleEmpty = (categories: any[]) => {
        return categories.some((q) => q.title === "");
    };

    const editCategoriesHandler = async () => {
        if (
            !areCategoriesUnchanged(data.layout.categories, categories) &&
            !isAnyCategoryTitleEmpty(categories)
        ) {
            await editLayout({
                type: "Categories",
                categories,
            });
        }
    };

    return (
        <>
            {isLoading ? (
                <Loader/>
            ) : (
                <div className="mt-[120px] text-center">
                    <h1 className={`${styles.title}`}>
                        Все категории
                    </h1>
                    {categories &&
                        categories.map((item: any, index: number) => {
                            return (
                                <div className="p-3" key={index}>
                                    <div className="flex items-center w-full justify-center">
                                        <input
                                            className={`${styles.input} !w-[unset] !border-none !text-[20px]`}
                                            value={item.title}
                                            onChange={(e) =>
                                                handleCategoriesAdd(item._id, e.target.value)
                                            }
                                            placeholder="Введите название категории..."
                                        />
                                        <AiOutlineDelete
                                            className="dark:text-white text-black text-[18px] cursor-pointer"
                                            onClick={() => {
                                                setCategories((prevCategory: any) =>
                                                    prevCategory.filter((i: any) => i._id !== item._id)
                                                );
                                            }}
                                        />
                                    </div>
                                </div>
                            );
                        })}
                    <br/>
                    <br/>
                    <div className="w-full flex justify-center">
                        <IoMdAddCircleOutline
                            className="dark:text-white text-black text-[25px] cursor-pointer"
                            onClick={newCategoriesHandler}
                        />
                    </div>
                    <div
                        className={`w-full 800px:w-[180px] flex items-center justify-center h-[40px] bg-[#cccccc34] text-center dark:text-white text-black rounded mt-8
                        ${
                            areCategoriesUnchanged(data.layout.categories, categories) ||
                            isAnyCategoryTitleEmpty(categories)
                                ? "!cursor-not-allowed"
                                : "!cursor-pointer !bg-[#37a39a]"
                        }
                        !rounded absolute bottom-12 right-12`}
                        onClick={
                            areCategoriesUnchanged(data.layout.categories, categories) ||
                            isAnyCategoryTitleEmpty(categories)
                                ? () => null
                                : editCategoriesHandler
                        }
                    >
                        Сохранить
                    </div>
                </div>
            )}
        </>
    );
};

export default EditCategories;