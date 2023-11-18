'use client';
import React, { useState } from 'react';
import CourseInformation from './CourseInformation';
import CourseOptions from './CourseOptions';
import CourseData from './CourseData';
import CourseContent from './CourseContent';
import CoursePreview from "@/app/components/Admin/Course/CoursePreview";

type Props = {};

interface IInfoCourse {
    name: string,
    description: string,
    price: string,
    estimatedPrice: string,
    tags: string,
    level: string,
    demoUrl: string,
    thumbnail: string,
}

const CreateCourse = () => {
    const [active, setActive] = useState(0);
    const [courseInfo, setCourseInfo] = useState<IInfoCourse>({
        name: '',
        description: '',
        price: '',
        estimatedPrice: '',
        tags: '',
        level: '',
        demoUrl: '',
        thumbnail: '',
    });
    const [benefits, setBenefits] = useState([{ title: '' }]);
    const [prerequisites, setPrerequisites] = useState([{ title: '' }]);
    const [courseContentData, setCourseContentData] = useState([
        {
            videoUrl: '',
            title: '',
            description: '',
            videoSection: 'Урок',
            links: [
                {
                    title: '',
                    url: '',
                },
            ],
            suggestion: '',
        },
    ]);
    const [courseData, setCourseData] = useState({});

    const handleSubmit = () => {
        const benefitsFormatted = benefits.map(benefit => {
            return {
                title: benefit.title
            }
        })
        // courseContent formatted
        // requirements formatted
        const requirementsFormatted = prerequisites.map((requirement) => ({title: requirement.title}))
        // courseContent formatted
        const courseContentFormatted = courseContentData.map(content => {
            return {
                title: content.title,
                videoUrl: content.videoUrl,
                description: content.description,
                videoSection: content.videoSection,
                links: content.links.map(link => {
                    return {
                        title: link.title,
                        url: link.url
                    }
                }),
                suggestions: content.suggestion
            }
        })
        // prepare course data object
        const courseData = {
            name: courseInfo.name,
            description: courseInfo.description,
            price: courseInfo.price,
            estimatedPrice: courseInfo.estimatedPrice,
            tags: courseInfo.tags.split(","),
            level: courseInfo.level,
            thumbnail: courseInfo.thumbnail,
            demoUrl: courseInfo.demoUrl,
            benefits: benefitsFormatted,
            requirements: requirementsFormatted,
            courseContent: courseContentFormatted
        }
        setCourseData(courseData)
        console.log(courseData);
    };
    const handelCourseCreation = async() => {
        console.log(courseData);

    }
    return (
        <div className='w-full flex min-h-screen'>
            <div className='w-[80%]'>
                {active === 0 && (
                    <CourseInformation
                        courseInfo={courseInfo}
                        setCourseInfo={setCourseInfo}
                        active={active}
                        setActive={setActive}
                    />
                )}
                {active === 1 && (
                    <CourseData
                        benefits={benefits}
                        setBenefits={setBenefits}
                        prerequisites={prerequisites}
                        setPrerequisites={setPrerequisites}
                        active={active}
                        setActive={setActive}
                    />
                )}
                {active === 2 && (
                    <CourseContent
                        active={active}
                        setActive={setActive}
                        courseContentData={courseContentData}
                        setCourseContentData={setCourseContentData}
                        handleSubmit={handleSubmit}
                    />
                )}
                {active === 3 && (
                    <CoursePreview
                        active={active}
                        setActive={setActive}
                        courseData={courseData}
                        handelCourseCreation={handelCourseCreation}
                    />
                )}
            </div>
            <div className='w-[20%] mt-[100px] h-screen fixed z-[-1] top-18 right-0'>
                <CourseOptions active={active} setActive={setActive} />
            </div>
        </div>
    );
};

export default CreateCourse;