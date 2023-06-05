import { DashboardHeader } from "@/components/header";
import { DashboardShell } from "@/components/shell";
import { DataTable } from "./data-table";
import { db } from "@/libs/prismadb";
import { columns } from "./columns";
import { getCurrentUser } from "@/libs/session";
import { EmptyPlaceholder } from "@/components/empty-placeholder";
import { Icons } from "@/components/icons";
import { CreateUserButton, DisabledCreateUserButton } from "./CreateUserButton";

export default async function Users() {

    const user = await getCurrentUser()

    if (user?.role !== "administrator") {
        return (
            <DashboardShell>
                <DashboardHeader heading="Users" text="Create and manage users.">
                    <DisabledCreateUserButton />
                </DashboardHeader>
                <div>
                    <EmptyPlaceholder>
                        <Icons.warning name="post" />
                        <EmptyPlaceholder.Title>No Permission</EmptyPlaceholder.Title>
                        <EmptyPlaceholder.Description>
                            You do not have permission to view this page.
                        </EmptyPlaceholder.Description>
                    </EmptyPlaceholder>
                </div>
            </DashboardShell>
        )
    }

    const data = await db.user.findMany({
        select: {
            name: true,
            email: true,
            image: true,
            createdAt: true,
            emailVerified: true,
            id: true
        },
        orderBy: {
            createdAt: "desc",
        }
    })


    return (
        <DashboardShell>
            <DashboardHeader heading="Users" text="Create and manage users.">
                <CreateUserButton />
            </DashboardHeader>
            <div>
                <DataTable columns={columns} data={data} />
            </div>
        </DashboardShell>
    )
}

export const dynamic = 'force-dynamic'