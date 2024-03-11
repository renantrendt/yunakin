import Button from '@/components/atomic/button/Button'
import InputField from '@/components/atomic/input/InputField'
import { yupResolver } from '@hookform/resolvers/yup'
import { useSession } from 'next-auth/react'
import React from 'react'
import { Controller, useForm, useWatch } from 'react-hook-form'
import * as yup from 'yup'
import EmailIcon from '@/icons/EmailIcon'
import ImageUploader from '@/components/atomic/file-uploader/ImageUploader'
import Typography from '@/components/atomic/typography/Typography'
import { useMutation } from '@tanstack/react-query'
import { updateUser } from '@/app/actions/users'
import customToast from '@/components/atomic/toast/customToast'
import { getDownloadUrl, uploadFile } from '@/lib/storage/storage'
import platformConfig from '@/config/app-config'

interface FormValues {
    email: string
    name: string
    avatar: string
}
const schema = yup.object({
    email: yup.string().email().required(),
    name: yup.string().required(),
    avatar: yup.string().required(),
})
const EditProfile = () => {
    const { data: session, update } = useSession()
    const editProfileMutation = useMutation({
        mutationFn: async (data: any) => {

            if (!session?.user) return

            if (data.avatar !== session?.user.avatar) {
                let blob = await fetch(data.avatar).then(r => r.blob());

                const path = "avatars/" + session?.user.id + "/" + "avatar.jpg"

                const file = new File([blob], "avatar.jpg", { type: "image/jpeg" });

                console.log(file)
                const isUploaded = await uploadFile(platformConfig.variables.SUPABASE_BUCKET_NAME as string, path, file, { cacheControl: '3600', upsert: true })
                if (!isUploaded) {
                    throw new Error("Failed to upload image")
                }
                const downloadUrl = await getDownloadUrl(platformConfig.variables.SUPABASE_BUCKET_NAME as string, path)
                if (!downloadUrl) {
                    throw new Error("Failed to get download url")
                }
                data.avatar = downloadUrl.publicUrl


            }

            console.log(data.avatar)
            const updatedUser = await updateUser(session?.user.id as string, data)

            update(
                {
                    ...session,
                    user: updatedUser
                }
            )
        },
        onSuccess: () => {
            customToast.success("Profile updated successfully")
        },
        onError: (error) => {
            customToast.warn(error.message)
        }
    })
    const { handleSubmit, control, formState: { errors }, setValue } = useForm<FormValues>(
        {
            resolver: yupResolver(schema),
            defaultValues: {
                email: (session?.user as any).email,
                name: (session?.user as any).name,
                avatar: (session?.user as any).avatar,
            }
        }
    )
    const avatar = useWatch({
        control,
        name: 'avatar',
        defaultValue: (session?.user as any).avatar
    })


    const onSubmit = async (data: any) => {
        await editProfileMutation.mutateAsync(data)
    }


    return (
        <form onSubmit={handleSubmit(onSubmit)} className=" flex flex-col   bg-white   p-6 rounded-2xl border-[1px] border-grey-200   gap-6">
            <h1 className="text-2xl font-bold text-left text-black dark:text-white">Edit Profile</h1>

            <div className='flex flex-col gap-8'>
                <div className='flex items-center justify-center gap-6'>
                    <ImageUploader onImageUpload={(image) => setValue('avatar', image)} image={avatar} />
                    <Typography type='p' className='text-grey-600 !text-xs !leading-[18px]' >Recommended size: 300px X 300px Supported format: jpg, jpeg, png Max size: 2mb</Typography>
                </div>
                <div className='flex flex-col gap-6'>
                    <Controller
                        control={control}
                        name="name"
                        render={({ field: { onChange, value } }) => (
                            <InputField
                                label="Name"
                                type="text"
                                id="name"
                                name="name"
                                onChange={onChange}
                                value={value}
                                error={errors.name?.message}
                            />
                        )}
                    />
                    <Controller
                        control={control}
                        name="email"
                        render={({ field: { onChange, value } }) => (
                            <InputField
                                leadingIcon={
                                    <EmailIcon />}
                                label="Email"
                                type="email"
                                id="email"
                                name="email"
                                onChange={onChange}
                                value={value}
                                error={errors.email?.message}
                            />
                        )}
                    />
                    <Button loading={editProfileMutation.isPending} type='submit' variant='primary' classname='w-full' label='Save Changes' />
                </div>
            </div>
        </form>
    )
}

export default EditProfile