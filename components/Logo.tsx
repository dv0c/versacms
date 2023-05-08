import { Command } from "lucide-react";

type LogoProps = {
    className?: string;
};

const Logo = (props:LogoProps) => {
    return (
        <div className={`flex gap-3 font-semibold ` + props.className}>
            <Command />
            Sparkle Press
        </div>
    );
}

export default Logo;