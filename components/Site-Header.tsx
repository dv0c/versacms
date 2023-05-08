import Logo from "./Logo";
import { Avatar, AvatarImage } from "./ui/avatar";

type HeaderProps = { 
    user: any;
}

const SiteHeader = (props:HeaderProps) => {
    return (
        <header className="sticky top-0 z-40 border-b bg-background">
            <div className="container flex h-16 items-center justify-between py-4">
                <div className="flex gap-6 md:gap-10">
                    <Logo className="cursor-pointer" />
                </div>
                <div>
                    <Avatar className="h-8 w-8">
                        <AvatarImage src={props.user?.image?.toString()} />
                    </Avatar>
                </div>
            </div>
        </header>
    );
}

export default SiteHeader;