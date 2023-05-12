import DashboardNav from "@/components/Dashboard-Nav";
import SiteHeader from "@/components/Site-Header"
import { SiteFooter } from "@/components/site-footer";
import { dashboardConfig } from "@/config/dashboard";
import { getCurrentUser } from "@/libs/session"
import { notFound } from "next/navigation";

export const metadata = {
    title: 'Sparkle Press | Dashboard',
    description: 'Sparkle Press Dashboard',
}

export default async function DashboardLayout({ children, }: { children: React.ReactNode }) {

    const user = await getCurrentUser();
    
    if (!user) {
        return notFound()
    }


    return (
        <div className="flex min-h-screen flex-col space-y-6">
            <SiteHeader user={user} />
            <div className="container grid flex-1 gap-12 md:grid-cols-[200px_1fr]">
                <aside className="hidden w-[200px] flex-col md:flex">
                    <DashboardNav items={dashboardConfig.sidebarNav} />
                </aside>
                <main className="flex w-full flex-1 flex-col overflow-hidden">
                    {children}
                </main>
            </div>
            <SiteFooter className="border-t" />
        </div>
    )
}