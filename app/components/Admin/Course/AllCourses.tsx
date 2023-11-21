'use client'

import React, {ElementType, FC, useEffect, useState} from 'react';
import {useTheme} from "next-themes";
import {AiOutlineDelete, AiOutlineEdit} from "react-icons/ai";
import {Box, Button, Modal} from "@mui/material";
import {DataGrid, GridPagination} from "@mui/x-data-grid";
import MuiPagination from '@mui/material/Pagination'
import {useDeleteCourseMutation, useGetFullCoursesQuery} from "@/redux/features/courses/coursesApi";
import Loader from "@/app/components/Loader/Loader";
import toast from "react-hot-toast";
import {format, register } from 'timeago.js'
import ru from 'timeago.js/lib/lang/ru'
import {TablePaginationActionsProps} from "@mui/material/TablePagination/TablePaginationActions";
import Link from "next/link";
import {styles} from "@/app/styles/style";

register('ru', ru)

const AllCourses:FC = () => {
    const [dataTable, setDataTable] = useState([])
    const { theme, setTheme } = useTheme()
    const [open, setOpen] = useState(false)
    const [courseId, setCourseId] = useState("")

    const {isLoading, data, error, refetch } = useGetFullCoursesQuery({}, { refetchOnMountOrArgChange: true })
    const [deleteCourse, { isSuccess, error: errorDelete }] = useDeleteCourseMutation({})

    useEffect(() => {
        if (isSuccess) {
            setOpen(false);
            refetch();
            toast.success("Курс успешно удален!");
        }
        if (errorDelete) {
            if ("data" in errorDelete) {
                const errorMessage = errorDelete as any;
                toast.error(errorMessage.data.message);
            }
        }
    }, [isSuccess, errorDelete, refetch]);

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
                        <Link href={`/admin/edit-course/${params.row.id}`}>
                            <AiOutlineEdit
                                className='dark:text-white text-black'
                                size={20}
                            />
                        </Link>
                    </>
                )
            }},
        {field: '  ', headerName: 'Удалить', flex: 0.2, renderCell: (params: any) => {
            return (
                <>
                    <Button
                        onClick={() => {
                            setOpen(!open);
                            setCourseId(params.row.id);
                        }}
                    >
                        <AiOutlineDelete
                            className='dark:text-white text-black'
                            size={20}
                        />
                    </Button>
                </>
            )
            }}
    ]

    const handleDelete = async () => {
        await deleteCourse(courseId);
    };

    const CustomPagination = () => {
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
                        {open && (
                            <Modal
                                open={open}
                                onClose={() => setOpen(!open)}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description"
                            >
                                <Box className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[450px] bg-white dark:bg-slate-900 rounded-[8px] shadow p-4 outline-none">
                                    <h1 className={`${styles.title}`}>
                                        Вы действительно хотите удалить курс?
                                    </h1>
                                    <div className="flex w-full items-center justify-between mb-6 mt-4">
                                        <div
                                            className={`${styles.button} !w-[120px] h-[30px] bg-[#47d097]`}
                                            onClick={() => setOpen(!open)}
                                        >
                                            Отмена
                                        </div>
                                        <div
                                            className={`${styles.button} !w-[120px] h-[30px] bg-[#d63f3f]`}
                                            onClick={handleDelete}
                                        >
                                            Удалить
                                        </div>
                                    </div>
                                </Box>
                            </Modal>
                        )}
                    </Box>
                )
            }
        </div>
    );
};

export default AllCourses;