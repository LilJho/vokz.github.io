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
import Navigation from '@/components/layout/Navigation'
import Header from '@/components/layout/Header'
import MainContent from '@/components/layout/MainContent'

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
            <Navigation />
            <MainContent>
                {children}
            </MainContent>
        </div>
    )
}

export default MainPageLayout