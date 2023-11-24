import React, {FC} from 'react';
import Link from "next/link";

interface INavItems {
    activeItem: number
    isMobile: boolean
}

const navItemsData = [{
    name: 'Главная',
    url: '/'
}, {
    name: 'Курсы',
    url: '/course'
}, {
    name: 'О нас',
    url: '/about'
}, {
    name: 'Соглашение',
    url: '/policy'
}, {
    name: 'FAQ',
    url: '/faq'
}]

const NavItems: FC<INavItems> = ({activeItem, isMobile}) => {
    return (<>
            <div className="hidden 800px:flex">
                {
                    navItemsData && navItemsData.map((item, index) => (
                        <Link href={`${item.url}`} key={item.url} passHref>
                            <span
                                className={`${
                                    activeItem === index 
                                        ? 'dark:text-[#37a39a] text-[crimson]' 
                                        : 'dark:text-white text-black'} text-[18px] px-6 font-Montserrat font-[400]`
                            }>
                                {item.name}
                            </span>
                    </Link>))}
            </div>
            {isMobile && (<div className="800px:hidden mt-5">
                <div className='w-full text-center py-6'>
                    <Link href={'/'} passHref>
                        <span className={`text-3xl font-Montserrat font-[500] text-black dark:text-white`}>
                            LMS
                        </span>
                    </Link>
                </div>
                        {
                            navItemsData && navItemsData.map((item, index) => (
                                <Link href="/" key={item.url} passHref>
                                    <span
                                        className={`${
                                            activeItem === index 
                                                ? 'dark:text-[#37a39a] text-[crimson]' 
                                                : 'dark:text-white text-black'} 
                                                block py-5 text-[18px] px-6 font-Poppins font-[400]`
                                    }>
                                {item.name}
                            </span>
                            </Link>))}
                </div>)}

        </>);
};

export default NavItems;