import Form from "@/components/Login/Form"
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/libs/session";

export default async function Home() {
    const user = await getCurrentUser()

    if (user) {
        redirect('/dashboard')
    }
        
    return (
        <main className="h-full">
            <div className='container flex h-screen w-screen flex-col items-center justify-center'>
                <Form />
            </div>
        </main>
    )
}