'use client'

import { Button } from "@/components/ui/button";
import React from "react";
import { Icons } from "@/components/icons";

import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import axios from "axios";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

export function CreateUserButton() {

    const router = useRouter()

    const [isLoading, setLoading] = React.useState(false)
    const [name, setName] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')

    const createUser = async () => {
        const url = process.env.NEXT_PUBLIC_APP_URL + '/api/users' as string
        if (!name.length || !email.length || !password.length) toast({
            title: "Missing fields.",
            description: "Please fill all the fields.",
            variant: "destructive"
        })
        setLoading(true)
        await axios.post(url, {
            name,
            email,
            password
        }).then(() => {
            toast({
                title: "Congratulations 🎉",
                description: "User has been created.",
            })
            setLoading(false)
            router.refresh()
        }).catch((err) => {
            toast({
                title: "Something went wrong.",
                description: err.message,
                variant: "destructive"
            })            
            setLoading(false)
        })
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button disabled={isLoading}>
                    {isLoading ? (
                        <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                        <Icons.add className="mr-2 h-4 w-4" />
                    )}
                    Create User
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Create new User</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div>
                        <Label htmlFor="name" className="text-right">
                            Name
                        </Label>
                        <Input id="name" type="text" onChange={(e) => { setName(e.target.value) }} value={name} className="col-span-3" />
                    </div>
                    <div>
                        <Label htmlFor="email" className="text-right">
                            Email
                        </Label>
                        <Input id="email" type="email" onChange={(e) => { setEmail(e.target.value) }} value={email} className="col-span-3" />
                    </div>
                    <div>
                        <Label htmlFor="password" className="text-right">
                            Password
                        </Label>
                        <Input id="password" type="password" value={password} onChange={(e) => { setPassword(e.target.value) }} className="col-span-3" />
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit" disabled={isLoading} onClick={createUser}>Save changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export function DisabledCreateUserButton() {
    return (
        <Button disabled>
            <Icons.add className="mr-2 h-4 w-4" />
            Create User
        </Button>
    )
}