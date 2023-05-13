import { uuid } from '@/libs/utils'

import { getServerSession } from "next-auth/next"
import * as z from "zod"


import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { db } from '@/libs/prismadb'

const categoryCreateSchema = z.object({
    title: z.string(),
})

export async function GET() {
    try {
        const session = await getServerSession(authOptions)

        if (!session) return new Response("Unauthorized", { status: 403 })

        const categories = await db.category.findMany({
            select: {
                id: true,
                title: true,
                published: true,
                createdAt: true,
            },
        })

        return new Response(JSON.stringify(categories))
    } catch (error) {
        return new Response(null, { status: 500 })
    }
}

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions)

        if (!session) return new Response("Unauthorized", { status: 403 })

        const { user } = session

        const json = await req.json()
        const body = categoryCreateSchema.parse(json)

        const category = await db.category.create({
            data: {
                id: uuid(),
                title: body.title,
                authorId: user?.id || "",
            },
            select: {
                id: true,
            },
        })

        return new Response(JSON.stringify(category))
    } catch (error) {
        if (error instanceof z.ZodError) {
            return new Response(JSON.stringify(error.issues), { status: 422 })
        }
        return new Response(null, { status: 500 })
    }
}