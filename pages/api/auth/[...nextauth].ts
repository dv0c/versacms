import bcrypt from "bcrypt"
import NextAuth, { AuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import { PrismaAdapter } from "@next-auth/prisma-adapter"

import { db } from "@/libs/prismadb"

export const authOptions: AuthOptions = {
    adapter: PrismaAdapter(db),
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_ID as string,
            clientSecret: process.env.GOOGLE_SECRET as string
        }),
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: { type: "email" },
                password: { type: "password" }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) throw new Error('Invalid credentials')

                const user = await db.user.findUnique({
                    where: {
                        email: credentials.email
                    }
                })

                if (!user || !user?.hashedPassword) throw new Error('Invalid credentials')

                const isCorrectPassword = await bcrypt.compare(credentials.password, user.hashedPassword);

                if (!isCorrectPassword) throw new Error('Invalid credentials');

                return user;

            }
        })
    ],
    callbacks: {
        session: async ({ session, token }) => {
            if (session?.user) {
                session.user.id = token.uid;
            }
            return session;
        },
        jwt: async ({ user, token }) => {
            if (user) {
                token.uid = user.id;
                token.role = getUserRole(user)
            }
            return token;
        },
    },
    pages: {
        signIn: '/login',
        error: '/login'
    },
    debug: process.env.NODE_ENV === 'development',
    session: {
        strategy: "jwt"
    },
    secret: process.env.NEXTAUTH_SECRET,

}

async function getUserRole(user: any) {
    const role = await db.user.findUnique({
        where: {
            id: user.id
        },
        select: {
            role: true
        }
    })
    return role;
}


export default NextAuth(authOptions);