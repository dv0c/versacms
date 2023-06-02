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
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { AvatarFallback } from "@radix-ui/react-avatar"
import { Icons } from "@/components/icons"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type ApiKeys = {
    name: string
    email: string,
    image: string,
    createdAt: Date,
    id: string
}

export const columns: ColumnDef<ApiKeys>[] = [
    {
        header: "Name",
        cell: ({ row }) => {
            const data = row.original
            return (
                <div>
                    <div className="flex items-center gap-3">
                        <Avatar className="w-6 h-6">
                            <AvatarImage src={data.image} />
                            <Icons.user/>
                        </Avatar>
                        {data.name}
                    </div>
                </div>
            )
        },
    },
    {
        accessorKey: "email",
        header: "Email",
    },
    {
        id: "createdAt",
        header: "CreatedAt",
        cell: ({ row }) => {
            const createdAt = row.original.createdAt
            const date = new Date(createdAt)
            const formattedDate = date.toLocaleString()

            return (
                <div>
                    {formattedDate}
                </div>
            )
        },
    },
]