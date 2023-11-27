export const GetStaticUrl = (avatar: string) => {
    const isUrl = avatar && String(avatar).includes('http')

    const avatarUrl = `${process.env.NEXT_PUBLIC_DOMEN_URL}images/${avatar}` as  string
console.log(isUrl ? avatar : avatarUrl)
    return isUrl ? avatar : avatarUrl

}