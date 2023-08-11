import NavLink from '@/components/ui/NavLink'
import { routesConfig, Icons } from '@/config/routes'
import React from 'react'
import Image from 'next/image'
import Logo from "@public/logo/logo.svg"
import { RiArrowLeftSLine } from 'react-icons/ri'
import { BiBell, BiSearch } from 'react-icons/bi'
import { Button } from '@/components/ui/button'
import { redirect } from 'next/navigation'
import { createServerSupabaseClient } from "@/services/supabaseServer"
import UserProfile from '@/components/layout/UserProfile'
interface ILayoutProps {
    children: React.ReactNode
}

const MainPageLayout = async ({ children }: ILayoutProps) => {
    const supabase = createServerSupabaseClient()

    const { data: { session } } = await supabase.auth.getSession()

    if (!session) {
        redirect("/auth/sign-in")
    }

    return (
        <div className='min-h-screen'>
            <div className='w-[320px] bg-white fixed top-0 bottom-0 left-0 border-r'>
                <div className='flex items-center justify-between gap-4 py-6 px-4'>
                    <Image src={Logo} alt="Company Logo" className='w-24' />
                    <RiArrowLeftSLine className="w-6 h-6" />
                </div>
                <div className='p-4'>
                    <h6 className='mb-2 font-medium ml-4'>Menu</h6>
                    <ul className='flex flex-col gap-3'>
                        {routesConfig.routes.map((route) => {
                            const Icon = Icons[route.icon ?? ""]
                            return (
                                <NavLink key={route.href} href={route.href} icon={<Icon className="w-5 h-5" />}>
                                    {route.title}
                                </NavLink>
                            )
                        })}
                    </ul>
                </div>
            </div>
            <div className='pl-[320px] flex flex-col h-full'>
                <div className='sticky top-0 h-16 bg-white py-2 px-6 flex items-center z-20 border-b'>
                    <div className='flex items-center flex-1'>
                        <BiSearch className="w-6 h-6" />
                        <input type="text" placeholder="Search" className='w-full ml-4 bg-transparent outline-none' />
                    </div>
                    <div className='flex gap-4'>
                        <Button size="square" variant="ghost">
                            <BiBell className='w-6 h-6' />
                        </Button>
                        <UserProfile />
                    </div>
                </div>
                <div className='p-6'>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default MainPageLayout