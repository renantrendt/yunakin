'use client'
import { signIn, useSession } from "next-auth/react";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from 'yup';
import InputField from "@/components/input/InputField";
import { Input } from "postcss";
import Button from "@/components/button/Button";
const schema = yup.object({
    email: yup.string().email().required(),
    password: yup.string().min(6).required(),
})

type FormValues = {
    email: string;
    password: string;
}
export default function SignInPage() {
    const { data: session } = useSession();
    const { register, handleSubmit, control, formState: { errors } } = useForm<FormValues>(
        {
            resolver: yupResolver(schema),
        }
    );

    if (session) {
        return (
            <div>
                <p>You are already signed in.</p>
            </div>
        );
    }

    const onSubmit = (data: any) => {
        // Handle sign up logic here
        alert(data);
        console.log(data);
    };
    return (
        <div className="flex justify-center w-full h-screen items-center ">
            <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg  w-1/3 shadow-md p-8  m-auto flex flex-col gap-8">
                <h1 className="text-3xl font-bold text-center">Login</h1>
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
                <div className="flex justify-center">
                    <Button variant="primary" type="submit" classname="w-full">Sign In</Button>
                </div>
            </form>
        </div>

    );
}