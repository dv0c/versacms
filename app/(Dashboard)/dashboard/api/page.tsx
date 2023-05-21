import { DashboardHeader } from "@/components/header";
import { DashboardShell } from "@/components/shell";

import { columns } from "./columns"
import { DataTable } from "./data-table"

import { ApiButton } from "./createButtonAPI";
import { db } from "@/libs/prismadb";
import { getCurrentUser } from "@/libs/session";


export default async function Page() {

    const user = await getCurrentUser()


    const data = await db.api.findMany({
        where: {
            authorId: user?.id as string
        },
        select: {
            name: true,
            limit: true,
            requests: true,
            status: true,
            model: true || "",
            id: true,
        },
        orderBy: {
            createdAt: "desc",
        }
    })



    return (
        <DashboardShell>
            <DashboardHeader heading="Api Keys" text="Create and manage your api keys.">
                <ApiButton />
            </DashboardHeader>
            <div>
                <DataTable columns={columns} data={data} />
            </div>
        </DashboardShell>
    )
}
