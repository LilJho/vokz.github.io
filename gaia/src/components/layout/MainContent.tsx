"use client"
import { useEffect } from 'react'
import Header from './Header'
import userStore from '@/lib/store/userStore'
import { UserDataType } from '@/lib/types'

interface IMainContentProps {
    children: React.ReactNode
    data: UserDataType
}

const MainContent = ({ children, data }: IMainContentProps) => {
    useEffect(() => {
        userStore.setState({ user: data })
    }, [])

    return (
        <div className='lg:pl-[320px] flex flex-col h-full'>
            <Header data={data} />
            <div className='p-6'>
                {children}
            </div>
        </div>
    )
}

export default MainContent