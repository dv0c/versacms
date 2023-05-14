import { DashboardHeader } from "@/components/header";
import { DashboardShell } from "@/components/shell";

export default function Page() {
    return (
        <DashboardShell>
            <DashboardHeader heading="Api" text="Create and manage your api keys." />
            <div>
                API works!
            </div>
        </DashboardShell>
    )
}
