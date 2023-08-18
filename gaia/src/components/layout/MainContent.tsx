"use client"
import Header from './Header'

const MainContent = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className='lg:pl-[320px] flex flex-col h-full'>
            <Header />
            <div className='p-6'>
                {children}
            </div>
        </div>
    )
}

export default MainContent