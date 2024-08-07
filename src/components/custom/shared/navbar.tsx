import Link from "next/link";
import {
  ChevronDown,
  Home,
  LineChart,
  Package,
  Package2,
  PanelLeft,
  Search,
  ShoppingCart,
  Users2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import AvatarWithFallBack from "@/components/custom/avatar-with-fall-back-text";

type Props = {};

/**
 * Renders the navigation bar component.
 *
 * @param {Props} props - The component props.
 * @returns {JSX.Element} The rendered navigation bar.
 */
const Navbar = (props: Props): JSX.Element => {
  return (
    <div className="flex flex-col sm:gap-4 sm:py-4">
      <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6 justify-end">
        <AvatarWithFallBack fallBackText="NN" imageUrl="" />
        <UserMenu />
        <Sheet>
          <SheetTrigger asChild>
            <Button size="icon" variant="outline" className="sm:hidden">
              <PanelLeft className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="sm:max-w-xs">
            <NavMenuItems />
          </SheetContent>
        </Sheet>
      </header>
    </div>
  );
};

const NavMenuItems = () => (
  <nav className="grid gap-6 text-lg font-medium">
    <NavMenuItem text="Acme Inc" icon={Package2} />
    <NavMenuItem text="Dashboard" icon={Home} />
    <NavMenuItem text="Orders" icon={ShoppingCart} />
    <NavMenuItem text="Products" icon={Package} />
    <NavMenuItem text="Customers" icon={Users2} />
    <NavMenuItem text="Settings" icon={LineChart} />
  </nav>
);

const NavMenuItem = ({
  text,
  icon: Icon,
}: {
  text: string;
  icon: React.FC;
}) => (
  <Link
    href="#"
    className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
  >
    <Icon />
    {text}
  </Link>
);

const UserMenu = () => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <ChevronDown className="cursor-pointer" />
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuItem>Profile</DropdownMenuItem>
      <DropdownMenuItem>Settings</DropdownMenuItem>
      <DropdownMenuItem>Notification</DropdownMenuItem>
      <DropdownMenuItem>Logout</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
);

export default Navbar;
