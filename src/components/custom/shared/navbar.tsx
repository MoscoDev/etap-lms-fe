"use client"
import {
  ChevronDown,
  HomeIcon,
  Package2Icon,
  PanelLeft,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import AvatarWithFallBack from "@/components/custom/avatar-with-fall-back-text";
import { usePathname, useRouter } from "next/navigation";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "@/components/ui/navigation-menu";
import { useEffect, useState } from "react";

type Props = {username : string};

/**
 * Renders the navigation bar component.
 *
 * @param {Props} props - The component props.
 * @returns {JSX.Element} The rendered navigation bar.
 */
const Navbar = ({username}: Props): JSX.Element => {
  const router = useRouter()
 const handleLogout = ()=>{
  localStorage.clear()
  router.push('/login')
 }
  return (
    <div className="flex flex-col sm:gap-4 sm:py-4">
      <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6 justify-end">
        <AvatarWithFallBack fallBackText={username.charAt(0).toUpperCase()} imageUrl="" />
        <UserMenu  handleLogout={handleLogout} />
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

const NavMenuItems = () => {
  const navigationItems = [
    {
      icon: HomeIcon,
      href: '/dashboard',
      tooltip: 'Home',
    },
    {
      icon: Package2Icon,
      href: '/subjects',
      tooltip: 'Subjects',
    },
  ];
  const currentPath = usePathname();
  return (

    <nav className="grid gap-6 text-lg font-medium">

      {navigationItems.map(({ icon, href, tooltip, isActive }: any, id) => (
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink href={href}>{tooltip}</NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      ))}
    </nav>
  )
}



/**
 * Renders a user menu dropdown with a logout option.
 *
 * @param {Object} props - The component props.
 * @param {Function} props.handleLogout - The function to handle user logout.
 * @return {JSX.Element} The user menu dropdown component.
 */
const UserMenu = ({ handleLogout }: { handleLogout: () => void }): JSX.Element => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <ChevronDown className="cursor-pointer" />
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuItem onClick={(handleLogout)}>Logout</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
);

export default Navbar;
