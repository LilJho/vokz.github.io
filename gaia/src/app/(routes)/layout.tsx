<<<<<<< Updated upstream
import React from 'react'
import { redirect } from 'next/navigation'
import { createServerSupabaseClient } from "@/services/supabaseServer"
import Navigation from '@/components/layout/Navigation'
import MainContent from '@/components/layout/MainContent'

=======
import NavLink from "@/components/ui/NavLink";
import { routesConfig, Icons } from "@/config/routes";
import React from "react";
import Image from "next/image";
import Logo from "@public/logo/logo.svg";
import { RiArrowLeftSLine } from "react-icons/ri";
import { BiBell, BiSearch } from "react-icons/bi";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";
import { createServerSupabaseClient } from "@/services/supabaseServer";
import UserProfile from "@/components/layout/UserProfile";
>>>>>>> Stashed changes
interface ILayoutProps {
  children: React.ReactNode;
}

const MainPageLayout = async ({ children }: ILayoutProps) => {
  const supabase = createServerSupabaseClient();

<<<<<<< Updated upstream
    const { data: { session } } = await supabase.auth.getSession()
    console.log({ session })
    if (!session) {
        redirect("/auth/sign-in")
    }

    return (
        <div className='min-h-screen'>
            <Navigation />
            <MainContent>
                {children}
            </MainContent>
=======
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/auth/sign-in");
  }

  return (
    <div className="min-h-screen">
      <div className="w-[320px] bg-white fixed top-0 bottom-0 left-0 border-r">
        <div className="flex items-center justify-between gap-4 px-4 py-6">
          <Image src={Logo} alt="Company Logo" className="w-24" />
          <RiArrowLeftSLine className="w-6 h-6" />
>>>>>>> Stashed changes
        </div>
        <div className="p-4">
          <h6 className="mb-2 ml-4 font-medium">Menu</h6>
          <ul className="flex flex-col gap-3">
            {routesConfig.routes.map((route) => {
              const Icon = Icons[route.icon ?? ""];
              return (
                <NavLink
                  key={route.href}
                  href={route.href}
                  icon={<Icon className="w-5 h-5" />}
                >
                  {route.title}
                </NavLink>
              );
            })}
          </ul>
        </div>
      </div>
      <div className="pl-[320px] flex flex-col h-full">
        <div className="sticky top-0 z-20 flex items-center h-16 px-6 py-2 bg-white border-b">
          <div className="flex items-center flex-1">
            <BiSearch className="w-6 h-6" />
            <input
              type="text"
              placeholder="Search"
              className="w-full ml-4 bg-transparent outline-none"
            />
          </div>
          <div className="flex gap-4">
            <Button size="square" variant="ghost">
              <BiBell className="w-6 h-6" />
            </Button>
            <UserProfile />
          </div>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};

export default MainPageLayout;
