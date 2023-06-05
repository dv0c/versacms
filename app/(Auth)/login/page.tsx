import Form from "@/components/Login/Form"
import { SiteFooter } from "@/components/site-footer";
import Link from "next/link";
import { cn } from "@/libs/utils";
import { buttonVariants } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default async function Login() {

    return (
        <main className="h-full">
            <Link
                href="/"
                className={cn(
                    buttonVariants({ variant: "ghost" }),
                    "absolute left-4 top-4 md:left-8 md:top-8"
                )}
            >
                <>
                    <Icons.chevronLeft className="mr-2 h-4 w-4" />
                    Back
                </>
            </Link>
            <div className='pb-20 container flex h-screen w-screen flex-col items-center justify-center'>
                <Suspense fallback={<FormFallback />}>
                    <Form />
                </Suspense>
                <SiteFooter className="w-full hidden md:block absolute bottom-0 border-t" />
            </div>
        </main>
    )
}

function FormFallback() {
    return <>
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <Skeleton className="w-full h-[380px]" />
        </div>
    </>
}
