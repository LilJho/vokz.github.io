import React from 'react'
import { redirect } from 'next/navigation'
import { createServerSupabaseClient } from "@/services/supabaseServer"
import Navigation from '@/components/layout/Navigation'
import MainContent from '@/components/layout/MainContent'

interface ILayoutProps {
    children: React.ReactNode
}

const MainPageLayout = async ({ children }: ILayoutProps) => {
    const supabase = createServerSupabaseClient()

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
        </div>
    )
}

export default MainPageLayout