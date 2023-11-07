import {StaticImageData} from "next/image";

export const GetStaticUrl = (avatar: string | StaticImageData) => {
    const isUrl = avatar && String(avatar).includes('http')

    const avatarUrl = `${process.env.NEXT_PUBLIC_DOMEN_URL}images/${avatar}` as  string | StaticImageData

    return isUrl ? avatar : avatarUrl

}