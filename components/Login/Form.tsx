/* eslint-disable react/no-unescaped-entities */
'use client'
import { Command } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { AiFillGithub as Github } from "react-icons/ai"
import { signIn } from 'next-auth/react'

const Form = () => {

    return (
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex items-center flex-col space-y-2 text-center">
                <Command />
                <h1 className="text-2xl font-semibold tracking-tight">Welcome back</h1>
                <p className="text-sm text-muted-foreground">Enter your email to sign in to your account</p>
            </div>
            <div className="grid gap-6">
                <form>
                    <div className="grid gap-2">
                        <Input placeholder="name@example.com" type="email" />
                        <Button>Sign In with Email</Button>
                    </div>
                </form>
            </div>
            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t"></span>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
                </div>
            </div>
            <Button variant={'outline'} className="gap-2" onClick={() => signIn('github', { callbackUrl: '/' })}>
                <Github size={17} />
                Github
            </Button>
            <p className="px-8 text-center text-sm text-muted-foreground">
                <span className="hover:text-brand underline underline-offset-4 cursor-pointer">Don't have an account? Sign Up</span>
            </p>
        </div>
    );
}

export default Form;