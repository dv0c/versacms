import { getServerSession } from "next-auth";
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { db } from "@/libs/prismadb";
import { generateAPIKey, uuid } from "@/libs/utils";

export async function POST() {
    const session = await getServerSession(authOptions)

    if (!session) return new Response("Unauthorized", { status: 401 })

    if ((await _APIUserCreationLimiter(session?.user?.id as string)) >= 5) return new Response("Creation of api is not allowed, you have reached your api creation limit", { status: 429 })

    const api = await db.api.create({
        data: {
            id: uuid(),
            name: generateAPIKey(),
            authorId: session?.user?.id as string,
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

    const api = await db.api.findMany({
        select: {
            name: true,
        }
    })

    return new Response(JSON.stringify(api))

}

async function _APIUserCreationLimiter(sid: string) {
    const count = await db.api.count({
        where: {
            authorId: sid
        }
    })

    return count
}