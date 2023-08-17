"use client"

import { Icons, Route, routesConfig } from '@/config/routes'
import NavLink from '../ui/NavLink'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Logo from "@public/logo/336542859_6188938304506789_4686558191944695789_n.png"
import { RiCloseLine } from 'react-icons/ri'
import useToggleSidebar from '@/lib/store/useToggleSidebar'
import { useUserStore } from '@/lib/store/userStore'

const Navigations = () => {
    const [isToggled, toggle] = useToggleSidebar((state) => [
        state.isToggled,
        state.toggle,
    ]);
    const user = useUserStore((state) => state.user)

    return (
        <>
            <div
                className={`fixed top-0 bottom-0 left-0 right-0 bg-black bg-opacity-50 z-30 ${isToggled ? 'opacity-100 visible' : 'opacity-0 invisible'}
                transition-opacity transition-visibility duration-200`}
                onClick={toggle}
            ></div>
            <div className={`fixed top-0 bottom-0 ${isToggled ? "left-0 z-[99]" : "-left-96 z-10"} lg:left-0 w-[320px] bg-gradient-to-tr from-[#010A13] via-[#225F3E] to-[#70A45C] transition-all`}>
                <Button variant="unstyled" size="text" className='block lg:hidden absolute right-3 top-3 text-white' onClick={toggle}><RiCloseLine className="w-7 h-7" /></Button>
                <div className='flex flex-col items-center justify-between gap-4 py-8 px-4'>
                    <Image src={Logo} alt="Company Logo" className='w-44 logo-icon-invert' />
                </div>
                <div className='py-4'>
                    <ul className='flex flex-col'>
                        {(routesConfig as any).routes?.[user?.role ?? "patient"].map((route: any) => {
                            const Icon = Icons[route.icon ?? ""]
                            return (
                                <NavLink key={route.href} href={route.href} icon={<Icon className="w-5 h-5" />}>
                                    {route.title}
                                </NavLink>
                            )
                        })}
                    </ul>
                </div>
            </div>
        </>
    )
}

export default Navigations