"use client"

import { Button } from '@/components/ui/button'
import HeadlessDialog from '@/components/ui/modal/HeadlessDialog'
import useToggle from '@/hooks/useToggle'
import React from 'react'
import DRMIllu from '@public/images/dmr.svg'
import CGMIllu from '@public/images/cgm.svg'
import Ringllu from '@public/images/02ring.svg'
import BMIllu from '@public/images/bmi.svg'
import MRIllu from "@public/images/mr.svg"
import Nutritionllu from "@public/images/nutrition.svg"
import Painllu from "@public/images/pain.svg"
import Mindfulnessllu from "@public/images/mind.svg"
import Image from 'next/image'
import { HiX } from 'react-icons/hi'
import Link from 'next/link'
import { useUserStore } from '@/lib/store/userStore';

const SubmitReport = () => {
    const [isOpen, toggle] = useToggle()
    const user = useUserStore(state => state.user)
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
            <div className='relative flex flex-col gap-10 items-center justify-center'>
                <div className='text-center'>
                    <h2 className='text-2xl font-bold'>Submit Report</h2>
                    <p>Please select on what type of report you want to submit.</p>
                </div>
                <div className='w-full grid grid-cols-2 md:flex gap-4 flex-wrap'>
                    <ReportButton image={Ringllu} type="ring" href="02-ring-report">
                        O2 <br /> Ring
                    </ReportButton>
                    <ReportButton image={BMIllu} type="bmi" href="bmi-report">
                        Body <br />Composition Scale
                    </ReportButton>
                    <ReportButton image={CGMIllu} type="cgm" href="cgm-report">
                        Continuous Glucose <br /> monitors (CGM)
                    </ReportButton>
                    <ReportButton image={DRMIllu} type="dmr" href="dashboard-watch-report">
                        Dashboard <br /> (Watch)
                    </ReportButton>
                    {user?.role === "admin" && <>
                        <ReportButton image={MRIllu} type="mr" href="02-ring-report">
                            Medical <br /> Record
                        </ReportButton>
                        <ReportButton image={Nutritionllu} type="nutrition" href="bmi-report">
                            Nutrition
                        </ReportButton>
                        <ReportButton image={Painllu} type="pain" href="cgm-report">
                            <span className='text-sm'>Pain Management, <br /> Strength & Conditioning</span>
                        </ReportButton>
                        <ReportButton image={Mindfulnessllu} type="mindfulness" href="dashboard-watch-report">
                            Mindfulness
                        </ReportButton>
                    </>}

                </div>

            </div>
        </HeadlessDialog >
    )
}

export default SubmitReport

interface IReportButton {
    children: React.ReactNode
    image: string
    type: "dmr" | "cgm" | "ring" | "bmi" | "mr" | "nutrition" | "pain" | "mindfulness"
    href: string
}
const ReportButton = ({ children, image, type, href }: IReportButton) => {
    const hover = {
        "dmr": "hover:border-amber-600 hover:text-amber-600",
        "cgm": "hover:border-red-600 hover:text-red-600",
        "ring": "hover:border-green-600 hover:text-green-600",
        "bmi": "hover:border-violet-600 hover:text-violet-600",
        "mr": "hover:border-blue-600 hover:text-blue-600",
        "nutrition": "hover:border-[#F780AE] hover:text-[#F780AE] ",
        "pain": "hover:border-[#DD7328] hover:text-[#DD7328] ",
        "mindfulness": "hover:border-[#97CE1C] hover:text-[#97CE1C] ",
    }
    return (
        <Link href={`/patients/${href}`} className='flex-1'>
            <button className={`min-w-[195px] min-h-[210px] h-full w-full transition-all flex flex-col items-center justify-center gap-2 border rounded-md p-4 active:scale-95 ${hover[type]}`}>
                <Image src={image} alt="Illustration" className='w-32 select-none user-select-none pointer-events-none' />
                <div className='leading-5 font-medium text-inherit my-auto'>
                    {children}
                </div>
            </button>
        </Link>
    )
}