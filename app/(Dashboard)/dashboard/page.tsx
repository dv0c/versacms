import { getCurrentUser } from "@/libs/session"
import { notFound } from "next/navigation"

export default async function Dashboard() {

    const user = await getCurrentUser()

    if (!user) {
        return notFound()
    }

    return (
        <div>
            <h1>Dashboard</h1>
        </div>
    )
}