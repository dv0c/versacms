import { DashboardHeader } from "@/components/header";
import { DashboardShell } from "@/components/shell";

import { ApiKeys, columns } from "./columns"
import { DataTable } from "./data-table"

import { getApiKeysData } from "@/config/apikeys"


export default async function Page() {
    const data = await getApiKeysData()

    return (
        <DashboardShell>
            <DashboardHeader heading="Api" text="Create and manage your api keys." />
            <div>
                <DataTable columns={columns} data={data} />
            </div>
        </DashboardShell>
    )
}
