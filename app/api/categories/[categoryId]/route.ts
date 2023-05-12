import { getServerSession } from "next-auth"
import * as z from "zod"

import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { db } from "@/libs/prismadb"
import { postPatchSchema } from "@/libs/validations/post"

const routeContextSchema = z.object({
    params: z.object({
        categoryId: z.string(),
    }),
})

export async function DELETE(
    req: Request,
    context: z.infer<typeof routeContextSchema>
) {
    try {
        // Validate the route params.
        const { params } = routeContextSchema.parse(context)

        // Delete the post.
        await db.category.delete({
            where: {
                id: params.categoryId as string,
            },
        })

        return new Response(null, { status: 204 })
    } catch (error) {
        if (error instanceof z.ZodError) {
            return new Response(JSON.stringify(error.issues), { status: 422 })
        }

        return new Response(null, { status: 500 })
    }
}

export async function PATCH(
    req: Request,
    context: z.infer<typeof routeContextSchema>
) {
    try {
        // Validate route params.
        const { params } = routeContextSchema.parse(context)

        // Get the request body and validate it.
        const json = await req.json()
        const body = postPatchSchema.parse(json)

        // Update the post.
        // TODO: Implement sanitization for content.
        await db.category.update({
            where: {
                id: params.categoryId,
            },
            data: {
                title: body.title,
            },
        })

        return new Response(null, { status: 200 })
    } catch (error) {
        if (error instanceof z.ZodError) {
            return new Response(JSON.stringify(error.issues), { status: 422 })
        }

        return new Response(null, { status: 500 })
    }
}
