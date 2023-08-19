import React from 'react'
import Image from 'next/image'
import LoginIllu from '@public/logo/green_logo.png'
import LoginForm from '@/components/views/auth/LoginForm'
import { redirect } from 'next/navigation'
import { createServerSupabaseClient } from '@/services/supabaseServer'

const AuthPage = async () => {
    const supabase = createServerSupabaseClient()
    const { data: { session } } = await supabase.auth.getSession()

    if (session) {
        redirect("/")
    }

    return (
        <div className='flex flex-col items-center justify-center min-h-[100dvh] bg-white'>
            <Image src={LoginIllu} alt="Login Illustration" className='w-52' />
            <div className='my-6 text-center'>
                <h2 className='text-2xl font-bold tracking-widest'>Login</h2>
                <span className='text-gray-500'>Enter your credentials to continue.</span>
            </div>
            <LoginForm />
        </div>
    )
}

export default AuthPage