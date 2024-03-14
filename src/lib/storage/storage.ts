
import platformConfig from '@/config/app-config';
import { createClient } from '@supabase/supabase-js'


if (!platformConfig.variables.SUPABASE_URL) {
    throw new Error('SUPABASE_URL is not defined')
}
if (!platformConfig.variables.SUPABASE_ANON_KEY) {
    throw new Error('SUPABASE_ANON_KEY is not defined')
}


// Create a single supabase client for interacting with your database
const supabase = createClient(platformConfig.variables.SUPABASE_URL, platformConfig.variables.SUPABASE_ANON_KEY)


const getClient = () => {
    return supabase
}

const checkBucketExists = async (bucketName: string) => {

    const { data, error } = await supabase.storage.from(bucketName).list()
    if (error) {
        console.error(error)
        return false
    }
    return data
}

const createBucket = async (bucketName: string) => {
    const { data, error } = await supabase.storage.createBucket(bucketName)
    if (error) {
        console.error(error)
        return false
    }
    return data
}

const deleteBucket = async (bucketName: string) => {
    const { data, error } = await supabase.storage.deleteBucket(bucketName)
    if (error) {
        console.error(error)
        return false
    }
    return data
}
const uploadFile = async (bucketName: string, path: string, file: File, options: any) => {
    const { data, error } = await supabase.storage.from(bucketName).upload(path, file, options)
    if (error) {
        console.error(error)
        return false
    }
    return data
}

const getDownloadUrl = async (bucketName: string, path: string) => {
    const { data } = await supabase.storage.from(bucketName).getPublicUrl(path)
    return data
}


export { checkBucketExists, createBucket, deleteBucket, uploadFile, getDownloadUrl }



export default getClient;