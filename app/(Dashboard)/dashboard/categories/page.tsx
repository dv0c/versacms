import { EmptyPlaceholder } from "@/components/empty-placeholder"
import { DashboardHeader } from "@/components/header"
import { PostCreateButton } from "@/components/post-create-button"
import { PostItem } from "@/components/post-item"
import { DashboardShell } from "@/components/shell"
import { db } from "@/libs/prismadb"
import { getCurrentUser } from "@/libs/session"
import { notFound } from "next/navigation"

export default async function Categories() {
    const user = await getCurrentUser()

    if (!user) {
        return notFound()
    }

    const categories = await db.category.findMany({
        select: {
            id: true,
            title: true,
            published: true,
            createdAt: true,
            updatedAt: true,
            author: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                    image: true,
                    role: true,
                },
            },
        },
        orderBy: {
            updatedAt: "desc",
        },
    })

    return (
        <DashboardShell>
            <DashboardHeader heading="Categories" text="Create and manage categories.">
                <PostCreateButton mode={"category"} name="Create Category" />
            </DashboardHeader>
            <div>
                {categories?.length ? (
                    <div className="divide-y divide-border rounded-md border">
                        {categories.map((post) => (
                            <PostItem mode="category" key={post.id} post={post} />
                        ))}
                    </div>
                ) : (
                    <EmptyPlaceholder>
                        <EmptyPlaceholder.Icon name="post" />
                        <EmptyPlaceholder.Title>No categories created</EmptyPlaceholder.Title>
                        <EmptyPlaceholder.Description>
                            There is no categories yet. Start creating content.
                        </EmptyPlaceholder.Description>
                        <PostCreateButton mode={"category"} name="Create Category" variant="outline" />
                    </EmptyPlaceholder>
                )}
            </div>
        </DashboardShell>
    )
}