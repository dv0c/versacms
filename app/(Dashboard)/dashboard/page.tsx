import { getCurrentUser } from "@/libs/session"
import { notFound } from "next/navigation"
import { DashboardShell } from "@/components/shell"
import { DashboardHeader } from "@/components/header"
import { PostCreateButton } from "@/components/post-create-button"
import { EmptyPlaceholder } from "@/components/empty-placeholder"
import { db } from "@/libs/prismadb"
import { PostItem } from "@/components/post-item"

export default async function Dashboard() {

    const user = await getCurrentUser()

    if (!user) {
        return notFound()
    }

    const posts = await db.post.findMany({
        where: {
            authorId: user.id,
        },
        select: {
            id: true,
            title: true,
            published: true,
            createdAt: true,
        },
        orderBy: {
            updatedAt: "desc",
        },
    })

    return (
        <DashboardShell>
            <DashboardHeader heading="Posts" text="Create and manage posts.">
                <PostCreateButton />
            </DashboardHeader>
            <div>
                {posts?.length ? (
                    <div className="divide-y divide-border rounded-md border">
                        {posts.map((post) => (
                            <PostItem mode="category" key={post.id} post={post} />
                        ))}
                    </div>
                ) : (
                    <EmptyPlaceholder>
                        <EmptyPlaceholder.Icon name="post" />
                        <EmptyPlaceholder.Title>No posts created</EmptyPlaceholder.Title>
                        <EmptyPlaceholder.Description>
                            You don&apos;t have any posts yet. Start creating content.
                        </EmptyPlaceholder.Description>
                        <PostCreateButton mode={"category"} name="Create Category" variant="outline" />
                    </EmptyPlaceholder>
                )}
            </div>
        </DashboardShell>
    )
}