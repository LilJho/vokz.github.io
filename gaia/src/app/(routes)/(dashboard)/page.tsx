import PatientsOverview from '@/components/views/dashboard/PatientsOverview'
import React from 'react'
import { PatientsActivityService } from '@/services/databaseServices'

const DashboardPage = async () => {
    const data = await PatientsActivityService.getAll()
    return (
        <PatientsOverview data={data} />
    )
}

export default DashboardPage