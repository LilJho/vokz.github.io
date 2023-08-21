import BreadcrumbsLayout from '@/components/layout/BreadcrumbsLayout'
import PatientForm from '@/components/views/dashboard/PatientForm/PatientForm'
import React from 'react'

const page = () => {
    return (
        <BreadcrumbsLayout href="/" parentPageTitle='Dashboard' currentPageTitle='New Patient Form'>
            <PatientForm />
        </BreadcrumbsLayout>
    )
}

export default page

