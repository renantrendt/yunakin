"use client";
import React from "react";
import Button from "@/components/button/Button";
import InputField from "@/components/input/InputField";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import Pricing from "@/components/pricing/pricing";
import AccountSsttings from "@/components/dashboard/settings/account/Account";

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

const tabs = [
    {
        name: "Profile",
        component: <div>Profile</div>
    },
    {
        name: "Account",
        component: <div><AccountSsttings /> </div>
    },
    {
        name: "Subscription",
        component: <div><Pricing showDescription={false} /></div>
    }
]
export default function SettingsPage() {
    const { control, formState: { errors } } = useForm<FormValues>(
        {
            resolver: yupResolver(validationSchema)
        }
    )
    const [tab, setTab] = React.useState(tabs[1]);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const onSubmit = async (data: any) => {
    }
    return (
        <div>
            <div className="flex justify-start w-full">
                <div role="tablist" className="tabs tabs-boxed">
                    {tabs.map((t, index) => {
                        return <div className={`tab ${t.name == tab.name ? "tab-active" : ""}`} key={index} role="tab" aria-selected={t.name === tab.name} onClick={() => setTab(t)}>{t.name}</div>
                    })}
                </div>
            </div>
            <div className="pricing min-h-screen" >
                {tab.component}
            </div>

            {/* <Access /> */}
        </div>
    );
}
