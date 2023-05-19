"use client"

import { ColumnDef } from "@tanstack/react-table"

import { MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type ApiKeys = {
    name: string
    requests: number,
    limit: Number,
    status: "pending" | "processing" | "success" | "failed" | "canceled" | "Expired" | "Disabled"
    model?: string,
    id: string
}

export const columns: ColumnDef<ApiKeys>[] = [
    {
        accessorKey: "name",
        header: "Api Key",
    },
    {
        accessorKey: "requests",
        header: "Requests",
    },
    {
        accessorKey: "limit",
        header: "Limit",
    },
    {
        accessorKey: "status",
        header: "Status",
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const api = row.original

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                            onClick={() => navigator.clipboard.writeText(api.name)}
                        >
                            Copy API Key
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={async () => await fetch('/api/api/' + api.name, { method: "DELETE" })}>
                            <span className="text-destructive cursor-pointer">Delete</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu >
            )
        },
    },
]