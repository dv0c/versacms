import { DashboardHeader } from "@/components/header";
import { DashboardShell } from "@/components/shell";
import { DataTable } from "./data-table";
import { db } from "@/libs/prismadb";
import { columns } from "./columns";

export default async function Users() {

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
            </DashboardHeader>
            <div>
                <DataTable columns={columns} data={data} />
            </div>
        </DashboardShell>
    )
}
