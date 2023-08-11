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
        <div className='flex flex-col gap-6'>
            <div className='flex justify-between items-center'>
                <h2 className='text-xl font-semibold'>Patients Profile</h2>
                <SubmitReport />
            </div>
            <PatientStatus />
            <div className='flex flex-col xl:flex-row gap-8'>
                <PatientsProfile />
                <PatientsRecord data={PatientData} />
            </div>
        </div>
    )
}

export default PatientsPage