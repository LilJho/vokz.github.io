"use client"

import React, { useState } from 'react'
import EditPatientForm from '../../NewPatientForm/EditPatientForm'
import SwitchToggle from '@/components/ui/FormControls/SwitchToggle'
import { PatientInformationType, UserDataType } from '@/lib/types'
import useToggle from '@/hooks/useToggle'

interface PatientsFormTabProps {
    userData: UserDataType
    response: PatientInformationType
}

const PatientsFormTab = ({ userData, response }: PatientsFormTabProps) => {
    const [enabled, setEnabled] = useState(false)
    return (
        <div className='flex flex-col gap-4 items-end ml-auto'>
            <SwitchToggle enabled={enabled} setEnabled={setEnabled} className='mr-4' label={enabled ? "Disable Editing" : "Enable Editing"} />
            <EditPatientForm isPatient={userData.role === "patient"} defaultValue={response} readOnly={!enabled} />
        </div>
    )
}

export default PatientsFormTab