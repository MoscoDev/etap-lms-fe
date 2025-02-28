"use client";
import Image from "next/image";
import Link from "next/link";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useEffect, useState } from "react";
import { HomeIcon, Package2Icon, UserIcon } from "lucide-react";
import { usePathname } from "next/navigation";

type Props = {
  expanded?: boolean;
};

const SideBar = ({ expanded: defaultExpanded = true }: Props) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const [currentPath, setCurrentPath] = useState('');
  const path = usePathname();

  useEffect(() => {
    setCurrentPath(path);
  }, [path]);

  const navigationItems = [
    {
      icon: <HomeIcon className="h-5 w-5" />,
      href: '/dashboard',
      tooltip: 'Home',
      isActive: currentPath.includes('/dashboard'),
    },
    {
      icon: (
        <Package2Icon className="h-4 w-4 transition-all group-hover:scale-110" />
      ),
      href: '/subjects',
      tooltip: 'Subjects',
      isActive: currentPath.includes('/subjects'),
    },
  ];

  useEffect(() => {
    localStorage.setItem('sidebar', JSON.stringify(isExpanded));
  }, [isExpanded]);

  useEffect(() => {
    const storedExpanded = localStorage.getItem('sidebar');
    setIsExpanded(storedExpanded ? JSON.parse(storedExpanded) : defaultExpanded);
  }, []);

  return (
    <div className="z-10 hidden bg-slate-950 w-56 p-6 gap-12 flex-col sm:flex">
      <nav className="flex flex-col items-center px-2">
        <Link href="/" className="flex flex-1 w-full bg-white py-3 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground mb-12">
          {isExpanded ? (
            <Image width={80} height={0} src="/img/logo.png" alt="" />
          ) : (
            <Image
              src="./img/etap-icon.svg"
              width={25}
              height={0}
              alt="etap LMS"
              className="transition-all group-hover:scale-110"
            />
          )}
          <span className="sr-only">etap LMS</span>
        </Link>
        <div className="flex flex-1 w-full flex-col items-start gap-4">
          {navigationItems.map((item) => (
            <Tooltip key={item.tooltip}>
              <TooltipTrigger asChild>
                <Link
                  onClick={() => setCurrentPath(item.href)}
                  href={item.href}
                  className={`flex w-full items-center justify-start gap-4 row rounded-sm transition-colors text-white hover:text-tertiary hover:bg-primary-light p-3 text-sm cursor-pointer ${
                    item.isActive ? 'bg-primary text-tertiary' : ''
                  }`}
                >
                  {item.icon}
                  <span className={`${isExpanded ? 'block' : 'hidden'} transition-all font-light`}>
                    {item.tooltip}
                  </span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right" hidden={!isExpanded} className={`${isExpanded ? 'hidden' : 'block'}`}>
                {item.tooltip}
              </TooltipContent>
            </Tooltip>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default SideBar;
