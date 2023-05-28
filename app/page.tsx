import Form from "@/components/Login/Form"
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/libs/session";
import { SiteFooter } from "@/components/site-footer";

export default async function Home() {
    const user = await getCurrentUser()

    if (user) {
        redirect('/dashboard')
    }

    return (
        <main className="h-full">
            <div className='pb-20 container flex h-screen w-screen flex-col items-center justify-center'>
                <Form />
                <SiteFooter className="w-full hidden md:block absolute bottom-0 border-t" />
            </div>
        </main>
    )
}