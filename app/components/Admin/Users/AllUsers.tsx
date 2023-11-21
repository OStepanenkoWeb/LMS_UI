'use client'

import React, {ElementType, FC, useEffect, useState} from 'react';
import {useTheme} from "next-themes";
import {AiOutlineDelete, AiOutlineMail} from "react-icons/ai";
import {Box, Button, Modal} from "@mui/material";
import {DataGrid, GridPagination} from "@mui/x-data-grid";
import MuiPagination from '@mui/material/Pagination'
import Loader from "@/app/components/Loader/Loader";
import toast from "react-hot-toast";
import {format, register } from 'timeago.js'
import ru from 'timeago.js/lib/lang/ru'
import {useDeleteUserMutation, useGetAllUsersQuery, useUpdateUserRoleMutation} from "@/redux/features/user/userApi";
import {TablePaginationActionsProps} from "@mui/material/TablePagination/TablePaginationActions";
import {styles} from "@/app/styles/style";
import {TbUserEdit} from "react-icons/tb";

register('ru', ru)

interface IAllUsers {
    isTeam: boolean
}

const AllUsers:FC<IAllUsers> = ({isTeam}) => {
    const [dataTable, setDataTable] = useState([])
    const [active, setActive] = useState(false)
    const [email, setEmail] = useState("")
    const [role, setRole] = useState("admin")
    const [open, setOpen] = useState(false)
    const [userId, setUserId] = useState("")
    const { theme, setTheme } = useTheme()

    const {isLoading, data, error, refetch} = useGetAllUsersQuery({}, { refetchOnMountOrArgChange: true })
    const [updateUserRole, { error: updateError, data:dataUpdate }] = useUpdateUserRoleMutation()
    const [deleteUser, { isSuccess: deleteSuccess, error: deleteError }] = useDeleteUserMutation({})

    useEffect(() => {
        if (dataUpdate) {
            refetch();
            toast.success("Роль пользователя успешно обновлена");
            setActive(false);
        }

        if (deleteSuccess) {
            refetch();
            toast.success("Пользователь успешно удален!");
            setOpen(false);
        }
    }, [dataUpdate, deleteSuccess])


    useEffect(() => {
        if(error || updateError || deleteError) {
            let errorData = null

            if(error && 'data' in error) {
                errorData = error as any
            }

            if(updateError && 'data' in updateError) {
                errorData = updateError as any
            }

            if(deleteError && 'data' in deleteError) {
                errorData = deleteError as any
            }
            toast.error(errorData?.data?.message)
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

    }, [error, data, updateError, deleteError, refetch])

    const cleanUpdateUserForm = () => {
        setEmail('')
        setRole("admin")
    }

    const handleSubmit = async () => {
        await updateUserRole({ email, role });
        cleanUpdateUserForm()
    };

    const handleDelete = async () => {
        await deleteUser(userId);
    };

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
                        <Button
                            onClick={() => {
                                setOpen(!open);
                                setUserId(params.row.id);
                            }}
                        >
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
                        <div className='w-full flex justify-end'>
                            <div
                                className='rounded-full cursor-pointer bg-[#2190ff] w-full text-[16px] !h-[35px] font-Poppins font-semibold flex flex-row justify-center py-2 px-2 !w-[38px]'
                                onClick={() => setActive(!active)}
                            >

                                <TbUserEdit
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
                        {active && (
                            <Modal
                                open={active}
                                onClose={() => setActive(!active)}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description"
                            >
                                <Box className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[450px] bg-white dark:bg-slate-900 rounded-[8px] shadow p-4 outline-none">
                                    <h1 className={`${styles.title}`}>Изменить роль пользователя</h1>
                                    <div className="mt-4">
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="Введите email..."
                                            className={`${styles.input}`}
                                        />
                                        <select
                                            name=""
                                            id=""
                                            className={`${styles.select} !mt-6`}
                                            onChange={(e: any) => setRole(e.target.value)}
                                        >
                                            <option value="admin">Admin</option>
                                            <option value="user">User</option>
                                        </select>
                                        <br />
                                        <div
                                            className={`${styles.button} my-6 !h-[30px]`}
                                            onClick={handleSubmit}
                                        >
                                            Применить
                                        </div>
                                    </div>
                                </Box>
                            </Modal>
                        )}
                        {open && (
                            <Modal
                                open={open}
                                onClose={() => setOpen(!open)}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description"
                            >
                                <Box className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[450px] bg-white dark:bg-slate-900 rounded-[8px] shadow p-4 outline-none">
                                    <h1 className={`${styles.title}`}>
                                        Вы действительно хотите удалить пользователя?
                                    </h1>
                                    <div className="flex w-full items-center justify-between mb-6 mt-4">
                                        <div
                                            className={`${styles.button} !w-[120px] h-[30px] bg-[#57c7a3]`}
                                            onClick={() => setOpen(!open)}
                                        >
                                            Отменить
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

export default AllUsers;