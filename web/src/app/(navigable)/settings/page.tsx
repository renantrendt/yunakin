"use client";
import React from "react";
import Button from "@/components/button/Button";
import InputField from "@/components/input/InputField";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import Pricing from "@/components/pricing/pricing";

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
    const { control, formState: { errors } } = useForm<FormValues>(
        {
            resolver: yupResolver(validationSchema)
        }
    )
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const onSubmit = async (data: any) => {
    }
    return (
        <div>
            <div className="flex justify-start w-full">
                <div role="tablist" className="tabs tabs-boxed">
                    <a role="tab" className="tab">Profile</a>
                    <a role="tab" className="tab tab-active">Account</a>
                    <a role="tab" className="tab">Subscription</a>
                </div>
            </div>
            <div className="pricing">
                <Pricing />
            </div>

            {/* <Access /> */}
        </div>
    );
}
