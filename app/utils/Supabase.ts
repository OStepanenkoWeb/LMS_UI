import { createClient } from '@supabase/supabase-js'

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL || '', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '')

const getPublicUrl = async (url: string) => {
    const {data} = await supabase
        .storage
        .from('avatars')
        .getPublicUrl(url)

    return data
}

export const uploadAvatar = async (avatarFile: any) => {
    const {data, error} = await supabase
        .storage
        .from('avatars')
        .upload(`folder/${avatarFile.name}`, avatarFile, {
            cacheControl: '3600',
            upsert: false
        })

    if(!error) {
        const {publicUrl} = await getPublicUrl(data.path)

        return publicUrl
    }

    return ''
}


