"use client";
import Button from "@/components/button/Button";
import InputField from "@/components/input/InputField";
import { yupResolver } from "@hookform/resolvers/yup";
import Image from "next/image";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";

const validationSchema = yup.object({
    email: yup.string().email().required(),
    name: yup.string().required(),
    phoneNumber: yup.string().required(),
});

interface FormValues {
    email: string;
    name: string;
    phoneNumber: string;
}
export default function SettingsPage() {
    const { handleSubmit, control, formState: { errors } } = useForm<FormValues>(
        {
            resolver: yupResolver(validationSchema)
        }
    )
    const onSubmit = async (data: any) => {
    }
    return (
        <div>
            <div className="card shadow-xl rounded-xl p-5  flex flex-col bg-white dark:bg-white ">
                <div className="headline flex justify-between border-b-4 pb-3">
                    <h1 className="text-lg font-bold">Account</h1>
                    {/* <CloseIcon /> */}
                </div>
                <div className="profile grid grid-cols-12 mt-8">
                    <div className="avatar-upload rounded-full col-span-1">
                        {/* <Image
                            // src="https://assets.website-files.com/619e8d2e8bd4838a9340a810/647c106477f8934b266ba39c_profile-picture-og.webp"
                            width={96}
                            height={96}
                            alt="meaningful image"
                        /> */}
                    </div>
                    <div className="col-span-8 flex flex-col items-start justify-center">
                        <h1>Fortan Pireva</h1>
                        <p>CEO at @SleekAI</p>
                    </div>
                    <div className="button justify-center flex items-center rounded-lg col-span-3">
                        <Button variant="primary">Edit Profile</Button>
                    </div>
                </div>
                <div className="mt-8 border-b-4 pb-4">
                    <h1>General</h1>
                </div>
                <div className="bg-gray-500 p-4 flex flex-col gap-4">
                    <Controller
                        control={control}
                        name="email"
                        render={({ field: { onChange, value } }) => (
                            <InputField
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
                        name="phoneNumber"
                        render={({ field: { onChange, value } }) => (
                            <InputField
                                label="Phone Number"
                                type="text"
                                id="phoneNumber"
                                name="phoneNumber"
                                onChange={onChange}
                                value={value}
                                error={errors.phoneNumber?.message}
                            />
                        )}
                    />
                </div>
            </div>
            {/* <Access /> */}
        </div>
    );
}
