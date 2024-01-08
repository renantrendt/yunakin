import { signIn, useSession } from "next-auth/react";
import React from "react";
import { useForm } from "react-hook-form";

export default function SignInPage() {
    const { data: session } = useSession();
    const { register, handleSubmit, formState: { errors } } = useForm();

    if (session) {
        return (
            <div>
                <p>You are already signed in.</p>
            </div>
        );
    }


    const onSubmit = data => {
        // Handle sign up logic here
        console.log(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label>Email</label>
                <input
                    type="email"
                    {...register("email", { required: "Email is required", pattern: /^\S+@\S+$/i })}
                />
                {errors.email && <p>{errors.email.message}</p>}

            </div>

            <div>
                <label>Password</label>
                <input
                    type="password"
                    {...register("password", { required: "Password is required", minLength: 6 })}
                />
                {errors.password && <p>{errors.password.message}</p>}
            </div>

            <input type="submit" />
        </form>
    );
}