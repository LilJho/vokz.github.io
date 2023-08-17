"use client"

import { useUserStore } from '@/lib/store/userStore'
import { useRouter } from 'next/navigation'
import React from 'react'

const Logout = ({ children = "Logout" }: { children: React.ReactNode }) => {
    const signOut = useUserStore((state) => state.signOut)
    const { push, refresh } = useRouter()
    const handleSignOut = async () => {
        signOut()
        refresh()
        push("/auth/sign-in")
    }

    return (
        <button className='flex items-center' onClick={handleSignOut}>{children}</button>
    )
}

export default Logout