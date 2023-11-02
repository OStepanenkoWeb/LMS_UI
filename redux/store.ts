'use client'

import {configureStore, getDefaultMiddleware} from "@reduxjs/toolkit";
import {apiSlice} from "@/redux/features/api/apiSlice";
import authSlice from "@/redux/features/auth/authSlice";

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authSlice
    },
    devTools: false,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware)
})