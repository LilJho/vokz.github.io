import PatientsOverview from '@/components/views/samples/table/PatientsOverview'
import { PatientsActivityService } from '@/services/databaseServices';
import React from 'react'

const page = async () => {
    const data = await PatientsActivityService.getAll();
    return (
        <PatientsOverview data={data} />
    )
}

export default page