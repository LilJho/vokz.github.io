import React from 'react'
import { redirect } from 'next/navigation'
import { createServerSupabaseClient } from "@/services/supabaseServer"
import Navigation from '@/components/layout/Navigation'
import MainContent from '@/components/layout/MainContent'
import { UserDataType } from '@/lib/types'

interface ILayoutProps {
    children: React.ReactNode
}

const MainPageLayout = async ({ children }: ILayoutProps) => {
    const supabase = createServerSupabaseClient()

    const { data: { session } } = await supabase.auth.getSession()

    let { data }: any = await supabase
        .from("user_accounts")
        .select("*")
        .eq("uuid", session?.user.id);

    if (!session) {
        redirect("/auth/sign-in")
    }

    const userData: UserDataType = {
        email: session?.user.email!,
        role: data[0]?.role,
        first_name: data[0]?.first_name,
        last_name: data[0]?.last_name,
        middle_name: data[0]?.middle_name,
        id: data[0]?.id,
        uuid: data[0]?.uuid
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