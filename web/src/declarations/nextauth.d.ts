declare module "next-auth" {
    interface User {
        id: number;
        name: string;
        email: string;
        image: string;
        emailVerified: boolean;
        createdAt: Date;
        updatedAt: Date;
    }
    interface Session {
        user?: User;
        token?: JWT;
    }
}