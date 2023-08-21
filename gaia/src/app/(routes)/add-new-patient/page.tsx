import PatientForm from '@/components/views/dashboard/PatientForm/PatientForm'
import React from 'react'

const page = () => {
    return (
        <div className='flex flex-col gap-6 w-full h-full'>
            <div className='flex justify-between items-center'>
                <h2 className='text-xl font-semibold flex gap-1 items-center'>
                    Patient Form
                </h2>
            </div>
            <PatientForm />
        </div>

    )
}

export default page