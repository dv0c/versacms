"use client"

import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type ApiKeys = {
    id: string
    requests: number
    status: "pending" | "processing" | "success" | "failed" | "canceled" | "Expired" | "Disabled"
    model: string
}

export const columns: ColumnDef<ApiKeys>[] = [
    {
        accessorKey: "id",
        header: "Api Key",
    },
    {
        accessorKey: "requests",
        header: "Requests",
    },
    {
        accessorKey: "status",
        header: "Status",
    },
]
