"use client";
import React from "react";
import CourseDetailsPage from "@/app/components/Course/CourseDetailPage";

const Page = ({ params }: any) => {
    return (
        <div>
            <CourseDetailsPage id={params.id} />
        </div>
    );
};

export default Page;