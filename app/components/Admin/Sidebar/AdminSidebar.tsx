'use client'

import React, {FC, useEffect, useState} from 'react';
import { ProSidebar, Menu, MenuItem } from 'react-pro-sidebar'
import { Box, IconButton, Typography } from '@mui/material'
import {useSelector} from "react-redux";
import {useTheme} from "next-themes";
import {
    ArrowBackIosIcon,
    ArrowForwardIosIcon, BarChartOutlinedIcon, ExitToAppIcon, GroupsIcon,
    HomeOutlinedIcon, ManageHistoryIcon, MapOutlinedIcon, OndemandVideoIcon,
    PeopleOutlinedIcon, QuizIcon,
    ReceiptOutlinedIcon, SettingsIcon, TrendingUpOutlinedIcon, VideoCallIcon, WebIcon
} from "@/app/components/Admin/Icon";
import Link from "next/link";
import Image from "next/image"

import avatarDefault from '../../../../public/avatars/avatar.png'
import ItemAdminSidebar from "@/app/components/Admin/Sidebar/ItemAdminSidebar";
import {GetStaticUrl} from "@/app/utils/GetStaticPath";

const AdminSidebar:FC = () => {
    const { user } = useSelector((state: any) => state.auth);
    const [logout, setLogout] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [selected, setSelected] = useState('Dashboard');
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme } = useTheme();

    useEffect(() => setMounted(true), []);

    if (!mounted) return null;

    const logoutHandler = () => {
        setLogout(true);
    };

    return (
        <Box
            sx={{
                '& .pro-sidebar-inner': {
                    background: `${
                        theme === 'dark'
                            ? '#111c43 !important'
                            : '#fff !important'
                    }`,
                },
                '& .pro-icon-wrapper': {
                    backgroundColor: 'transparent !important',
                },
                '& .pro-inner-item:hover': {
                    color: '#868dfb !important',
                },
                '& .pro-menu-item.active': {
                    color: '#6870fa !important',
                },
                '& .pro-inner-item': {
                    padding: '5px 20px 5px 20px !important',
                    opacity: 1,
                },
                '& .pro-menu-item': {
                    color: `${theme !== 'dark' && '#000'} `,
                },
                '& .pro-sidebar': {
                    height: '100vh',
                    overflowY: 'auto',
                },
            }}
            className='!bg-white dark:bg-[#111c43]'
        >
            <ProSidebar
                collapsed={isCollapsed}
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                }}
            >
                <Menu iconShape='square'>
                    <MenuItem
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        icon={isCollapsed ? <ArrowForwardIosIcon /> : undefined}
                        style={{
                            margin: '0 0 20px 0',
                        }}
                    >
                        {!isCollapsed && (
                            <Box
                                display='flex'
                                justifyContent='space-evenly'
                                alignItems='center'
                                gap={5}
                                ml='15px'
                            >
                                <Link
                                    href={'/'}
                                    passHref
                                    className='text-[25px] uppercase dark:text-white text-black'
                                >
                                    LMS
                                </Link>

                                <IconButton
                                    onClick={() => setIsCollapsed(!isCollapsed)}
                                    className='inline-block'
                                >
                                    <ArrowBackIosIcon className='text-black dark:text-white' />
                                </IconButton>
                            </Box>
                        )}
                    </MenuItem>
                    {!isCollapsed && (
                        <Box mb='25px'>
                            <Box
                                display='flex'
                                justifyContent='center'
                                alignItems='center'
                                height='100px'
                            >
                                <Image
                                    alt='profile-user'
                                    src={
                                        GetStaticUrl(user.avatar
                                            ? user.avatar
                                            : avatarDefault)
                                    }
                                    width={100}
                                    height={100}
                                    style={{
                                        height: '100%',
                                        cursor: 'pointer',
                                        borderRadius: '50%',
                                        border: '3px solid #5b6fe6',
                                    }}
                                />
                            </Box>
                            <Box textAlign='center'>
                                <Typography
                                    variant='h4'
                                    className='!text-[20px] text-black dark:text-white'
                                    sx={{ m: '10px 0 0 0' }}
                                >
                                    {user?.name}
                                </Typography>
                                <Typography
                                    variant='h6'
                                    sx={{ m: '10px 0 0 0' }}
                                    className='!text-[20px] text-black dark:text-white capitalize'
                                >
                                    {user?.role}
                                </Typography>
                            </Box>
                        </Box>
                    )}

                    <Box>
                        <ItemAdminSidebar
                            title='Панель администратора'
                            to='/admin'
                            icon={<HomeOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                            isCollapsed={isCollapsed}
                        />
                        <br />
                        <MenuItem>
                            {!isCollapsed && (
                                <Typography className='!text-[18px] !font-poppins'>
                                    Данные
                                </Typography>
                            )}
                        </MenuItem>
                        <ItemAdminSidebar
                            title='Пользователи'
                            to='/admin/users'
                            icon={<PeopleOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                            isCollapsed={isCollapsed}
                        />
                        <ItemAdminSidebar
                            title='Заявки'
                            to='/admin/invoices'
                            icon={<ReceiptOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                            isCollapsed={isCollapsed}
                        />
                        <br />
                        {/* Content */}
                        <MenuItem>
                            {!isCollapsed && (
                                <Typography className='!text-[18px] !font-poppins'>
                                    Контент
                                </Typography>
                            )}
                        </MenuItem>
                        <ItemAdminSidebar
                            title='Создание курса'
                            to='/admin/create-course'
                            icon={<VideoCallIcon />}
                            selected={selected}
                            setSelected={setSelected}
                            isCollapsed={isCollapsed}
                        />
                        <ItemAdminSidebar
                            title='Опубликованные курсы'
                            to='/admin/courses'
                            icon={<OndemandVideoIcon />}
                            selected={selected}
                            setSelected={setSelected}
                            isCollapsed={isCollapsed}
                        />
                        <br />

                        {/* Customization */}
                        <MenuItem>
                            {!isCollapsed && (
                                <Typography className='!text-[18px] !font-poppins'>
                                    Управление контентом
                                </Typography>
                            )}
                        </MenuItem>
                        <ItemAdminSidebar
                            title='Заглавная страница'
                            to='/admin/hero'
                            icon={<WebIcon />}
                            selected={selected}
                            setSelected={setSelected}
                            isCollapsed={isCollapsed}
                        />
                        <ItemAdminSidebar
                            title='FAQ'
                            to='/admin/faq'
                            icon={<QuizIcon />}
                            selected={selected}
                            setSelected={setSelected}
                            isCollapsed={isCollapsed}
                        />
                        <ItemAdminSidebar
                            title='Категории'
                            to='/admin/categories'
                            icon={<GroupsIcon />}
                            selected={selected}
                            setSelected={setSelected}
                            isCollapsed={isCollapsed}
                        />
                        <br />

                        {/* Controllers */}
                        <MenuItem>
                            {!isCollapsed && (
                                <Typography className='!text-[18px] !font-poppins'>
                                    Менеджмент
                                </Typography>
                            )}
                        </MenuItem>
                        <ItemAdminSidebar
                            title='Управление командой'
                            to='/admin/team'
                            icon={<ManageHistoryIcon />}
                            selected={selected}
                            setSelected={setSelected}
                            isCollapsed={isCollapsed}
                        />
                        <br />

                        {/* Analytics */}
                        <MenuItem>
                            {!isCollapsed && (
                                <Typography className='!text-[18px] !font-poppins'>
                                    Аналитика
                                </Typography>
                            )}
                        </MenuItem>
                        <ItemAdminSidebar
                            title='Аналитика курсов'
                            to='/admin/courses-analytics'
                            icon={<BarChartOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                            isCollapsed={isCollapsed}
                        />
                        <ItemAdminSidebar
                            title='Аналитика заказов'
                            to='/admin/orders-analytics'
                            icon={<MapOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                            isCollapsed={isCollapsed}
                        />
                        <ItemAdminSidebar
                            title='Аналитика пользователей'
                            to='/admin/users-analytics'
                            icon={<TrendingUpOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                            isCollapsed={isCollapsed}
                        />
                        <br />

                        {/* Extras */}
                        <MenuItem>
                            {!isCollapsed && (
                                <Typography className='!text-[18px] !font-poppins'>
                                    Дополнительно
                                </Typography>
                            )}
                        </MenuItem>
                        <ItemAdminSidebar
                            title='Настройки'
                            to='/admin/settings'
                            icon={<SettingsIcon />}
                            selected={selected}
                            setSelected={setSelected}
                            isCollapsed={isCollapsed}
                        />
                        <Box onClick={logoutHandler}>
                            <ItemAdminSidebar
                                title='Выход'
                                to='/'
                                icon={<ExitToAppIcon />}
                                selected={selected}
                                setSelected={setSelected}
                                isCollapsed={isCollapsed}
                            />
                        </Box>
                        <br />
                    </Box>
                </Menu>
            </ProSidebar>
        </Box>
    );
};

export default AdminSidebar;