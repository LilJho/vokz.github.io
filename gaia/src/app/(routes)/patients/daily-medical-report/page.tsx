import OCRComponent from '@/components/ui/OCR'
import TextExtract from '@/components/views/patients/Record/TextExtract'
import Link from 'next/link'
import React from 'react'
import { FiChevronRight } from 'react-icons/fi'

const page = () => {
    return (
        <div className='flex flex-col gap-6'>
            <div className='flex justify-between items-center'>
                <h2 className='text-xl font-semibold flex gap-1 items-center'>
                    <Link href="/patients">Patients Profile</Link> <FiChevronRight /> <span className='text-primary-600'>Daily Medical Report</span>
                </h2>
            </div>
            {/* <OCRComponent /> */}
            <TextExtract />
        </div>
    )
}

export default page