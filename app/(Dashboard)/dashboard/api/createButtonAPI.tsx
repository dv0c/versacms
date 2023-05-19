'use client'

import { Button } from "@/components/ui/button";
import React from "react";
import { Icons } from "@/components/icons";
import { useRouter } from "next/navigation";


export function ApiButton() {

    const [isLoading, setLoading] = React.useState(false)

    const router = useRouter()

    const handleClick = async () => {
        setLoading(true)
        await fetch('/api/api', {
            method: 'POST',
        }).then(() => {
            setLoading(false)
            router.refresh()
        })
    }

    return (
        <Button onClick={handleClick} disabled={isLoading}>
            {isLoading ? (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            ) : (
                <Icons.add className="mr-2 h-4 w-4" />
            )}
            Create Api key
        </Button>
    )
}
