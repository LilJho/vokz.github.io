"use client"

import NavLink from '@/components/ui/NavLink'
import Image from 'next/image'
import Logo from "@public/logo/gaia_logo.png"
import { Button } from '../ui/button'
import useToggleSidebar from '@/lib/store/useToggleSidebar'
import { HiOutlineX } from 'react-icons/hi'
import { useUserStore } from '@/lib/store/userStore'
import { HiOutlineUserGroup } from "react-icons/hi2";
import { FiLayers } from "react-icons/fi";
import { RiProfileLine, RiDashboardLine, RiArrowLeftLine } from 'react-icons/ri'

const Navigation = () => {
    const [isToggled, toggle] = useToggleSidebar((state) => [state.isToggled, state.toggle])
    const user = useUserStore((state) => state.user)
    const { role } = user!

    return (
        <>
            {isToggled && <div className="fixed inset-0 backdrop-blur bg-gray-400/30 z-40" onClick={toggle}></div>}
            <div className={`w-[320px] bg-gradient-to-tr from-[#020D14] via-[#245F3E] to-[#B9D470] fixed top-0 bottom-0 ${isToggled ? "left-0 z-50 shadow-lg" : "-left-96"} z-40 lg:z-10 lg:left-0 transition-all`}>
                <Button variant="unstyled" size="square" className='hidden lg:block absolute top-4 right-4 hover:bg-gray-200/30'>
                    <RiArrowLeftLine className="w-6 h-6  text-white" />
                </Button>
                <Button variant="unstyled" size="square" className='block lg:hidden absolute top-4 right-4 hover:bg-gray-200/30' onClick={toggle}>
                    <HiOutlineX className="w-6 h-6  text-white" />
                </Button>
                <div className='flex items-center justify-center py-10 px-4'>
                    <Image src={Logo} alt="Company Logo" className='w-44 logo-icon-invert' />
                </div>
                <div className='py-4 relative'>
                    <h6 className='mb-1 font-medium ml-4 text-white text-sm'>Navigation</h6>
                    <ul className='flex flex-col gap-1'>
                        <NavLink href="/" icon={<RiDashboardLine className="w-5 h-5" />}>
                            Dashboard
                        </NavLink>
                        {role === "admin" && <NavLink href="/patients" icon={<HiOutlineUserGroup className="w-5 h-5" />}>
                            Patients
                        </NavLink>}
                        {role === "patient" && <NavLink href="/patients" icon={<RiProfileLine className="w-5 h-5" />}>
                            My Profile
                        </NavLink>}
                        <NavLink href="/sample" icon={<FiLayers className="w-5 h-5" />}>
                            Sample Page
                        </NavLink>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default Navigation

