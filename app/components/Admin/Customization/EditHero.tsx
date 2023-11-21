import { styles } from "@/app/styles/style";
import {
    useEditLayoutMutation,
    useGetHeroDataQuery,
} from "@/redux/features/layout/layoutApi";
import React, { FC, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineCamera } from "react-icons/ai";
import {uploadAvatar} from "@/app/utils/Supabase";

const EditHero: FC = () => {
    const [image, setImage] = useState("");
    const [title, setTitle] = useState("");
    const [subTitle, setSubTitle] = useState("");

    const { data, refetch } = useGetHeroDataQuery("Banner", {refetchOnMountOrArgChange: true,});
    const [editLayout, { isLoading, isSuccess, error }] = useEditLayoutMutation();

    useEffect(() => {
        if (data) {
            setTitle(data?.layout?.banner?.title);
            setSubTitle(data?.layout?.banner?.subTitle);
            setImage(data?.layout?.banner?.image);
        }
        if (isSuccess) {
            toast.success("Старновая страница успешно обновлена!");
            refetch();
        }
        if (error) {
            if ("data" in error) {
                const errorData = error as any;
                toast.error(errorData?.data?.message);
            }
        }
    }, [data, isSuccess, error, refetch]);

    const handleUpdate = async (event: any) => {
        const file = await uploadAvatar(event.target.files[0])

        setImage(file as string);
    };

    const handleEdit = async () => {
        await editLayout({
            type: "Banner",
            image,
            title,
            subTitle,
        });
    };

    return (
        <>
            <div className="w-full 1000px:flex items-center">
                <div className="absolute top-[100px] 1000px:top-[unset] 1500px:h-[600px] 1500px:w-[600px] 1100px:h-[400px] 1100px:w-[400px] h-[40vh] w-[40vh] hero_animation rounded-[50%] 1100px:left-[14rem] 1500px:left-[18rem]"></div>
                <div className="1000px:w-[40%] flex 1000px:min-h-screen items-center justify-end pt-[70px] 1000px:pt-[0] z-10">
                    <div className="relative flex items-center justify-end">
                        <img
                            src={image}
                            alt=""
                            className="object-contain 1100px:max-w-[90%] w-[90%] 1500px:max-w-[85%] h-[auto] z-[10]"
                        />
                        <input
                            type="file"
                            name=""
                            id="banner"
                            accept="image/*"
                            onChange={handleUpdate}
                            className="hidden"
                        />
                        <label htmlFor="banner" className="absolute bottom-0 right-0 z-20">
                            <AiOutlineCamera className="dark:text-white text-black text-[18px] cursor-pointer" />
                        </label>
                    </div>
                </div>
                <div className="1000px:w-[60%] flex flex-col items-center 1000px:mt-[0px] text-center 1000px:text-left mt-[150px]">
          <textarea
              className="dark:text-white resize-none text-[#000000c7] text-[30px] px-3 w-full 1000px:text-[60px] 1500px:text-[70px] font-[600] font-Josefin py-2 1000px:leading-[75px] 1500px:w-[60%] 1100px:w-[78%] outline-none bg-transparent block"
              placeholder="Мгновенно улучшите свой опыт онлайн-обучения"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              rows={4}
          />
                    <br />
                    <textarea
                        value={subTitle}
                        onChange={(e) => setSubTitle(e.target.value)}
                        placeholder="У нас более 40 тысяч онлайн-курсов и более 500 тысяч онлайн-зарегистрированных студентов. Найдите среди них свой курс."
                        className="dark:text-[#edfff4] text-[#000000ac] font-Josefin font-[600] text-[18px] 1500px:!w-[55%] 1100px:!w-[74%] bg-transparent outline-none resize-none"
                    ></textarea>
                    <br />
                    <br />
                    <br />
                    <div
                        className={`w-full 800px:w-[180px] flex items-center justify-center h-[40px] bg-[#cccccc34] text-center dark:text-white text-black rounded mt-8
                        ${
                            data?.layout?.banner?.title !== title ||
                            data?.layout?.banner?.subTitle !== subTitle ||
                            data?.layout?.banner?.image !== image
                                ? "!cursor-pointer !bg-[#37a39a]"
                                : "!cursor-not-allowed"
                        }
          !rounded absolute bottom-12 right-12`}
                        onClick={
                            data?.layout?.banner?.title !== title ||
                            data?.layout?.banner?.subTitle !== subTitle ||
                            data?.layout?.banner?.image !== image
                                ? handleEdit
                                : () => null
                        }
                    >
                        Сохранить
                    </div>
                </div>
            </div>
        </>
    );
};

export default EditHero;