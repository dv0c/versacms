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

export async function GET(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions)

        if (!session) return new Response("Unauthorized", { status: 403 })

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

        return new Response(JSON.stringify(posts))
    } catch (error) {
        return new Response(null, { status: 500 })
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