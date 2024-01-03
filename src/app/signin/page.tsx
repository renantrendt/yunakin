import { signIn, useSession } from "next-auth/react";
import React from "react";

export default function SignInPage() {
    const { data: session } = useSession();
    if (session) {
        return (
            <div>
                <p>You are already signed in.</p>
            </div>
        );
    }
    return (
        <div>
            <button onClick={() => signIn('google')}>Sign in with Google</button>
            <button onClick={() => signIn('credentials')}>
                Sign in with Credentials
            </button>
        </div>
    );
}
