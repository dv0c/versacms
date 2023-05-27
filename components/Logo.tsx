import { Command } from "lucide-react";
import { siteConfig } from "@/config/site";

type LogoProps = {
    className?: string;
};

const Logo = (props:LogoProps) => {
    return (
        <div className={`flex gap-3 font-semibold ` + props.className}>
            <Command />
            {siteConfig.name}
        </div>
    );
}

export default Logo;