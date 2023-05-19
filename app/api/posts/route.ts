import { uuid } from '@/libs/utils'

import { getServerSession } from "next-auth/next"
import * as z from "zod"


import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { db } from '@/libs/prismadb'
import { NextRequest } from 'next/server';

const postCreateSchema = z.object({
    title: z.string(),
    content: z.string().optional(),
})

async function limitUpdate(token: string, requests: number) {
    await db.api.update({
        where: {
            name: token
        },
        data: {
            requests: requests + 1
        }
    })
}

export async function GET(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions)

        // Validations

        if (!req.headers.has("sparkle-press") && !req.nextUrl.searchParams.has("api")) return new Response("API key is missing!", { status: 403 })

        const token = await db.api.findUnique({
            select: {
                name: true,
                requests: true,
                limit: true
            },
            where: {
                name: req.headers.get("sparkle-press")?.split(" ")[0] || req.nextUrl.searchParams.get("api")?.toString()
            }
        })


        if (!token?.name) return new Response("API key is invalid", { status: 403 })

        if (!session && !token?.name) return new Response("Unauthorized", { status: 403 })

        if (token.limit === token.requests) return new Response("API limit reached", { status: 403 })

        // Access without session
        // return posts only if available to public api (where api == true)

        if (token.name && !session) {
            const posts = await db.post.findMany({
                select: {
                    id: true,
                    title: true,
                    published: true,
                    createdAt: true,
                },
                where: {
                    api: true
                }
            })

            limitUpdate(token.name, token.requests);

            return new Response(JSON.stringify(posts))
        }

        // Access with session
        // return posts of the user based on user id
        // use if only to fix typescript error its just a quick fix

        // TODO better implementation to this code

        if (session) {
            const content = req.nextUrl.searchParams.get("content");

            const { user } = session

            const posts = await db.post.findMany({
                select: {
                    id: true,
                    title: true,
                    published: true,
                    createdAt: true,
                    // author: {
                    //     select: {
                    //         id: true,
                    //         name: true,
                    //         email: true,
                    //         image: true,
                    //         role: true,
                    //     }
                    // },
                },
                where: {
                    authorId: user?.id,
                },
            })

            // return posts with content inside
            // need to include ?content=true in the url to get the content of the post

            const contentPost = await db.post.findMany({
                select: {
                    id: true,
                    title: true,
                    content: true,
                    published: true,
                    createdAt: true,
                },
                where: {
                    authorId: user?.id,
                },
            })

            if (content === "true") return new Response(JSON.stringify(contentPost))

            limitUpdate(token.name, token.requests);

            return new Response(JSON.stringify(posts))
        }
    } catch (error: any) {
        return new Response(error.message, { status: 500 })
    }
}

export async function POST(req: Request,) {
    try {
        const session = await getServerSession(authOptions)

        if (!session) return new Response("Unauthorized", { status: 403 })

        const { user } = session


        const json = await req.json()
        const body = postCreateSchema.parse(json)

        const post = await db.post.create({
            data: {
                id: uuid(),
                title: body.title,
                content: body.content,
                authorId: user?.id || "",
            },
            select: {
                id: true,
            },
        })

        return new Response(JSON.stringify(post))
    } catch (error) {
        if (error instanceof z.ZodError) {
            return new Response(JSON.stringify(error.issues), { status: 422 })
        }
        return new Response(null, { status: 500 })
    }
}