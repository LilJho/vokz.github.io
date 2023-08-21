import userStore from '@/lib/store/userStore'
import React from 'react'

const PatientsInfo = () => {
    const user = userStore((state) => state.user)

    return (
        <div className='mt-2'>
            <h2 className='text-2xl font-semibold'>
                {`${user?.first_name} ${user?.last_name}`}
            </h2>
            <span className='text-sm text-gray-500'>Lipa, Batangas</span>
        </div>
    )
}

export default PatientsInfo