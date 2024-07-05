import { prisma } from '@/lib/prisma'
import { type User } from '@prisma/client'
import { compare } from 'bcryptjs'
import Credentials from 'next-auth/providers/credentials'
import jwt from 'jsonwebtoken'
import GoogleProvider from 'next-auth/providers/google'
import TwitterProvider from "next-auth/providers/twitter";
import GitHubProvider from "next-auth/providers/github";
import FacebookProvider from "next-auth/providers/facebook";

import { sendMagicLinkEmail, sendVerificationEmail } from '@/utils/sendEmail'
import platformConfig from '@/config/app-config'
import { createTranslation } from '../i18n/server'
import createClient from '../meilisearch/meilisearch'
import { NextAuthConfig } from 'next-auth'
import Resend from "next-auth/providers/resend"
import { PrismaAdapter } from "@auth/prisma-adapter"


export const authOptions: NextAuthConfig = {
    session: {
        strategy: 'jwt'
    },
    secret: platformConfig.variables.NEXT_AUTH_SECRET,

    providers: [
        Resend({
            apiKey: platformConfig.variables.RESEND_API_KEY!,
            secret: platformConfig.variables.NEXT_AUTH_SECRET!,
            from: "no-reply@yunakin.com",

            async sendVerificationRequest(params) {
                const email = params.identifier;

                const user = await prisma.user.findUnique({
                    where: {
                        email: email
                    }
                })
                if (!user) {
                    throw { message: "User not found", statusCode: 404 }
                }

                const res = await sendMagicLinkEmail({ to: params.identifier, subject: 'Sign in to Yunakin', magicLink: params.url });
                if (res.success) {
                    throw { message: "Error sending magic link", statusCode: 500 }
                }
            },
        }),
        Credentials({
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
                const { t } = await createTranslation('auth')
                if (!credentials?.email || !credentials?.password) {
                    return null
                }

                let credEmail = credentials.email as string
                let credPassword = credentials.password as string
                const user = (await prisma.user.findUnique({
                    where: {
                        email: credEmail
                    },
                    select: {
                        id: true,
                        email: true,
                        name: true,
                        avatar: true,
                        provider: true,
                        password: true,
                        role: true,
                    },
                })) as User
                if (!user) {
                    throw { message: t("error.userNotFound"), statusCode: 400 }
                }
                if (user.provider !== "credentials") {
                    throw { message: t("error.emailOtherProvider"), statusCode: 400 }
                }
                if (!user || !(await compare(credPassword, user.password as string))) {
                    throw { message: t("error.incorrectEmailOrPassword"), statusCode: 401 }
                }
                const config = await prisma.memberBenefitPageConfig.findFirst({
                    where: {
                        userId: user.id
                    }
                });
                return {
                    email: user.email,
                    name: user.name,
                    id: user.id,
                    role: user.role,
                    clientSlug: config?.clientSlug,
                }
            }
        }),
        GoogleProvider({
            clientId: platformConfig.variables.GOOGLE_CLIENT_ID!,
            clientSecret: platformConfig.variables.GOOGLE_CLIENT_SECRET!,
        }),
        TwitterProvider({
            clientId: platformConfig.variables.TWITTER_CLIENT_ID!,
            clientSecret: platformConfig.variables.TWITTER_CLIENT_SECRET!,
        }),
        GitHubProvider({
            clientId: platformConfig.variables.GITHUB_ID as string,
            clientSecret: platformConfig.variables.GITHUB_SECRET as string
        }),
        FacebookProvider({
            clientId: platformConfig.variables.FACEBOOK_CLIENT_ID as string,
            clientSecret: platformConfig.variables.FACEBOOK_CLIENT_SECRET as string
        })
    ],
    callbacks: {
        signIn: async ({ account, profile }) => {
            if (account?.provider === "google") {
                if (!profile) {
                    throw new Error("No profile found");
                }
                let user = await prisma.user.findUnique({
                    where: { email: profile?.email as string },
                });

                if (user) {
                    if (user.provider !== "google") {
                        throw new Error("An account with this email already exists");
                    }
                    else {
                        return true;
                    }
                } else {
                    const meilisearchClient = await createClient()
                    user = await prisma.user.create({
                        data: {
                            name: profile.name as string,
                            email: profile.email as string,
                            avatar: (profile as any).picture as string,
                            verified: (profile as any).email_verified,
                            provider: "google"
                        }
                    })
                    await meilisearchClient.index("users").addDocuments([user])
                    if (!user.verified) {
                        await sendVerificationEmail({ to: user.email, name: user.name, subject: 'Verify Email', token: user.verifyToken as string });
                    }
                    return true;
                }
            }
            return true;
        },
        session: async ({ session, token }) => {

            const user = await prisma.user.findFirst({
                where: { id: token.id as string },
                select: {
                    id: true,
                    email: true,
                    name: true,
                    avatar: true,
                    role: true,
                }
            });
            const config = await prisma.memberBenefitPageConfig.findFirst({
                where: {
                    userId: user?.id
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
                    image: user?.avatar,
                    subscription: {
                        ...userSubscription
                    },
                    clientSlug: config?.clientSlug,
                },
                accessToken: token
            }
        },

        jwt: async ({ token, user }) => {
            if (user) {
                token.id = user.id
                token.email = user.email
                token.name = user.name
                token.avatar = user.image
                token.randomKey = 'KG KEY'
                token.encoded = jwt.sign(
                    token,
                    platformConfig.variables.NEXTAUTH_SECRET!
                )
            } else {
                const user = await prisma.user.findFirst({
                    where: { email: token.email as string },
                    select: {
                        id: true,
                    }
                });
                console.log(user)
                token.id = user?.id
            }
            return await Promise.resolve(token)
        }
    },
    pages: {
        signIn: '/dashboard',
        error: '/error', // Error code passed in query string as ?error=
        verifyRequest: '/magic-link-sent', // (used for check email message)
        newUser: "/dashboard",
    },
    adapter: PrismaAdapter(prisma),
}
