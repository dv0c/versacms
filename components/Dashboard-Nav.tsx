'use client'

import { Icons } from "@/components/icons"
import { DashboardConfig } from "@/types/index";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {
    items: DashboardConfig["sidebarNav"];
}

const DashboardNav = (props: Props) => {
    const path = usePathname() || 'dashboard';

    if (!props.items?.length) {
        return null
    }

    const selectedRoute = path
     

    return (
        <div className="hidden w-[200px] flex-col md:flex">
            <nav className="grid items-start gap-2">
                {props.items.map((i) => {
                    const Icon = Icons[i.icon || "arrowRight"]
                    return (
                        <Link href={i.href || ""} key={i.title}>
                            <span className={`${selectedRoute === i.href ? "bg-accent" : ""} group flex gap-2 items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground transparent`}>
                                <Icon size={16}/>
                                {i.title}
                            </span>
                        </Link>
                    )
                })}
            </nav>
        </div>
    );
}

export default DashboardNav;