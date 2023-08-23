import React from 'react'
import { redirect } from 'next/navigation'
import { createServerSupabaseClient } from "@/services/supabaseServer"
import Navigation from '@/components/layout/Navigation'
import MainContent from '@/components/layout/MainContent'
import { getUserSessionData } from '@/services/getUserSessionData'

interface ILayoutProps {
    children: React.ReactNode
}

const MainPageLayout = async ({ children }: ILayoutProps) => {
    const { session, userData } = await getUserSessionData()

    if (!session) {
        redirect("/auth/sign-in")
    }

    return (
        <div className='min-h-screen'>
            <Navigation data={userData} />
            <MainContent data={userData} >
                {children}
            </MainContent>
        </div>
    )
}

export default MainPageLayout