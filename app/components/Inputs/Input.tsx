'use client'

import React, {FC} from 'react';
import {styles} from "@/app/styles/style";
import {IconType} from "react-icons/lib";

interface IInput {
    id: string
    errors?: object
    values?: object
    touched?: object
    label?: string
    type?: string
    placeholder?: string
    handleChange?: () => void
    handleIcon?: () => void
    icon?: IconType
}

const Input: FC<IInput> = ({
                               values,
                               errors,
                               id,
                               touched,
                               handleChange,
                               label,
                               type,
                               placeholder,
                               handleIcon,
                               icon: IconComponent
                           }) => {

    const error = errors ? errors[id] : ''
    const touch = touched ? touched[id] : ''
    const value = values ? values[id] : ''

    return (<div className='w-full mt-5 relative mb-1'>
            <label
                className='text-[16px] font-Poppins text-black dark:text-white'
                htmlFor={id}
            >
                {label}
            </label>
            <input
                id={id}
                type={type || 'text'}
                name={id}
                placeholder={placeholder}
                value={value}
                className={`${error && touch && 'border-red-500'} ${styles.input}`}
                onChange={handleChange}
            />
            {error && touch && (<span className='text-red-500 pt-2 block'>{error}</span>)}
            {IconComponent && <IconComponent
                    className='absolute bottom-3 right-2 z-1 cursor-pointer'
                    size={20}
                    onClick={handleIcon}
                />}
        </div>);
};

export default Input;