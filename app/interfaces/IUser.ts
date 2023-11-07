import {StaticImageData} from "next/image";

export interface IUser {
    name?: string
    email?: string
    avatar?: string | StaticImageData
    role: string
}