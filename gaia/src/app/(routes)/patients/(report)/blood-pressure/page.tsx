import BreadcrumbsLayout from '@/components/layout/BreadcrumbsLayout'
import BloodPressureForm from '@/components/views/patients/Forms/BloodPressureForm'
import React from 'react'

const page = () => {
    return (
        <BreadcrumbsLayout href="/patients/summary" parentPageTitle='Patients Profile' currentPageTitle='Blood Pressure Report'>
            <div className='flex justify-center mt-4 3xl:mt-24'>
                <BloodPressureForm />
            </div>
        </BreadcrumbsLayout>
    )
}

export default page