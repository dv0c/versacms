import { getCurrentUser } from "@/libs/session"
import { notFound } from "next/navigation"

export default async function Dashboard() {

    const user = await getCurrentUser()

    if (!user) {
        return notFound()
    }

    return (
        <div className="grid items-start gap-8">
            <div className="flex items-center justify-between px-2">
                <div className="grid gap-1">
                    <h1 className="font-heading text-3xl md:text-4xl font-semibold">Posts</h1>
                    <p className="text-lg text-muted-foreground">Create and manage posts.</p>
                </div>
            </div>
        </div>
    )
}