"use client";
import { SessionProvider } from "next-auth/react";
import React from "react";
import Auth from "@/lib/auth/auth";
import ToastProvider from "@/lib/providers/toast.provider";
const Providers = ({ children }: { children: React.ReactNode }) => {
    return (
        <SessionProvider>
            <ToastProvider>{children}</ToastProvider>
        </SessionProvider>
    );
};

export default Providers;
