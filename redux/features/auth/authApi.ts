import {apiSlice} from "@/redux/features/api/apiSlice";
import {userLoggedIn, userMe, userRegistration} from "@/redux/features/auth/authSlice";


type TRegistrationResponse = {
    message: string
    activationToken: string
}

type TRegistrationData = {
}

export const authApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        register: builder.mutation<TRegistrationResponse, TRegistrationData>({
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
        activation: builder.mutation<TRegistrationResponse, TRegistrationData>({
            query: ({activationToken, activationCode}) => {
                return {
                url: 'activate-user',
                method: 'POST',
                body: {activationToken, activationCode},
                credentials: 'include' as const
            }},
        }),
        login: builder.mutation<TRegistrationResponse, TRegistrationData>({
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
                    console.log('Query "me" with error', error)
                }
            }
        }),
    })
})

export const { useRegisterMutation, useActivationMutation, useLoginMutation } = authApi