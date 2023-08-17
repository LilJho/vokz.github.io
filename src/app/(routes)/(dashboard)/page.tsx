import PatientsOverview from '@/components/views/dashboard/PatientsOverview'
import React from 'react'
import { PatientsActivityService } from '@/services/databaseServices'
import DataVisuals from '@/components/views/dashboard/DataVisuals/DataVisuals'


const DashboardPage = async () => {
    const data = await PatientsActivityService.getAll()

    return (
        <>
            <DataVisuals />
            <PatientsOverview data={data} />
        </>
    )
}

export default DashboardPage