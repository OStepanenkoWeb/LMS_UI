import {apiSlice} from "@/redux/features/api/apiSlice";
import {userRegistration} from "@/redux/features/auth/authSlice";


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
            query: ({activation_token, activation_code}) => ({
                url: 'activate-user',
                method: 'POST',
                body: {activation_token, activation_code},
                credentials: 'include' as const
            }),
        }),
    })
})

export const { useRegisterMutation, useActivationMutation } = authApi