import { DashboardHeader } from "@/components/header";
import { DashboardShell } from "@/components/shell";

export default function Users() {
    return (
        <DashboardShell>
            <DashboardHeader heading="Users" text="Create and manage users.">
            </DashboardHeader>
            <div>
                Users works!
            </div>
        </DashboardShell>
    )
}
