"use client"

import { Button } from '@/components/ui/button'
import HeadlessDialog from '@/components/ui/modal/HeadlessDialog'
import useToggle from '@/hooks/useToggle'
import React from 'react'
import DRMIllu from '@public/images/dmr.svg'
import CGMIllu from '@public/images/cgm.svg'
import Ringllu from '@public/images/02ring.svg'
import BMIllu from '@public/images/bmi.svg'
import Image from 'next/image'
import { HiX } from 'react-icons/hi'
import Link from 'next/link'

const SubmitReport = () => {
    const [isOpen, toggle] = useToggle()
    return (
        <HeadlessDialog
            isOpen={isOpen}
            toggle={toggle}
            titleColor="text-primary-600"
            maxWidth="max-w-4xl"
            trigger={
                <Button className='ml-auto' onClick={toggle}>Submit Report</Button>
            }>
            <Button className='absolute top-4 right-4 z-10' variant="unstyled" size="square" onClick={toggle}>
                <HiX className="w-6 h-6 text-gray-400" />
            </Button>
            <div className='relative flex flex-col gap-10 items-center justify-center p-4'>
                <div className='text-center'>
                    <h2 className='text-2xl font-bold'>Submit Report</h2>
                    <p>Please select on what type of report you want to submit.</p>
                </div>
                <div className='w-full flex gap-4 flex-wrap'>
                    <ReportButton image={DRMIllu} type="dmr" href="daily-medical-report">
                        Daily Medical<br /> Report
                    </ReportButton>
                    <ReportButton image={CGMIllu} type="cgm" href="cgm-report">
                        Continuous glucose<br /> monitors (CGM)
                    </ReportButton>
                    <ReportButton image={Ringllu} type="ring" href="02-ring-report">
                        02 <br /> Ring
                    </ReportButton>
                    <ReportButton image={BMIllu} type="bmi" href="bmi-report">
                        Body mass <br />index (BMI)
                    </ReportButton>
                </div>

            </div>

        </HeadlessDialog >
    )
}

export default SubmitReport

interface IReportButton {
    children: React.ReactNode
    image: string
    type: "dmr" | "cgm" | "ring" | "bmi"
    href: string
}
const ReportButton = ({ children, image, type, href }: IReportButton) => {
    const hover = {
        "dmr": "hover:border-amber-600 hover:text-amber-600",
        "cgm": "hover:border-red-600 hover:text-red-600",
        "ring": "hover:border-green-600 hover:text-green-600",
        "bmi": "hover:border-violet-600 hover:text-violet-600",
    }
    return (
        <Link href={`/patients/${href}`} className='flex-1'>
            <button className={`w-full transition-all flex flex-col items-center justify-center gap-2 border rounded-md p-4 active:scale-95 ${hover[type]}`}>
                <Image src={image} alt="Illustration" className='w-32' />
                <span className='leading-5 font-medium text-inherit'>
                    {children}
                </span>
            </button>
        </Link>
    )
}