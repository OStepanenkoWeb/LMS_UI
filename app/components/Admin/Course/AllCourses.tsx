'use client'

import React, {ElementType, FC, useEffect, useState} from 'react';
import {useTheme} from "next-themes";
import {AiOutlineDelete, AiOutlineEdit} from "react-icons/ai";
import {Box, Button} from "@mui/material";
import {DataGrid, GridPagination} from "@mui/x-data-grid";
import MuiPagination from '@mui/material/Pagination'
import {useGetAllCoursesQuery} from "@/redux/features/courses/coursesApi";
import Loader from "@/app/components/Loader/Loader";
import toast from "react-hot-toast";
import {format, register } from 'timeago.js'
import ru from 'timeago.js/lib/lang/ru'
import {TablePaginationActionsProps} from "@mui/material/TablePagination/TablePaginationActions";

register('ru', ru)

const AllCourses:FC = () => {
    const [dataTable, setDataTable] = useState([])
    const { theme, setTheme } = useTheme()
    const {isLoading, data, error} = useGetAllCoursesQuery({})

    useEffect(() => {
        if(error) {
            if('data' in error) {
                const errorData = error as any
                toast.error(errorData.data.message)
            }
        }

        if(data) {
            const coursesMapping = (course:any) => {
                return {
                    id: course._id,
                    name: course.name,
                    ratings: course.ratings,
                    purchased: course.purchased,
                    createdAt: format(course.createdAt, 'ru')
                }
            }
            const newDataTable = data?.courses.map(coursesMapping) || []
            setDataTable(newDataTable)
        }

    }, [data, error])

    const columns = [
        {field: 'id', headerName: 'ID', flex: 0.3 },
        {field: 'name', headerName: 'Название курса', flex: 1 },
        {field: 'ratings', headerName: 'Рейтинг', flex: 0.5 },
        {field: 'purchased', headerName: 'Особенность', flex: 0.5 },
        {field: 'createdAt', headerName: 'Дата создания', flex: 0.5 },
        {field: ' ', headerName: 'Редактировать', flex: 0.3, renderCell: (params: any) => {
                return (
                    <>
                        <Button>
                            <AiOutlineEdit
                                className='dark:text-white text-black'
                                size={20}
                            />
                        </Button>
                    </>
                )
            }},
        {field: '  ', headerName: 'Удалить', flex: 0.2, renderCell: (params: any) => {
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

export default AllCourses;