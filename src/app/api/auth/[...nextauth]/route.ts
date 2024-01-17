import { prisma } from "@/lib/prisma";
import { User } from "@prisma/client";
import { compare, hash } from "bcryptjs";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import jwt from "jsonwebtoken";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_JWT_SECRET,

  providers: [
    CredentialsProvider({
      name: "Sign in",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "example@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          return null;
        }
        console.log("here");

        console.log(await hash(credentials.password, 12));
        const user = (await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
          select: {
            id: true,
            email: true,
            name: true,
            password: true,
          },
        })) as User;
        if (!user) {
          throw { message: "No user found with this email", statusCode: 400 };
        }
        if (!user || !(await compare(credentials.password, user.password))) {
          throw { message: "Email or password is incorrect", statusCode: 401 };
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
        };
      },
    }),
    CredentialsProvider({
      id: "emailVerification",
      credentials: {
        token: { type: "text" },
      },
      authorize: async (
        credentials: Record<"token", string> | undefined,
        req: any
      ): Promise<User | null> => {
        if (!credentials) {
          throw new Error("Ungültige Anmeldedaten");
        }

        try {
          const user = await prisma.user.findFirst({
            where: { verifyToken: credentials.token },
          });

          if (!user) {
            throw new Error("Ungültiger oder abgelaufener Verifizierungslink");
          }

          await prisma.user.update({
            where: { id: user.id },
            data: { verifyToken: undefined },
          });
          return user;
        } catch (error: any) {
          throw error;
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    session: ({ session, token }) => {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          role: token.role,
          randomKey: token.randomKey,
        },
        accessToken: token,
      };
    },

    jwt: async ({ token, user }) => {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.randomKey = "KG KEY";
        token.encoded = jwt.sign(
          token,
          process.env.NEXTAUTH_JWT_SECRET as string
        );
      }

      return Promise.resolve(token);
    },
  },
  pages: {
    signIn: "/auth/login",
    error: "/auth/error", // Error code passed in query string as ?error=
    verifyRequest: "/auth/verify-request", // (used for check email message)
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
