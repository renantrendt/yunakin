import { yupResolver } from '@hookform/resolvers/yup'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup'
import InputField from '@/components/atomic/input/InputField'
import { useSession } from 'next-auth/react'
import Button from '@/components/atomic/button/Button'
import TextArea from '@/components/atomic/textarea/TextArea'
import EmailIcon from '@/assets/icons/EmailIcon'
import AccountIcon from '@/assets/icons/AccountIcon'
import FileUploadIcon from '@/assets/icons/FileUploadIcon'
interface FormValues {
    email: string
    password: string
    name: string
    bio: string
    phoneNumber: string
    avatar: string
    username: string
}
const schema = yup.object({
    email: yup.string().email().required(),
    password: yup.string().min(6).required(),
    name: yup.string().required(),
    bio: yup.string().required(),
    phoneNumber: yup.string().required(),
    avatar: yup.string().required(),
    username: yup.string().required(),
})
const AccountSsttings = () => {
    const { data: session } = useSession()

    const { handleSubmit, control, formState: { errors } } = useForm<FormValues>(
        {
            resolver: yupResolver(schema)
        }
    )
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const onSubmit = async (data: any) => {

    }
    return (
        <div className='container mx-auto pt-24 px-24 grid grid-cols-12 gap-x-8'>
            <form onSubmit={handleSubmit(onSubmit)} className="  col-span-7 w-full dark:bg-gray-700 p-8 rounded-xl    shadow-lg  m-auto flex flex-col gap-8">
                <h1 className="text-2xl font-bold text-left text-black dark:text-white">Personal information</h1>
                <div className='flex flex-row justify-between'>
                    <Controller
                        control={control}
                        name="name"
                        render={({ field: { onChange, value } }) => (
                            <InputField
                                leadingIcon={<AccountIcon />}
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
                        name="password"
                        render={({ field: { onChange, value } }) => (
                            <InputField
                                label="Password"
                                type="password"
                                id="password"
                                name="password"
                                onChange={onChange}
                                value={value}
                                error={errors.password?.message}
                            />
                        )}
                    />
                </div>
                <div>
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
                </div>
                <div>
                    <Controller
                        control={control}
                        name="username"
                        render={({ field: { onChange, value } }) => (
                            <InputField
                                label="Username"
                                type="text"
                                id="username"
                                name="username"
                                onChange={onChange}
                                value={value}
                                error={errors.username?.message}
                            />
                        )}
                    />
                </div>
                <div>
                    <Controller
                        control={control}
                        name="bio"
                        render={({ field: { onChange, value } }) => (
                            <TextArea
                                label="Bio"
                                id="bio"
                                name="bio"
                                onChange={onChange}
                                value={value}
                                error={errors.bio?.message}
                            />
                        )}
                    />
                </div>
                <div className='flex justify-end gap-8'>
                    <Button type='submit' variant='secondary' classname='w-24' label='Cancel' />
                    <Button type='submit' variant='primary' classname='w-24' label='Save' />
                </div>
            </form>
            <div className="  col-span-5 w-full dark:bg-gray-700 p-8 rounded-xl    shadow-lg  m-auto flex flex-col gap-8">
                <h1 className="text-2xl font-bold text-left text-black dark:text-white">Your Photo</h1>
                <div className='flex justify-start  gap-4 items-center'>
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="w-24 rounded-full">
                            <img alt="Tailwind CSS Navbar component" src={`${(session?.user as any).avatar || "https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"}`} />
                        </div>

                    </div>
                    <div>
                        <span className="mb-1.5 text-black dark:text-white">
                            Edit your photo
                        </span>
                        <span className="flex gap-2.5">
                            <button className="text-sm hover:text-primary">Delete</button>
                            <button className="text-sm hover:text-primary">Update</button>
                        </span>
                    </div>
                </div>

                <div>
                    <div id="FileUpload" className="relative mb-5.5 block w-full cursor-pointer appearance-none rounded border-2 border-dashed border-primary bg-gray py-4 px-4 dark:bg-meta-4 sm:py-7.5">
                        <input type="file" accept="image/*" className="absolute inset-0 z-50 m-0 h-full w-full cursor-pointer p-0 opacity-0 outline-none" />
                        <div className="flex flex-col items-center justify-center space-y-3">
                            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-stroke bg-white dark:border-strokedark dark:bg-boxdark">
                                <FileUploadIcon />
                            </span>
                            <p><span className="text-primary">Click to upload</span> or drag and drop</p><p className="mt-1.5">SVG, PNG, JPG or GIF</p><p>(max, 800 X 800px)</p></div></div>
                </div>
                <div className='flex justify-end gap-8'>
                    <Button type='submit' variant='secondary' classname='w-24' label='Cancel' />
                    <Button type='submit' variant='primary' classname='w-24' label='Save' />
                </div>
            </div>
        </div >
    )
}

export default AccountSsttings