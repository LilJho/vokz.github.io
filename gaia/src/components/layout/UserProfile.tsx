import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Skeleton } from '@/components/ui/skeleton'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/FormControls/dropdown-menu"
import { LuLogOut, LuSettings, LuUser } from 'react-icons/lu'
import Logout from '../views/auth/Logout'

const UserProfile = () => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild className="outline-none">
                <button className='flex items-center gap-2 px-4 border-x outline-none'>
                    <Avatar className='w-11 h-11 rounded-full border-4 border-white'>
                        <AvatarImage src="images/avatar-1.png" alt="User Avatar" />
                        <AvatarFallback>
                            <Skeleton className='w-11 h-11 rounded-full' />
                        </AvatarFallback>
                    </Avatar>
                    <div className='flex flex-col items-start'>
                        <h4 className='text-sm font-medium'>John Doe</h4>
                        <span className='text-xs text-gray-600'>Doctor</span>
                    </div>
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='min-w-[12rem]'>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <LuUser className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <LuSettings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <Logout>
                        <LuLogOut className="mr-2 h-4 w-4" />
                        <span>Log out</span>
                    </Logout>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>

    )
}

export default UserProfile