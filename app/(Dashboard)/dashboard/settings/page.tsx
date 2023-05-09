import { DashboardHeader } from "@/components/header"
import { PostCreateButton } from "@/components/post-create-button"
import { DashboardShell } from "@/components/shell"

export const metadata = {
    title: 'Sparkle Press | Settings',
    description: 'Sparkle Press Settings Page',
}


export default function Settings() {
    return (
        <DashboardShell>
            <DashboardHeader heading="Settings" text="Manage account and website settings.">
            </DashboardHeader>
        </DashboardShell>
    )
}