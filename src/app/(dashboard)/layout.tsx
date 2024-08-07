"use client";
import { TooltipProvider } from "@/components/ui/tooltip";
import Navbar from "@/components/custom/shared/navbar";
import SideBar from "@/components/custom/shared/side-bar";
import { useEffect, useState } from "react";
import { UserRole } from "@/lib/utils";
import { useRouter, usePathname } from "next/navigation";

interface User {
    role: string
    username: string
}

export default function Dashboard({ children }: any) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [username, setUsername] = useState("");
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem('user') ?? "{}") as User;
    if(!user?.role){
      router.push('/login')
    }
    const userRole = user.role;
    if (userRole === UserRole.ADMIN) {
      setIsAdmin(true);
      setUsername(user.username)
    }
  }, []);

  useEffect(() => {
    const checkAdmin = () => {
      const user = JSON.parse(sessionStorage.getItem('user') ?? "{}") as User;
       if(!user?.role){
      router.push('/login')
    }
    setUsername(user?.username)
    const userRole = user.role.toUpperCase();
      if (userRole === UserRole.ADMIN && !pathname.includes('/admin') && !pathname.includes('/dashboard')) {
        router.push('/admin' + pathname);
      } else if (userRole !== UserRole.ADMIN && pathname.includes('/admin')) {
        router.push(pathname.replace('/admin', ''));
      }
    }
    checkAdmin();
  }, [pathname, router]);

  return (
    <div className="flex min-h-screen bg-muted/40">
      <div className="hidden h-screen sm:flex">
        <TooltipProvider>
          <SideBar />
        </TooltipProvider>
      </div>
      <div className="flex flex-col w-full h-screen">
        <Navbar username={username} />
        <div className="flex-1 container overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}
