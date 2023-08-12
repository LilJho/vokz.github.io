"use client"

import React from 'react'
import StatusCard from './StatusCard'
import { BiRun } from 'react-icons/bi'
import { FiActivity, FiDroplet, FiThermometer } from 'react-icons/fi'

const PatientStatus = () => {
    const data = [
        {
            id: "1",
            title: "O2 Ring",
            description: "Maximum Steps",
            value: "867",
            records: [38, 40, 72, 71, 99, 56, 44, 56],
            icon: <BiRun className="w-8 h-8" />,
            backgroundColor: "bg-primary-600"
        },
        {
            id: "2",
            title: "Body Composition Scale",
            description: "Latest 01:05 PM",
            value: "73bmp",
            records: [91, 58, 30, 52, 59, 84, 92, 51],
            icon: <FiActivity className="w-8 h-8" />,
            backgroundColor: "bg-danger-600"
        },
        {
            id: "3",
            title: "CGM",
            description: "Latest",
            value: "92 mg/dL",
            records: [96, 47, 83, 40, 66, 31, 42, 68],
            icon: <FiDroplet className="w-8 h-8" />,
            backgroundColor: "bg-accent-600"
        },
        {
            id: "4",
            title: "Dashboard Watch",
            description: "Latest",
            value: "335.4°C",
            records: [96, 54, 55, 45, 77, 90, 87, 59],
            icon: <FiThermometer className="w-8 h-8" />,
            backgroundColor: "bg-warning-600"
        },
        {
            id: "1",
            title: "Medical Record",
            description: "Maximum Steps",
            value: "867",
            records: [38, 40, 72, 71, 99, 56, 44, 56],
            icon: <BiRun className="w-8 h-8" />,
            backgroundColor: "bg-primary-600"
        },
        {
            id: "2",
            title: "Nutrition",
            description: "Latest 01:05 PM",
            value: "73bmp",
            records: [91, 58, 30, 52, 59, 84, 92, 51],
            icon: <FiActivity className="w-8 h-8" />,
            backgroundColor: "bg-danger-600"
        },
        {
            id: "3",
            title: "Pain Management, strength and Conditioning",
            description: "Latest",
            value: "92 mg/dL",
            records: [96, 47, 83, 40, 66, 31, 42, 68],
            icon: <FiDroplet className="w-8 h-8" />,
            backgroundColor: "bg-accent-600"
        },
        {
            id: "4",
            title: "Mindfulness",
            description: "Latest",
            value: "335.4°C",
            records: [96, 54, 55, 45, 77, 90, 87, 59],
            icon: <FiThermometer className="w-8 h-8" />,
            backgroundColor: "bg-warning-600"
        },

    ];


    return (
        <div className='flex flex-col gap-4 bg-white p-6 border rounded-lg h-full'>
            <h3 className="text-xl font-semibold">Patients Status</h3>
            <div className='grid grid-cols-1 md:grid-cols-2 3xl:grid-cols-4 gap-4 '>
                {data?.map((val) => (
                    <StatusCard
                        key={val.id}
                        title={val.title}
                        description={val.description}
                        value={val.value}
                        icon={val.icon}
                        backgroundColor={val.backgroundColor}
                        records={val.records}
                    />
                ))}
            </div>
        </div>
    )
}

export default PatientStatus