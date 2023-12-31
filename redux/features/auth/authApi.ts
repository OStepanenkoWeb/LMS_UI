import {apiSlice} from "@/redux/features/api/apiSlice";
import {userLoggedIn, userLoggedOut, userMe, userRegistration} from "@/redux/features/auth/authSlice";


type TRegistrationResponse = {
    message: string
    activationToken: string
    user?: string
}

export const authApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        register: builder.mutation<TRegistrationResponse, any>({
            query: (data) => ({
                url: 'registration',
                method: 'POST',
                body: data,
                credentials: 'include' as const
            }),
            async onQueryStarted(arg, {queryFulfilled, dispatch}) {
                try {
                    const result = await queryFulfilled
                    dispatch(userRegistration({
                        token: result.data.activationToken
                    }))

                } catch (error: any) {
                    console.log('Query "registration" with error', error)
                }
            }
        }),
        activation: builder.mutation<TRegistrationResponse, any>({
            query: ({activationToken, activationCode}) => {
                return {
                url: 'activate-user',
                method: 'POST',
                body: {activationToken, activationCode},
                credentials: 'include' as const
            }},
        }),
        login: builder.mutation<TRegistrationResponse, any>({
            query: ({email, password}) => {
                return {
                    url: 'login',
                    method: 'POST',
                    body: {email, password},
                    credentials: 'include' as const
                }},
            async onQueryStarted(arg, {queryFulfilled, dispatch}) {
                try {
                    const result = await queryFulfilled
                    dispatch(userMe({
                        user: result.data.user
                    }))

                } catch (error: any) {
                    console.log('Query "login" with error', error)
                }
            }
        }),
        logOut: builder.query<TRegistrationResponse, any>({
            query: () => {
                return {
                    url: 'logout',
                    method: 'GET',
                    credentials: 'include' as const
                }},
            async onQueryStarted(arg, {queryFulfilled, dispatch}) {
                try {
                    dispatch(
                        userLoggedOut()
                    )
                } catch (error:any) {
                    console.log('Query "logout" with error', error);
                }
            }
        }),
        socialAuth: builder.mutation<TRegistrationResponse, any>({
            query: ({email, name, avatar}) => {
                return {
                    url: 'social-auth',
                    method: 'POST',
                    body: {email, name, avatar},
                    credentials: 'include' as const
                }},
            async onQueryStarted(arg, {queryFulfilled, dispatch}) {
                try {
                    const result = await queryFulfilled
                    dispatch(userMe({
                        user: result.data.user
                    }))

                } catch (error: any) {
                    console.log('Query "social-auth" with error', error)
                }
            }
        }),
    })
})
export const { useRegisterMutation, useActivationMutation, useLoginMutation, useSocialAuthMutation, useLogOutQuery } = authApi
