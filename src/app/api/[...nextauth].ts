import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        CredentialsProvider({
            // Configure local credentials provider
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text", placeholder: "jsmith" },
                password: { label: "Password", type: "password" }
            },
            authorize: async (credentials) => {
                // Add logic to authenticate the user with your own system
                const user = { id: 1, name: "John Smith", email: "john@example.com" };
                // Return null if user data could not be retrieved
                return user;
            },
        }),
    ],
    // Additional NextAuth configuration...
});
