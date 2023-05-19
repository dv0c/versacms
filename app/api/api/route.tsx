import { getServerSession } from "next-auth";
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { db } from "@/libs/prismadb";
import { generateAPIKey, uuid } from "@/libs/utils";

export async function POST() {
    const session = await getServerSession(authOptions)

    if (!session) return new Response("Unauthorized", { status: 401 })

    // TODO limit api creation for a user 
    const api = await db.api.create({
        data: {
            id: uuid(),
            name: generateAPIKey(),
            authorId: session?.user?.id || "",
            requests: 0,
            limit: 200,
        },
        select: {
            name: true
        }
    })

    return new Response(JSON.stringify(api))

}

export async function GET() {
    const session = await getServerSession(authOptions)

    if (!session) return new Response("Unauthorized", { status: 401 })

    const api = await db.api.findMany({})

    return new Response(JSON.stringify(api))

}