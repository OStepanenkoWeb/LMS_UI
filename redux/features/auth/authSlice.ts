import {CaseReducer, createSlice, PayloadAction} from "@reduxjs/toolkit";

type TState = {
    token: string
    user: string
}


const initialState:TState = {
    token: '',
    user: ''
}

const userRegistrationReducer: CaseReducer<TState, PayloadAction<string>> = (state, action) => {
    state.token = action.payload.token
}

const userLoggedInReducer: CaseReducer<TState, PayloadAction<string>> = (state, action) => {
    state.token = action.payload.accessToken
    state.user = action.payload.user
}

const userMeReducer: CaseReducer<TState, PayloadAction<string>> = (state, action) => {
    state.user = action.payload.user
}

const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers: {
        userRegistration: userRegistrationReducer,
        userLoggedIn: userLoggedInReducer,
        userMe: userMeReducer,
        userLoggedOut: (state) => {
            state.token = ''
            state.token = ''
        },
    }
})

export const {userRegistration, userLoggedIn, userLoggedOut, userMe} = authSlice.actions

export default authSlice.reducer