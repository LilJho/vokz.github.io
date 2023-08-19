"use client"
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import React from 'react'

const supabase = createClientComponentClient();

const Logout = ({ children = "Logout" }: { children: React.ReactNode }) => {
    const { push, refresh } = useRouter()
    const handleSignOut = async () => {
        await supabase.auth.signOut()
        refresh()
        push("/auth/sign-in")
    }

    return (
        <button className='flex items-center' onClick={handleSignOut}>{children}</button>
    )
}

export default Logout