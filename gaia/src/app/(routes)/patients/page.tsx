import PatientStatus from '@/components/views/patients/PatientStatus'
import PatientsProfile from '@/components/views/patients/PatientsProfile'
import PatientsRecord from '@/components/views/patients/PatientsRecord'
import React from 'react'
import PatientData from '@/data/patients_data.json'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import HeadlessDialog from '@/components/ui/modal/HeadlessDialog'
import SubmitReport from '@/components/views/patients/SubmitReport'

const PatientsPage = () => {
    return (
        <div className='flex flex-col gap-8'>
            <div className='flex justify-between items-center'>
                <h2 className='text-xl font-semibold'>Patients Profile</h2>
                <SubmitReport />
            </div>
            <div className='flex flex-col xl:flex-row gap-2'>
                <div className='flex flex-col xl:flex-row gap-8'>
                    <PatientsProfile />
                </div>
                <div className='flex flex-col xl:flex-col gap-2'>
                    <PatientStatus />
                    <PatientsRecord data={PatientData} />
                </div>
            </div>
        </div>
    )
}

export default PatientsPage