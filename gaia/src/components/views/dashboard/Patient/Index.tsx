import React from 'react'
import PatientStatus from './components/PatientStatus'

const Index = async () => {


    return (
        <div className='flex flex-col gap-4 bg-white p-6 rounded-lg h-full'>
            <h3 className="text-xl font-semibold">Daily Patients Status</h3>
            <PatientStatus/>
        </div>
    )
}

export default Index