"use client";
import { SessionProvider } from "next-auth/react";
import React from "react";
import Auth from "@/lib/auth/auth";
import ToastProvider from "@/lib/providers/toast.provider";
const Providers = ({ children }: { children: React.ReactNode }) => {
    return (
        <SessionProvider>
            <Auth>
                <ToastProvider>{children}</ToastProvider>
            </Auth>
        </SessionProvider>
    );
};

export default Providers;
