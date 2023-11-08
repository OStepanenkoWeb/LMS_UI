import React, {FC} from "react";
import Link from "next/link";
import { MenuItem } from 'react-pro-sidebar'
import { Box, Typography } from '@mui/material'

type IItemAdminSidebar = {
    title: string;
    to: string;
    icon: JSX.Element;
    selected: string;
    setSelected: any;
    isCollapsed: boolean;
};

const ItemAdminSidebar: FC<IItemAdminSidebar> = ({
                                 title,
                                 to,
                                 icon,
                                 selected,
                                 setSelected,
                                 isCollapsed,
                             }) => {
    return (
        <Link href={to} passHref>
            <MenuItem
                active={selected === title}
                onClick={() => setSelected(title)}
            >
                <Box display='flex' alignItems='center' gap={2}>
                    <Box display='flex' alignItems='center'>
                        {icon}
                    </Box>
                    {!isCollapsed && (
                        <Typography className='!text-[16px] !font-poppins '>
                            {title}
                        </Typography>
                    )}
                </Box>
            </MenuItem>
        </Link>
    );
};

export default ItemAdminSidebar