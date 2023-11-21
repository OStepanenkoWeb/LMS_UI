import {apiSlice} from "@/redux/features/api/apiSlice";


export const coursesApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createCourse: builder.mutation({
            query:({data}) => ({
                url:'create-course',
                method:'POST',
                body: data,
                credentials: 'include' as const
            })
        }),
        getFullCourses: builder.query({
            query: () => ({
                url:'get-full-courses',
                method:'GET',
                credentials: 'include' as const
            })
        }),
        deleteCourse: builder.mutation({
            query: (id) => ({
                url: `delete-course/${id}`,
                method: "DELETE",
                credentials: "include" as const,
            }),
        }),
        editCourse: builder.mutation({
            query: ({ id, data }) => ({
                url: `edit-course/${id}`,
                method: "PUT",
                body: data,
                credentials: "include" as const,
            }),
        }),
        getUsersAllCourses: builder.query({
            query: () => ({
                url: "get-courses",
                method: "GET",
                credentials: "include" as const,
            }),
        }),
    })
})

export const {
    useCreateCourseMutation,
    useGetFullCoursesQuery,
    useDeleteCourseMutation,
    useEditCourseMutation,
    useGetUsersAllCoursesQuery,
} = coursesApi