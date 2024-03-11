import { yupResolver } from '@hookform/resolvers/yup'
import React from 'react'
import { Controller, useForm, useWatch } from 'react-hook-form'
import * as yup from 'yup'
import InputField from '@/components/atomic/input/InputField'
import { useSession } from 'next-auth/react'
import Button from '@/components/atomic/button/Button'
import EmailIcon from '@/icons/EmailIcon'
import AccountIcon from '@/icons/AccountIcon'
import FileUploader from '@/components/atomic/file-uploader/FileUploader'
import EditProfile from '@/containers/edit-profile/EditProfile'
import EditPassword from '@/containers/edit-profile/EditPassword'
interface FormValues {
    email: string
    password: string
    name: string
    bio: string
    phoneNumber: string
    avatar: string
}
const schema = yup.object({
    email: yup.string().email().required(),
    password: yup.string().min(6).required(),
    name: yup.string().required(),
    bio: yup.string().required(),
    phoneNumber: yup.string().required(),
    avatar: yup.string().required(),
})
const AccountSettings = () => {
    const { data: session } = useSession()

    const { handleSubmit, control, formState: { errors }, setValue } = useForm<FormValues>(
        {
            resolver: yupResolver(schema)
        }
    )

    const avatar = useWatch({
        control,
        name: 'avatar',
        defaultValue: (session?.user as any).avatar
    })


    return (
        <div className='container mx-auto pt-24 px-24 grid grid-cols-12 gap-x-8 justify-items-start align-top'>
            <div className=' col-span-6 w-full'>
                <EditProfile />
            </div>
            <div className='col-span-6 w-full'>
                <EditPassword />
            </div>
        </div >
    )
}

export default AccountSettings