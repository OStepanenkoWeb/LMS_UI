import useUserAuth from "@/app/hooks/useUserAuth";
import {redirect} from "next/navigation";
import React from "react";

interface IProtected {
    children: React.ReactNode
}

export default function Protected({children}:IProtected) {
    const isAuthenticated = useUserAuth()

    return isAuthenticated ? children : redirect('/')
}