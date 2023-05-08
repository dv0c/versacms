import { Button } from "@/components/ui/button"
import { getCurrentUser } from "@/libs/session"
import { Plus } from "lucide-react"
import { notFound } from "next/navigation"
import { DashboardShell } from "@/components/shell"
import { DashboardHeader } from "@/components/header"
import { PostCreateButton } from "@/components/post-create-button"
import { EmptyPlaceholder } from "@/components/empty-placeholder"

export default async function Dashboard() {

    const user = await getCurrentUser()

    if (!user) {
        return notFound()
    }

    return (
        <DashboardShell>
            <DashboardHeader heading="Posts" text="Create and manage posts.">
                <PostCreateButton />
            </DashboardHeader>
            <EmptyPlaceholder>
                <EmptyPlaceholder.Icon name="post" />
                <EmptyPlaceholder.Title>No posts created</EmptyPlaceholder.Title>
                <EmptyPlaceholder.Description>
                    You don&apos;t have any posts yet. Start creating content.
                </EmptyPlaceholder.Description>
                <PostCreateButton variant="outline" />
            </EmptyPlaceholder>
        </DashboardShell>
    )
}