"use client"

import NavLink from '@/components/ui/NavLink'
import Image from 'next/image'
import Logo from "@public/logo/gaia_logo.png"
import LogoOnly from "@public/logo/logo_only.png"
import { Button } from '../ui/button'
import useToggleSidebar from '@/lib/store/useToggleSidebar'
import { HiOutlineX } from 'react-icons/hi'
import { HiOutlineUserGroup } from "react-icons/hi2";
import { FiLayers } from "react-icons/fi";
import { RiProfileLine, RiDashboardLine, RiArrowLeftLine, RiUserHeartLine } from 'react-icons/ri'
import { UserDataType } from '@/lib/types'
import useToggle from '@/hooks/useToggle'
import useMinimized from '@/lib/store/useMinimized'

interface INavigationProps {
    data: UserDataType
}

const Navigation = ({ data }: INavigationProps) => {
    const [isToggled, toggle] = useToggleSidebar((state) => [state.isToggled, state.toggle])
    const [isMinimized, minimize] = useMinimized((state) => [state.isMinimized, state.minimize])

    const showNavigationLink = data?.role === "admin" ?
        <NavLink href="/patients" icon={<HiOutlineUserGroup className="w-5 h-5" />}>
            <span className={`${isMinimized ? "lg:group-hover:block lg:hidden" : "block"}`}>Patients</span>
        </NavLink> : <NavLink href="/patients" icon={<RiProfileLine className="w-5 h-5" />}>
            <span className={`${isMinimized ? "lg:group-hover:block lg:hidden" : "block"}`}>My Profile</span>
        </NavLink>

    return (
        <>
            {isToggled && <div className="fixed inset-0 backdrop-blur bg-gray-400/30 z-40" onClick={toggle}></div>}

            <div className={`group ${isMinimized ? "w-[320px] lg:w-[56px] lg:hover:w-[320px] lg:z-50" : "w-[320px]"} bg-gradient-to-tr from-[#020D14] via-[#245F3E] to-[#B9D470] fixed top-0 bottom-0 ${isToggled ? "left-0 z-50 shadow-lg" : "-left-96"} z-40 lg:z-10 lg:left-0 transition-all`} style={{ willChange: 'transform' }}>

                <Button variant="unstyled" size="square" className={`hidden ${isMinimized ? "group-hover:lg:block lg:hiddenfade-in-30" : "lg:block"} absolute top-4 right-4 hover:bg-gray-200/30`} onClick={minimize}>
                    <RiArrowLeftLine className="w-6 h-6  text-white" />
                </Button>

                <Button variant="unstyled" size="square" className='block lg:hidden absolute top-4 right-4 hover:bg-gray-200/30' onClick={toggle}>
                    <HiOutlineX className="w-6 h-6  text-white" />
                </Button>

                <div className={`flex items-center justify-center py-10 ${isMinimized ? "px-2" : "px-4"}`}>
                    <Image src={LogoOnly} alt="Company Logo" className={`${isMinimized ? "hidden group-hover:lg:hidden lg:block" : "hidden"} w-20 logo-icon-invert`} />
                    <Image src={Logo} alt="Company Logo" className={`${isMinimized ? "hidden lg:group-hover:block lg:group-hover:fade-in" : "block"} w-44 logo-icon-invert`} />
                </div>
                <div className='py-4 relative'>
                    <h6 className={`${isMinimized ? "group-hover:block hidden" : "block"} mb-1 font-medium ml-4 text-white text-sm`}>Navigation</h6>
                    <ul className='flex flex-col gap-1'>
                        <NavLink href="/" icon={<RiDashboardLine className="w-5 h-5" />}>
                            <span className={`${isMinimized ? "lg:group-hover:block lg:hidden" : "block"}`}>Dashboard</span>
                        </NavLink>
                        {showNavigationLink}
                        <NavLink href="/add-new-patient" icon={<RiUserHeartLine className="w-5 h-5" />}>
                            <span className={`${isMinimized ? "lg:group-hover:block lg:hidden" : "block"}`}>New Patient</span>
                        </NavLink>
                        <NavLink href="/sample" icon={<FiLayers className="w-5 h-5" />}>
                            <span className={`${isMinimized ? "lg:group-hover:block lg:hidden" : "block"}`}>Sample Page</span>
                        </NavLink>
                        <NavLink href="/pdf-viewer" icon={<FiLayers className="w-5 h-5" />}>
                            <span className={`${isMinimized ? "lg:group-hover:block lg:hidden" : "block"}`}>PDF Viewer</span>
                        </NavLink>
                        <NavLink href="/table-sample" icon={<FiLayers className="w-5 h-5" />}>
                            <span className={`${isMinimized ? "lg:group-hover:block lg:hidden" : "block"}`}>Table Sample</span>
                        </NavLink>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default Navigation
