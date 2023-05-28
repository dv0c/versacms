import DashboardNav from "@/components/Dashboard-Nav";
import SiteHeader from "@/components/Site-Header"
import { SiteFooter } from "@/components/site-footer";
import { dashboardConfig } from "@/config/dashboard";
import { siteConfig } from "@/config/site";
import { getCurrentUser } from "@/libs/session"
import { notFound } from "next/navigation";

export const metadata = {
    title: siteConfig.name,
    description: siteConfig.name + ' Dashboard',
}

export default async function DashboardLayout({ children, }: { children: React.ReactNode }) {

    const user = await getCurrentUser();

    return (
        <div className="flex min-h-screen flex-col space-y-6">
            <SiteHeader user={user} />
            <div className="container grid flex-1 gap-12 md:grid-cols-[200px_1fr]">
                <aside className="hidden w-[200px] flex-col md:flex">
                    <DashboardNav user={user} items={dashboardConfig.sidebarNav} />
                </aside>
                <main className="flex w-full flex-1 flex-col overflow-hidden">
                    {children}
                </main>
            </div>
            <SiteFooter className="border-t" />
        </div>
    )
}