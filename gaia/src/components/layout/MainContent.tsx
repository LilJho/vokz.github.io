"use client"
import { useEffect } from 'react'
import Header from './Header'
import userStore from '@/lib/store/userStore'
import { UserDataType } from '@/lib/types'
import useMinimized from '@/lib/store/useMinimized'

interface IMainContentProps {
    children: React.ReactNode
    data: UserDataType
}

const MainContent = ({ children, data }: IMainContentProps) => {
    const [isMinimized, minimize] = useMinimized((state) => [state.isMinimized, state.minimize])

    useEffect(() => {
        userStore.setState({ user: data })
    }, [])

    return (
        <div className={`${isMinimized ? "lg:pl-[56px]" : "lg:pl-[320px]"} flex flex-col h-full`}>
            <Header data={data} />
            <div className='p-6'>
                {children}
            </div>
        </div>
    )
}

export default MainContent