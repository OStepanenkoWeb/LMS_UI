'use client'

import React, {ElementType, FC, useEffect, useState} from 'react';
import {useTheme} from "next-themes";
import {AiOutlineDelete, AiOutlineMail, AiOutlineUserAdd} from "react-icons/ai";
import {Box, Button} from "@mui/material";
import {DataGrid, GridPagination} from "@mui/x-data-grid";
import MuiPagination from '@mui/material/Pagination'
import Loader from "@/app/components/Loader/Loader";
import toast from "react-hot-toast";
import {format, register } from 'timeago.js'
import ru from 'timeago.js/lib/lang/ru'
import {useGetAllUsersQuery} from "@/redux/features/user/userApi";
import {TablePaginationActionsProps} from "@mui/material/TablePagination/TablePaginationActions";

register('ru', ru)

interface IAllUsers {
    isTeam: boolean
}

const AllUsers:FC<IAllUsers> = ({isTeam}) => {
    const [dataTable, setDataTable] = useState([])
    const { theme, setTheme } = useTheme()
    const {isLoading, data, error} = useGetAllUsersQuery({})

    useEffect(() => {
        if(error) {
            if('data' in error) {
                const errorData = error as any
                toast.error(errorData.data.message)
            }
        }

        if(data) {
            const coursesMapping = (user:any) => {
                return {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    courses: user.courses.length,
                    createdAt: format(user.createdAt, 'ru')
                }
            }

            setDataTable(data?.users
                .map(coursesMapping)
                .filter((user:any) => isTeam ?  user.role === 'admin' : user) || [])
        }

    }, [data, error])

    const columns = [
        {field: 'id', headerName: 'ID', flex: 0.3 },
        {field: 'name', headerName: 'Имя', flex: 0.5 },
        {field: 'email', headerName: 'Email', flex: 0.5 },
        {field: 'role', headerName: 'Роль', flex: 0.5 },
        {field: 'courses', headerName: 'Приобретено курсов', flex: 0.5 },
        {field: 'createdAt', headerName: 'Дата регистрации', flex: 0.5 },
        {field: ' ', headerName: 'Удалить', flex: 0.2, renderCell: (params: any) => {
                return (
                    <>
                        <Button>
                            <AiOutlineDelete
                                className='dark:text-white text-black'
                                size={20}
                            />
                        </Button>
                    </>
                )
            }},
        {field: '  ', headerName: 'Email', flex: 0.2, renderCell: (params: any) => {
                return (
                    <>
                        <a href={`mailto:${params.row.email}`}>
                            <AiOutlineMail
                                className='dark:text-white text-black'
                                size={20}
                            />
                        </a>
                    </>
                )
            }}
    ]

    const CustomPagination = (props: any) => {
        return (
            <GridPagination
                ActionsComponent={MuiPagination as ElementType<TablePaginationActionsProps> | undefined }
                labelRowsPerPage='Строк в странице'
            />
        )
    }

    return (
        <div className='mt-[120px]'>
            {
                isLoading ? (
                    <Loader/>
                ) : (
                    <Box m='20px'>
                        <div className='w-full flex justify-end'>
                            <div className='rounded-full cursor-pointer bg-[#2190ff] w-full text-[16px] !h-[35px] font-Poppins font-semibold flex flex-row justify-center py-2 px-2 !w-[38px]'>
                                <AiOutlineUserAdd
                                    className='dark:text-white text-black'
                                    size={20}
                                />
                            </div>
                        </div>
                        <Box m='40px 0 0 0 '
                             height='80vh'
                             sx={{
                                 '& .MuiDataGrid-root': {
                                     border: 'none',
                                     outline: 'none'
                                 },
                                 '& css-pqjvzy-MuiSvgIcon-root-MuiSelect-icon': {
                                     color: theme === 'dark' ? '#fff' : '#000',
                                 },
                                 "& .MuiDataGrid-sortIcon": {
                                     color: theme === 'dark' ? '#fff' : '#000',
                                 },
                                 "& .MuiDataGrid-row": {
                                     color: theme === 'dark' ? '#fff' : '#000',
                                     borderBottom: theme === 'dark'
                                         ? "1px solid #ffffff30!important"
                                         : "1px solid #ccc!important",
                                 },
                                 "& .MuiTablePagination-root": {
                                     color: theme === 'dark' ? '#fff' : '#000',
                                 },
                                 "& .MuiDataGrid-cell": {
                                     borderBottom: "none",
                                 },
                                 "& .name-column--cell": {
                                     color: theme === 'dark' ? '#fff' : '#000',
                                 },
                                 "& .MuiDataGrid-columnHeaders": {
                                     backgroundColor: theme === 'dark' ? "#3e4396" : "#A4A9FC",
                                     borderBottom: "none",
                                     color: theme === 'dark' ? '#fff' : '#000',
                                 },
                                 "& .MuiDataGrid-virtualScroller": {
                                     backgroundColor: theme === 'dark' ? "#1F2A40" : "#F2F0F0",
                                 },
                                 "& .MuiDataGrid-footerContainer": {
                                     color: theme === 'dark' ? '#fff' : '#000',
                                     borderTop: "none",
                                     backgroundColor: theme === 'dark' ? "#3e4396" : "#A4A9FC",
                                 },
                                 "& .MuiCheckbox-root": {
                                     color: theme === 'dark' ? `#b7ebde !important` : `#000 !important`,
                                 },
                                 "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                                     color: `#fff !important`,
                                 },
                             }}
                        >
                            <DataGrid
                                checkboxSelection
                                rows={dataTable}
                                columns={columns}
                                slots={{
                                    pagination: CustomPagination,
                                }}
                            />
                        </Box>
                    </Box>
                )
            }
        </div>
    );
};

export default AllUsers;