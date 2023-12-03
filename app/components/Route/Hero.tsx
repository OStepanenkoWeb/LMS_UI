import React, {FC, useState} from 'react';
import Image from 'next/image';
import Link from 'next/link'
import { BiSearch } from 'react-icons/bi';
import {useGetHeroDataQuery} from "@/redux/features/layout/layoutApi";
import Loader from "@/app/components/Loader/Loader";
import {useRouter} from "next/navigation";

const Hero:FC = () => {
    const { data, isLoading } = useGetHeroDataQuery("Banner", {});
    const [search, setSearch] = useState('')

    const router = useRouter()

    const title = data?.layout?.banner.title
    const subTitle = data?.layout?.banner.subTitle
    const image = data?.layout?.banner.image

    const handleSearch = () => {
        console.log('handleSearch', search)
        if(search === ''){
            return
        }

        router.push(`/courses?title=${search}`)
    }

    return (
        <>
            {
                isLoading
                    ? (<Loader/>)
                    : (
                        <div className='w-full 1000px:flex items-center'>
                        <div className="hero absolute top-[100px] 1000px:top-[unset] 1500px:h-[700px] 1500px:w-[700px] 1100px:h-[600px] 1100px:w-[600px] h-[50vh] w-[50vh] hero_animation rounded-full ml-[50px] "></div>
                        <div className='1000px:w-[40%] flex 1000px:min-h-screen items-center justify-center pt-[70px] 1000px:pt-[0] z-10'>
                            <img src={image} alt="" className='object-contain 1100px:max-w-[80%] w-[70%] 1500px:max-w-[85%] h-[auto] z-[10]'/>
                        </div>
                        <div className='1000px:w-[60%] flex flex-col items-center 1000px:mt-[0px] text-center 1000px:text-left mt-[150px]'>
                            <h2 className='dark:text-white text-[#000000c7] text-[30px] px-3 w-full 1000px:text-[70px] font-[600] font-Josefin py-2 1000px:leading-[75px] 1500px:w-[600px] typewriter'>
                                {title}
                            </h2>
                            <br />
                            <p className='dark:text-[#edfff4] text-[#000000ac] font-Josefin font-[600] text-[18px] 1500px:!w-[55%] 1100px:!w-[78%]'>
                                {subTitle}
                            </p>
                            <br />
                            <br />
                            <div className='1500px:w-[55%] 1100px:w-[78%] w-[90%] h-[50px] bg-transparent relative'>
                                <input
                                    type="search"
                                    placeholder='Найти курс....'
                                    className='bg-transparent border dark:border-none dark:bg-[#575757] dark:placeholder:text-[#ffffffdd] rounded-[5px] p-2 w-full h-full outline-none text-[#000004e] dark:text-[#fffffe6] text-[20px] font-[500] font-Josefin'
                                    value={search}
                                    onChange={(e)=> setSearch((e.target.value))}

                                />
                                <div
                                    className='absolute flex items-center justify-center w-[50px] cursor-pointer h-[50px] right-0 top-0 bg-[#39c1f3] rounded-r-[5px]'
                                    onClick={handleSearch}
                                >
                                    <BiSearch className="text-white" size={30}/>
                                </div>
                            </div>
                            <br />
                            <br />
                            <div className='1500px:w-[55%] 1100px:w-[78%] w-[90%] flex item-center'>
                                <div className='w-[40px] h-[40px] overflow-hidden rounded-full'>
                                    <Image src={require("../../../public/avatars/client-1.jpg")} alt="" width={100} height={100} className='rounded-full border-[3px]'/>
                                </div>
                                <div className='w-[40px] h-[40px] overflow-hidden rounded-full ml-[-10px]'>
                                    <Image src={require("../../../public/avatars/client-2.jpg")} alt="" width={100} height={100} className='rounded-full border-[3px]'/>
                                </div>
                                <div className='w-[40px] h-[40px] overflow-hidden rounded-full ml-[-10px]'>
                                    <Image src={require("../../../public/avatars/client-3.jpg")} alt="" width={100} height={100} className='rounded-full border-[3px]'/>
                                </div>

                                <p className='font-Montserrat dark:text-[#edfff4] text-[#000000b3] 1000px:pl-3 text-[18px] font-[600] flex items-center ml-[10px]'>
                                    Нам уже доверяют более 500 тыс. человек. {" "}
                                    <Link href="/courses" className='dark:text-[#46e256] text-[crimson] ml-3'>
                                        Посмотреть курсы
                                    </Link>{""}
                                </p>
                            </div>
                        </div>
                        <br/>
                    </div>
                    )
            }
        </>
    );
};

export default Hero;