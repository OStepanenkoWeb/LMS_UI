import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {userLoggedIn} from "@/redux/features/auth/authSlice";

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_BASE_URL
    }),
    credentials: "include",
    endpoints: (builder) => ({
        refreshToken: builder.query({
            query: () => ({
                url:'refresh-token',
                method: 'GET',
                credentials: 'include' as const
            })
        }),
        loadUser: builder.query({
            query: () => ({
                url:'me',
                method: 'GET',
                credentials: 'include' as const
            }),
            async onQueryStarted(arg, {queryFulfilled, dispatch}) {
                try {
                    const result = await queryFulfilled
                    dispatch(userLoggedIn({
                        accessToken: result.data.accessToken as string,
                        user: result.data.user as string
                    }))

                } catch (error: any) {
                    console.log('Query "loadUser" with error', error)
                }
            }
        }),
    })
})

export const {useRefreshTokenQuery, useLoadUserQuery} = apiSlice
