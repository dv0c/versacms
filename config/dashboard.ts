import { DashboardConfig } from "../types/index"

export const dashboardConfig: DashboardConfig = {
  mainNav: [
    {
      title: "Documentation",
      href: "/docs",
    },
    {
      title: "Support",
      href: "/support",
      disabled: true,
    },
  ],
  sidebarNav: [
    {
      title: "Posts",
      href: "/dashboard",
      icon: "post",
    },
    {
      title: "Categories",
      href: "/dashboard/categories",
      icon: "category",
    },
    {
      title: "Api keys",
      href: "/dashboard/api",
      icon: "key",
    },
    {
      title: "Users",
      href: "/dashboard/users",
      icon: "users",
      admin: true
    },
    {
      title: "Settings",
      href: "/dashboard/settings",
      icon: "settings",
    },
  ],
}
