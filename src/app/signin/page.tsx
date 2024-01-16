'use client'
import { signIn, useSession } from "next-auth/react";
import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from 'yup';
import InputField from "@/components/input/InputField";
import { Input } from "postcss";
import Button from "@/components/button/Button";
const schema = yup.object({
    email: yup.string().email().required(),
    password: yup.string().min(6).required(),
})
export default function SignInPage() {
    const { data: session } = useSession();
    const { register, handleSubmit, formState: { errors } } = useForm(
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
        <div className="flex justify-center w-full h-full">

            <form onSubmit={handleSubmit(onSubmit)} className="max-w-md">
                <InputField
                    label="Email"
                    type="email"
                    {...register("email", { required: "Email is required", pattern: /^\S+@\S+$/i })}
                    error={errors.email?.message}
                />
                <InputField
                    label="Password"
                    type="password"
                    {...register("password", { required: "Password is required", minLength: 6 })}
                    error={errors.password?.message}
                />

                <Button variant="primary" type="submit">Sign In</Button>

            </form>
        </div>

    );
}