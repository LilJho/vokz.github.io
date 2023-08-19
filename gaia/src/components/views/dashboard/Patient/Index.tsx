import React from 'react'
import PatientStatus from './components/PatientStatus'
import userStore from '@/lib/store/userStore'

const Index = () => {
    const user = userStore((state) => state.user)
    return (
        <div className='flex flex-col gap-4 bg-white p-6 rounded-lg h-full'>
            <h3 className="text-xl font-semibold">{user?.first_name} {user?.last_name}'s Daily Status</h3>
            <PatientStatus />
        </div>
    )
}

export default Index