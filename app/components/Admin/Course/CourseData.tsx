import { styles } from '@/app/styles/style';
import React, { FC } from 'react';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CloseIcon from '@mui/icons-material/Close';
import toast from 'react-hot-toast';
import {BsArrowLeftShort, BsArrowRightShort} from "react-icons/bs";

type ICourseData = {
    benefits: { title: string }[];
    setBenefits: (benefits: { title: string }[]) => void;
    prerequisites: { title: string }[];
    setPrerequisites: (prerequisites: { title: string }[]) => void;
    active: number;
    setActive: (active: number) => void;
};

const CourseData: FC<ICourseData> = ({
                                   benefits,
                                   setBenefits,
                                   prerequisites,
                                   setPrerequisites,
                                   active,
                                   setActive,
                               }) => {
    //handle benefits

    const handleBenefitChange = (index: number, value: any) => {
        const updateBenefits = [...benefits];
        updateBenefits[index].title = value;
        setBenefits(updateBenefits);
    };

    const handleAddBenefit = () => {
        setBenefits([...benefits, { title: '' }]);
    };

    const handleRemoveBenefit = (index: number) => {
        const updatedBenefits = [...benefits];
        updatedBenefits.splice(index, 1); // Remove the benefit at the given index
        setBenefits(updatedBenefits);
    };

    //handle prerequisites

    const handlePrerequisiteChange = (index: number, value: any) => {
        const updatePrerequisites = [...prerequisites];
        updatePrerequisites[index].title = value;
        setPrerequisites(updatePrerequisites);
    };

    const handleAddPrerequisite = () => {
        setPrerequisites([...prerequisites, { title: '' }]);
    };

    const handleRemovePrerequisite = (index: number) => {
        const updatedPrerequisites = [...prerequisites];
        updatedPrerequisites.splice(index, 1); // Remove the prerequisite at the given index
        setPrerequisites(updatedPrerequisites);
    };

    const prevButton = () => {
        setActive(active - 1);
    };

    const handleOptions = () => {
        if (
            benefits[benefits.length - 1]?.title !== '' &&
            prerequisites[prerequisites.length - 1]?.title !== ''
        ) {
            setActive(active + 1);
        } else {
            toast.error('Пожалуйста, заполните все поля');
        }
    };

    return (
        <div className='w-[80%] m-auto mt-24 block'>
            <div>
                <label className={`${styles.label} text-[20px]`}>
                    Какие преимущества для слушателей, проходящих этот курс?
                </label>
                <br />
                {benefits.map((benefit: any, index: number) => (
                    <div key={index} className='flex items-center'>
                        <input
                            type='text'
                            name='Benefit'
                            placeholder='Вы сможете создать полнофункциональную платформу LMS...'
                            required
                            className={`${styles.input} my-2 flex-grow`}
                            value={benefit.title}
                            onChange={(e: any) => {
                                handleBenefitChange(index, e.target.value);
                            }}
                        />
                        {/* Show the remove button for all inputs except the first one */}
                        {index > 0 && (
                            <span
                                className='ml-2 cursor-pointer'
                                onClick={() => handleRemoveBenefit(index)}
                            >
								<CloseIcon className='text-[#384766] dark:text-white' />
							</span>
                        )}
                    </div>
                ))}
                <AddCircleIcon
                    className={`text-[#384766] dark:text-white cursor-pointer`}
                    onClick={handleAddBenefit}
                />
            </div>
            <br />

            {/* handle prerequisites..............................*/}

            <div>
                <label className={`${styles.label} text-[20px]`}>
                    Какие знания/навыки должны быть у слушателей перед прохождением курса?
                </label>
                <br />
                {prerequisites.map((prerequisite: any, index: number) => (
                    <div key={index} className='flex items-center'>
                        <input
                            type='text'
                            name='prerequisite'
                            placeholder='Вам нужны базовые знания javascript...'
                            required
                            className={`${styles.input} my-2 flex-grow`}
                            value={prerequisite.title}
                            onChange={(e: any) => {
                                handlePrerequisiteChange(index, e.target.value);
                            }}
                        />
                        {/* Show the remove button for all inputs except the first one */}
                        {index > 0 && (
                            <span
                                className='ml-2 cursor-pointer'
                                onClick={() => handleRemovePrerequisite(index)}
                            >
								<CloseIcon className='text-[#384766] dark:text-white' />
							</span>
                        )}
                    </div>
                ))}
                <AddCircleIcon
                    className={`text-[#384766] dark:text-white cursor-pointer`}
                    onClick={handleAddPrerequisite}
                />
            </div>
            <div className='w-full flex items-center justify-between'>
                <div
                    className='w-full 800px:w-[180px] flex items-center justify-center h-[40px] bg-[#37a39a] text-center dark:text-white text-black rounded mt-8 cursor-pointer'
                    onClick={() => prevButton()}
                >
                    <span>
                        <BsArrowLeftShort size={30}/>
                    </span>
                    Назад
                </div>
                <div
                    className='w-full 800px:w-[180px] flex items-center justify-center h-[40px] bg-[#37a39a] text-center dark:text-white text-black rounded mt-8 cursor-pointer'
                    onClick={() => handleOptions()}
                >
                    Далее
                    <span>
                        <BsArrowRightShort size={30}/>
                    </span>
                </div>
            </div>
        </div>
    );
};

export default CourseData;