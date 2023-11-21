import {FC, useEffect, useState} from "react";
import toast from "react-hot-toast";
import {redirect} from "next/navigation";
import CourseInformation from "@/app/components/Admin/Course/CourseInformation";
import CourseData from "@/app/components/Admin/Course/CourseData";
import CourseContent from "@/app/components/Admin/Course/CourseContent";
import CoursePreview from "@/app/components/Admin/Course/CoursePreview";
import CourseOptions from "@/app/components/Admin/Course/CourseOptions";
import {
    useEditCourseMutation,
    useGetFullCoursesQuery
} from "@/redux/features/courses/coursesApi";

interface IEditCourse {
    id: string;
}

const EditCourse: FC<IEditCourse> = ({ id }) => {
    const [editCourse, { isSuccess, error }] = useEditCourseMutation();
    const { data, refetch } = useGetFullCoursesQuery({}, { refetchOnMountOrArgChange: true });

    const editCourseData = data && data.courses.find((i: any) => i._id === id);

    useEffect(() => {
        if (isSuccess) {
            toast.success("Курс успешно обновлен");
            redirect("/admin/courses");
        }
        if (error) {
            if ("data" in error) {
                const errorMessage = error as any;
                toast.error(errorMessage.data.message);
            }
        }
    }, [isSuccess, error]);

    const [active, setActive] = useState(0);

    const [courseInfo, setCourseInfo] = useState({
        name: "",
        description: "",
        price: "",
        estimatedPrice: "",
        tags: "",
        level: "",
        categories: "",
        demoUrl: "",
        thumbnail: "",
    });

    const [benefits, setBenefits] = useState([{ title: "" }]);
    const [prerequisites, setPrerequisites] = useState([{ title: "" }]);
    const [courseContentData, setCourseContentData] = useState([
        {
            videoUrl: "",
            title: "",
            description: "",
            videoSection: "Пустая секция",
            videoLength: "",
            links: [
                {
                    title: "",
                    url: "",
                },
            ],
            suggestion: "",
        },
    ]);

    const [courseData, setCourseData] = useState({});

    useEffect(() => {
        if (editCourseData) {
            setCourseInfo({
                name: editCourseData.name,
                description: editCourseData.description,
                price: editCourseData.price,
                estimatedPrice: editCourseData?.estimatedPrice,
                tags: editCourseData.tags,
                level: editCourseData.level,
                categories: editCourseData.categories,
                demoUrl: editCourseData.demoUrl,
                thumbnail: editCourseData?.thumbnail,
            });
            const dummyBenefit = editCourseData.benefits.map((obj: any) => ({
                title: obj.title,
            }));
            setBenefits(dummyBenefit);

            const dummyPrerequisites = editCourseData.prerequisites.map(
                (obj: any) => ({
                    title: obj.title,
                })
            );
            setPrerequisites(dummyPrerequisites);
            const dummy = editCourseData.courseData.map((obj: any) => ({
                title: obj.title,
                videoUrl: obj.videoUrl,
                description: obj.description,
                videoSection: obj.videoSection,
                videoLength: obj.videoLength,
                links: obj?.links?.map((link: any) => ({
                    title: link.title,
                    url: link.url,
                })),
                suggestion: obj.suggestion,
            }));
            setCourseContentData(dummy);
        }
    }, [editCourseData]);

    const handleSubmit = () => {
        // Format benefits array
        const formattedBenefits = benefits.map((benefit) => ({
            title: benefit.title,
        }));
        // Format prerequisites array
        const formattedPrerequisites = prerequisites.map((prerequisite) => ({
            title: prerequisite.title,
        }));

        const formattedCourseContentData = courseContentData.map(
            (courseContent) => ({
                videoUrl: courseContent.videoUrl,
                title: courseContent.title,
                description: courseContent.description,
                videoLength: courseContent.videoLength,
                videoSection: courseContent.videoSection,
                links: courseContent.links.map((link) => ({
                    title: link.title,
                    url: link.url,
                })),
                suggestion: courseContent.suggestion,
            })
        );

        // prepare our data object
        const data = {
            name: courseInfo.name,
            description: courseInfo.description,
            categories: courseInfo.categories,
            price: courseInfo.price,
            estimatedPrice: courseInfo.estimatedPrice,
            tags: courseInfo.tags,
            thumbnail: courseInfo.thumbnail,
            level: courseInfo.level,
            demoUrl: courseInfo.demoUrl,
            totalVideos: courseContentData.length,
            benefits: formattedBenefits,
            prerequisites: formattedPrerequisites,
            courseData: formattedCourseContentData,
        };
        setCourseData(data);
    };

    const handleCourseCreate = async (e: any) => {
        const data = courseData;
        await editCourse({ id: editCourseData?._id, data });
    };
    return (
        <div className="w-full flex min-h-screen">
            <div className="w-[80%]">
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
                        handelCourseCreation={handleCourseCreate}
                        isEdit={true}
                    />
                )}
            </div>
            <div className="w-[20%] mt-[100px] h-screen fixed z-[-1] top-18 right-0">
                <CourseOptions active={active} setActive={setActive} />
            </div>
        </div>
    );
};

export default EditCourse;