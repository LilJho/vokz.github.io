"use client"
import React, { useState } from 'react'
import Image from 'next/image'
import LoginIllu from '@public/logo/green_logo.png'
import LoginForm from './LoginForm'
import Loaders from '@/components/ui/Loaders'

const LoginPage = () => {
    const [loginSuccess, setLoginSuccess] = useState(false)

    return (
        <div className='flex flex-col items-center justify-center min-h-[100dvh] bg-white'>
            {!loginSuccess ?
                <>
                    <Image src={LoginIllu} alt="Login Illustration" className='w-52' />
                    <div className='my-6 text-center'>
                        <h2 className='text-2xl font-bold tracking-widest'>Login</h2>
                        <span className='text-gray-500'>Enter your credentials to continue.</span>
                    </div>
                    <LoginForm setLoginSuccess={setLoginSuccess} />
                </> :
                <>
                    <Image src={LoginIllu} alt="Login Illustration" className='w-52 scale-in-center' />
                    <div className='mt-8 text-center fade-in '>
                        <Loaders size='xl' variant='primary' />
                    </div>
                </>
            }

        </div>
    )
}

export default LoginPage