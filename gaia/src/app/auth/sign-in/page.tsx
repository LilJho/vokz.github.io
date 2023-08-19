import React from 'react'
import Image from 'next/image'
import LoginIllu from '@public/logo/green_logo.png'
import LoginForm from '@/components/views/auth/LoginForm'
import { redirect } from 'next/navigation'
import { createServerSupabaseClient } from '@/services/supabaseServer'
import LoginPage from '@/components/views/auth/LoginPage'

const AuthPage = async () => {
    const supabase = createServerSupabaseClient()
    const { data: { session } } = await supabase.auth.getSession()

    if (session) {
        redirect("/")
    }

    return (
        <LoginPage />
    )
}

export default AuthPage