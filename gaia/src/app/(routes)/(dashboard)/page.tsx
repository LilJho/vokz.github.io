import PatientsOverview from '@/components/views/samples/table/PatientsOverview'
import React from 'react'
import Parent from "@/components/views/dashboard/PatientParent";
import { Button } from '@/components/ui/button';
import { RiAddLine } from 'react-icons/ri';
import Link from 'next/link';

const DashboardPage = async () => {
    return (
        // <PatientsOverview data={data} />
        <div className='flex flex-col gap-4'>
            <Link href="/new-patient-form" className='ml-auto'>
                <Button>
                    <RiAddLine className="mr-2 w-5 h-5" />
                    Add New Patient
                </Button>
            </Link>
            <Parent />
        </div>
    )
}

export default DashboardPage