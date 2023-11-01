'use client'

import {configureStore, getDefaultMiddleware} from "@reduxjs/toolkit";
import {apiSlice} from "@/redux/features/api/apiSlice";

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
    },
    devTools: false,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware)
})