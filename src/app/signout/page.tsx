import { signOut, useSession } from "next-auth/react";
import React from "react";

export default function SignOutPage() {
    const { data: session } = useSession();
    if (!session) {
        return (
            <div>
                <p>You are not signed in.</p>
            </div>
        );
    }
    return (
        <div>
            <p>Welcome, {session.user?.email}</p>
            <button onClick={() => signOut()}>Sign out</button>
        </div>
    );
}
