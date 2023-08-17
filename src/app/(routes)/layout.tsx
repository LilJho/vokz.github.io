import React from 'react'
import { redirect } from 'next/navigation'
import { createServerSupabaseClient } from "@/services/supabaseServer"
import Navigations from '@/components/layout/Navigations'
import Header from '@/components/layout/Header'

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
        <div className='min-h-screen relative transition-all'>
            <Navigations />
            <div className='lg:pl-[320px] flex flex-col h-full'>
                <Header />
                <div className='p-6'>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default MainPageLayout