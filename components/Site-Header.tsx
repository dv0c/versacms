import Logo from "./Logo";
import { UserAccountNav } from "./user-account-nav";

type HeaderProps = {
    user: any;
}

const SiteHeader = (props: HeaderProps) => {
    return (
        <header className="sticky top-0 z-40 border-b bg-background">
            <div className="container flex h-16 items-center justify-between py-4">
                <div className="flex gap-6 md:gap-10">
                    <Logo className="cursor-pointer" />
                </div>
                <UserAccountNav user={props.user} />
            </div>
        </header>
    );
}

export default SiteHeader;