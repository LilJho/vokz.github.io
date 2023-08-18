"use client"

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'
import { BiMessageRoundedDetail } from 'react-icons/bi'
import { useUserStore } from '@/lib/store/userStore'
import { useEffect } from 'react';

const PatientsProfile = () => {
  const user = useUserStore((state) => state.user);

    useEffect(() => {
        console.log(user);
    }, []); 

  
  return (
    <div className='p-6 border rounded-lg min-w-[400px] bg-white'>
      <div className="flex flex-col items-center text-center">
        <Avatar className='w-28 h-28 rounded-full border-4 border-primary-600'>
          <AvatarImage src="images/avatar-2.png" alt="User Avatar" />
          <AvatarFallback>
            <Skeleton className='w-28 h-28 rounded-full' />
          </AvatarFallback>
        </Avatar>
        <div className='mt-2'>
          <h2 className='text-2xl font-semibold'>{user?.first_name && user?.last_name
                            ? `${user.first_name} ${user.last_name}`
                            : 'Loading...'}</h2>
          <span className='text-sm text-gray-500'>Lipa, Batangas</span>
        </div>
        <Button className='gap-2 items-center mt-4'>
          <BiMessageRoundedDetail className="w-5 h-5" />
          Viber
        </Button>
      </div>
      <Separator className='my-6' />
      <div className='flex flex-col divide-y'>
        <div className='flex items-center justify-between px-4 py-2'>
          <h6 className='font-semibold'>Age</h6>
          <span className='text-sm'>56</span>
        </div>
        <div className='flex items-center justify-between  px-4 py-2'>
          <h6 className='font-semibold'>Gender</h6>
          <span className='text-sm'>Female</span>
        </div>
        <div className='flex items-center justify-between  px-4 py-2'>
          <h6 className='font-semibold'>Height</h6>
          <span className='text-sm'>140cm</span>
        </div>
        <div className='flex items-center justify-between  px-4 py-2'>
          <h6 className='font-semibold'>Weight</h6>
          <span className='text-sm'>110lbs</span>
        </div>
      </div>
    </div>
  )
}

export default PatientsProfile