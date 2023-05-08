export const metadata = {
    title: 'Sparkle Press | Dashboard',
    description: 'Sparkle Press Dashboard',
}

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html>
            <body>
                {children}
            </body>
        </html>
    )
}