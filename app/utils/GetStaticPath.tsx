export const GetStaticUrl = (avatar: string) => {
    const isUrl = avatar && avatar.includes('http')

    const avatarUrl = `${process.env.NEXT_PUBLIC_DOMEN_URL}images/${avatar}`

    return isUrl ? avatar : avatarUrl

}