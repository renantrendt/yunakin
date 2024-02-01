import { prisma } from '@/lib/prisma'
import { type User } from '@prisma/client'
import { compare, hash } from 'bcryptjs'
import type { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import jwt from 'jsonwebtoken'
import GoogleProvider from 'next-auth/providers/google'
import { sendVerificationEmail } from '@/utils/sendEmail'
import platformConfig from '@/config/app-config'

export const authOptions: NextAuthOptions = {
    session: {
        strategy: 'jwt'
    },
    secret: platformConfig.variables.NEXTAUTH_JWT_SECRET,

    providers: [
        CredentialsProvider({
            id: 'credentials',
            name: 'password',
            credentials: {
                email: {
                    label: 'Email',
                    type: 'email',
                    placeholder: 'example@example.com'
                },
                password: { label: 'Password', type: 'password' }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials.password) {
                    return null
                }
                console.log(await hash(credentials.password, 12))
                const user = (await prisma.user.findUnique({
                    where: {
                        email: credentials.email
                    },
                })) as User
                if (!user) {
                    throw { message: 'No user found with this email', statusCode: 400 }
                }
                if (user.provider !== "credentials") {
                    throw { message: 'A user with this email with other provider is already registered', statusCode: 400 }
                }
                if (!user || !(await compare(credentials.password, user.password as string))) {
                    throw { message: 'Email or password is incorrect', statusCode: 401 }
                }

                return {
                    email: user.email,
                    name: user.name,
                    createdAt: user.createdAt,
                    emailVerified: user.verified,
                    id: user.id,
                    image: user.avatar,
                    updatedAt: user.updatedAt,
                }
            }
        }),
        GoogleProvider({
            clientId: platformConfig.variables.GOOGLE_CLIENT_ID!,
            clientSecret: platformConfig.variables.GOOGLE_CLIENT_SECRET!,
        })
    ],
    callbacks: {
        signIn: async ({ account, profile }) => {
            if (account?.provider === "google") {
                if (!profile) {
                    throw new Error("No profile found");
                }
                let user = await prisma.user.findUnique({
                    where: { email: profile?.email },
                });

                if (user) {
                    if (user.provider !== "google") {
                        throw new Error("An account with this email already exists");
                    }
                    else {
                        return true;
                    }
                } else {
                    user = await prisma.user.create({
                        data: {
                            name: profile.name as string,
                            email: profile.email as string,
                            avatar: (profile as any).picture as string,
                            verified: (profile as any).email_verified,
                            provider: "google"
                        }
                    })
                    if (!user.verified) {
                        await sendVerificationEmail({ to: user.email, name: user.name, subject: 'Verify Email', token: user.verifyToken as string });
                    }
                    return true;
                }
            }
            return true;
        },
        session: async ({ session, token }) => {
            const user = await prisma.user.findUnique({
                where: { email: token.email as string },
                select: {
                    id: true,
                    email: true,
                    name: true,
                    avatar: true,
                }
            });
            const userSubscription = await prisma.subscription.findFirst({
                where: {
                    userId: user?.id
                },
            });
            return {
                ...session,
                user: {
                    ...session.user,
                    ...user,
                    subscription: {
                        ...userSubscription
                    },
                },
                accessToken: token
            }
        },

        jwt: async ({ token, user }) => {
            if (user) {
                token.id = user.id
                token.email = user.email
                token.name = user.name
                token.randomKey = 'KG KEY'
                token.encoded = jwt.sign(
                    token,
                    platformConfig.variables.NEXTAUTH_JWT_SECRET!
                )
            }

            return await Promise.resolve(token)
        }
    },
    pages: {
        signIn: '/login',
        error: '/error', // Error code passed in query string as ?error=
        verifyRequest: '/auth/verify-request' // (used for check email message)
    }
}
