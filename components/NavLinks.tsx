import Link from "next/link";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";

interface NavLinkProps {
  href: string;
  icon: React.ReactNode;
  tooltip: string;
  isActive: boolean;
}

const NavLink = ({ href, icon, tooltip, isActive }: NavLinkProps) => {
  return (
    <Link href={href} className={`w-full justify-start text-white ${isActive ? "text-teal-300" : ""}`}>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>{icon}</TooltipTrigger>
          <TooltipContent>
            <p>{tooltip}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </Link>
  );
};

export default NavLink;