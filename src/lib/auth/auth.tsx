"use client";
import LoadingIcon from "@/assets/icons/LoadingIcon";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";

interface AuthProps {
    children: React.ReactNode;
}
const Auth = ({ children }: AuthProps) => {
    const { status, data: session } = useSession();
    const router = useRouter();
    if (status == "loading") {
        return (
            <div className="flex justify-center items-center">
                <LoadingIcon />{" "}
            </div>
        );
    }
    if (status == "unauthenticated") {
        router.push("/auth/login");
    }

    return <div>{children}</div>;
};

export default Auth;
