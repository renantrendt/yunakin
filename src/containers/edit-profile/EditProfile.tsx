import Button from '@/components/atomic/button/Button'
import InputField from '@/components/atomic/input/InputField'
import { yupResolver } from '@hookform/resolvers/yup'
import { signOut, useSession } from 'next-auth/react'
import React from 'react'
import { Controller, useForm, useWatch } from 'react-hook-form'
import * as yup from 'yup'
import EnvelopeIcon from "@/icons/envelope-icon.svg"
import ImageUploader from '@/components/atomic/file-uploader/ImageUploader'
import Typography from '@/components/atomic/typography/Typography'
import { useMutation } from '@tanstack/react-query'
import { updateUser } from '@/app/actions/users'
import customToast from '@/components/atomic/toast/customToast'
import { getDownloadUrl, uploadFile } from '@/lib/storage/storage'
import platformConfig from '@/config/app-config'
import ConfirmationModal from '@/components/molecules/confirmation-modal/ConfirmationModal'
import WarningIcon from '@/icons/toast/warning-icon.svg'

const schema = yup.object({
    email: yup.string().email().required(),
    avatar: yup.string().nullable()
})

interface FormValues extends yup.Asserts<typeof schema> { }

const EditProfile = () => {
    const { data: session, update } = useSession()
    const [showConfimation, setShowConfimation] = React.useState(false)
    const [tempData, setTempData] = React.useState<any>()
    console.log(session)
    const editProfileMutation = useMutation({
        mutationFn: async (data: any) => {

            if (!session?.user) return

            if (data.avatar !== session?.user.avatar) {
                const blob = await fetch(data.avatar).then(r => r.blob());

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
                console.log(data.avatar)
            }
            await updateUser(session?.user.id as string, data)

            if (data.email !== session?.user.email) {
                signOut()
                return;
            }
            update()
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
        if (data.email !== session?.user?.email) {
            setTempData(data)
            setShowConfimation(true)
            return
        }
        await editProfileMutation.mutateAsync(data)
    }


    return (
        <form onSubmit={handleSubmit(onSubmit)} className=" flex flex-col   bg-white  dark:bg-card-dark dark:border-profile-modal-border-dark  p-6 rounded-2xl border border-grey-200   gap-6">

            <Typography type='p' className='text-sm text-grey-600  dark:text-profile-modal-text-dark   leading-5 ' >Edit Profile</Typography>

            <div className='flex flex-col gap-8'>
                <div className='flex items-center justify-center gap-6'>
                    <div className='w-fit h-fit'>
                        <ImageUploader onImageUpload={(image) => setValue('avatar', image)} image={avatar ?? ""} />
                    </div>
                    <Typography type='p' className='text-grey-600 !text-xs !leading-[18px]' >Recommended size: 300px X 300px <br /> Supported format: jpg, jpeg, png <br /> Max size: 2mb</Typography>
                    {errors.avatar && <Typography type='p' className='text-red-500 !text-xs !leading-[18px]' >{errors.avatar.message}</Typography>}
                </div>
                <div className='flex flex-col gap-6'>

                    <Controller
                        control={control}
                        name="email"
                        render={({ field: { onChange, value } }) => (
                            <InputField
                                trailingIcon={
                                    <span className='text-grey-400'><EnvelopeIcon /> </span>}
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
                    <Button loading={editProfileMutation.isPending} type='submit' variant='primary' className='w-full' label='Save Changes' />
                </div>
            </div>
            {showConfimation && <ConfirmationModal
                icon={
                    <div className=' w-fit 
            rounded-[32px]  '>
                        <WarningIcon />
                    </div>
                }
                isOpen={showConfimation} onClose={() => setShowConfimation(false)} title={
                    'Are you sure you want to change the email adress'
                } description={
                    'You will be logged out and need to enter your new email to login.'}>
                <>
                    <Button variant='secondary' label='Cancel' onClick={() => setShowConfimation(false)} />
                    <Button variant='primary' label={'Change Email'} onClick={async () => {
                        setShowConfimation(false)
                        await editProfileMutation.mutateAsync({ email: tempData.email, avatar: tempData.avatar })
                    }}
                    />
                </>
            </ConfirmationModal>}
        </form >
    )
}

export default EditProfile