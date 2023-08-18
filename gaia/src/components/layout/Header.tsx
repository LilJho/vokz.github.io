"use client"

import { BiBell, BiSearch } from 'react-icons/bi'
import { Button } from '@/components/ui/button'
import UserProfile from '@/components/layout/UserProfile'
import { FiMenu } from 'react-icons/fi'
import useToggleSidebar from '@/lib/store/useToggleSidebar'

const Header = () => {
    const [isToggled, toggle] = useToggleSidebar((state) => [state.isToggled, state.toggle])
    return (
        <div className='sticky top-0 h-16 bg-white py-2 px-6 flex items-center z-20 border-b'>
            <Button variant="unstyled" size="square" className='block lg:hidden mr-auto hover:bg-gray-200/30' onClick={toggle}>
                <FiMenu className="w-7 h-7" />
            </Button>
            <div className='hidden lg:flex items-center flex-1'>
                <BiSearch className="w-6 h-6" />
                <input type="text" placeholder="Search" className='w-full ml-4 bg-transparent outline-none' />
            </div>
            <div className='flex gap-4'>
                <Button size="square" variant="ghost">
                    <BiBell className='w-6 h-6' />
                </Button>
                <UserProfile />
            </div>
        </div>
    )
}

export default Header