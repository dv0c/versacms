import { getServerSession } from "next-auth"
import * as z from "zod"

import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { db } from "@/libs/prismadb"

const routeContextSchema = z.object({
    params: z.object({
        apiId: z.string(),
    }),
})

export async function DELETE(
    req: Request,
    context: z.infer<typeof routeContextSchema>
) {
    try {
        const { params } = routeContextSchema.parse(context)

        if (!(await verifyCurrentUserHasAccessToThisAPI(params.apiId))) {
            return new Response(null, { status: 403 })
        }

        // Delete the post.
        await db.api.delete({
            where: {
                id: params.apiId as string,
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

async function verifyCurrentUserHasAccessToThisAPI(apiId: string) {
    const session = await getServerSession(authOptions)
    const count = await db.api.count({
        where: {
            id: apiId,
            authorId: session?.user?.id,
        },
    })

    return count > 0
}
