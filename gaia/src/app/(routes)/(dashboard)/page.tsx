import PatientsOverview from '@/components/views/dashboard/PatientsOverview'
import React from 'react'
import { PatientsActivityService } from '@/services/databaseServices'
import Parent from "@/components/views/dashboard/PatientParent";

const DashboardPage = async () => {
    const data = await PatientsActivityService.getAll()
    return (
        // <PatientsOverview data={data} />
        <Parent />
    )
}

export default DashboardPage