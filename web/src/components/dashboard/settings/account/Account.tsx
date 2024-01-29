import { yupResolver } from '@hookform/resolvers/yup'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup'
import InputField from '@/components/input/InputField'
import customToast from '@/components/toast/customToast'
import { useSession } from 'next-auth/react'
import Button from '@/components/button/Button'
import TextArea from '@/components/textarea/TextArea'
import EmailIcon from '@/assets/icons/EmailIcon'
import AccountIcon from '@/assets/icons/AccountIcon'
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
    const onSubmit = async (data: any) => {
        // Handle sign up logic here
        // setIsLoading(true)
        // try {
        //     const result = await signIn('credentials', {
        //         email: data.email,
        //         password: data.password,
        //         redirect: false
        //     })
        //     if (result?.error) {
        //         customToast.error(result.error)
        //     } else {

        //     }
        // } catch (error) {
        //     console.error(error)

        // } finally {
        //     setIsLoading(false)
        // }
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
                    <Button type='submit' variant='secondary' classname='w-24' >Cancel</Button>
                    <Button type='submit' variant='primary' classname='w-24'>Save</Button>
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
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M1.99967 9.33337C2.36786 9.33337 2.66634 9.63185 2.66634 10V12.6667C2.66634 12.8435 2.73658 13.0131 2.8616 13.1381C2.98663 13.2631 3.1562 13.3334 3.33301 13.3334H12.6663C12.8431 13.3334 13.0127 13.2631 13.1377 13.1381C13.2628 13.0131 13.333 12.8435 13.333 12.6667V10C13.333 9.63185 13.6315 9.33337 13.9997 9.33337C14.3679 9.33337 14.6663 9.63185 14.6663 10V12.6667C14.6663 13.1971 14.4556 13.7058 14.0806 14.0809C13.7055 14.456 13.1968 14.6667 12.6663 14.6667H3.33301C2.80257 14.6667 2.29387 14.456 1.91879 14.0809C1.54372 13.7058 1.33301 13.1971 1.33301 12.6667V10C1.33301 9.63185 1.63148 9.33337 1.99967 9.33337Z" fill="#3C50E0"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M7.5286 1.52864C7.78894 1.26829 8.21106 1.26829 8.4714 1.52864L11.8047 4.86197C12.0651 5.12232 12.0651 5.54443 11.8047 5.80478C11.5444 6.06513 11.1223 6.06513 10.8619 5.80478L8 2.94285L5.13807 5.80478C4.87772 6.06513 4.45561 6.06513 4.19526 5.80478C3.93491 5.54443 3.93491 5.12232 4.19526 4.86197L7.5286 1.52864Z" fill="#3C50E0"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M7.99967 1.33337C8.36786 1.33337 8.66634 1.63185 8.66634 2.00004V10C8.66634 10.3682 8.36786 10.6667 7.99967 10.6667C7.63148 10.6667 7.33301 10.3682 7.33301 10V2.00004C7.33301 1.63185 7.63148 1.33337 7.99967 1.33337Z" fill="#3C50E0"></path></svg></span>
                            <p><span className="text-primary">Click to upload</span> or drag and drop</p><p className="mt-1.5">SVG, PNG, JPG or GIF</p><p>(max, 800 X 800px)</p></div></div>
                </div>
                <div className='flex justify-end gap-8'>
                    <Button type='submit' variant='secondary' classname='w-24' >Cancel</Button>
                    <Button type='submit' variant='primary' classname='w-24'>Save</Button>
                </div>
            </div>
        </div >
    )
}

export default AccountSsttings