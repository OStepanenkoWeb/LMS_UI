'use client'

import { Poppins } from "next/font/google";
import  { Josefin_Sans } from "next/font/google";
import { ThemeProvider} from "@/app/utils/ThemeProvider";
import './globals.css'
import {Toaster} from "react-hot-toast";
import {Providers} from "@/app/Provider";
import {SessionProvider} from "next-auth/react";
import React, {useEffect} from "react";
import {useLoadUserQuery} from "@/redux/features/api/apiSlice";
import Loader from "@/app/components/Loader/Loader";
import {useSelector} from "react-redux";
import {Montserrat} from "next/font/google";
import socketIO from "socket.io-client";
const ENDPOINT = process.env.NEXT_PUBLIC_DOMEN_URL || "";
const socketId = socketIO(ENDPOINT, { transports: ["websocket"] });


const poppins = Poppins({
  subsets: ["latin"],
  weight: ['400', '500', '600', '700'],
  variable: '--font-Poppins'
})

const josefin = Josefin_Sans({
  subsets: ["latin"],
  weight: ['400', '500', '600', '700'],
  variable: '--font-Josefin'
})

const montserrat = Montserrat({
    subsets: ["latin"],
    weight: ['400', '500', '600', '700'],
    variable: '--font-Montserrat'
})

const Custom: React.FC<{children: React.ReactNode}> = ({children}) => {
    const {user} = useSelector((state: any) => state.auth)
    const {isLoading} = useLoadUserQuery(undefined, {
        skip: !user.auth
    })
    useEffect(() => {
        socketId.on("connection", () => { });
    }, []);

    return (
        <div>
            {
                isLoading ? <Loader/> : <div>{children}</div>
            }
        </div>
    )
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <body className={`${poppins.variable} ${josefin.variable} ${montserrat.variable} !bg-white bg-no-repeat dark:bg-gradient-to-b dark:from-gray-900 dark:to-black duration-300`}>
        <Providers>
            <SessionProvider>
                <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
                    <Custom>
                        {children}
                    </Custom>
                    <Toaster position='top-center' reverseOrder={false}/>
                </ThemeProvider>
            </SessionProvider>
        </Providers>
      </body>
    </html>
  )
}
