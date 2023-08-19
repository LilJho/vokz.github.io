"use client"

import React, { useEffect, useState } from 'react'
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
import userStore from '@/lib/store/userStore'
import { UserDataType } from '@/lib/types'

interface IUserProfileProps {
    data: UserDataType
}

const UserProfile = ({ data }: IUserProfileProps) => {
    // const user = userStore((state) => state.user)

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
                        <span className='text-sm font-medium'>{`${data?.first_name} ${data?.last_name}`}</span>
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