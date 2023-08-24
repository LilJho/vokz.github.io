"use client"

import React from 'react'
import ApexChart from '../ApexChart';
import { ApexOptions } from 'apexcharts';
import GroupButton from "@/components/ui/GroupButton";

interface ChildProps {
    sendDataToParent: (data: string) => void;
}

const AreaChart: React.FC<ChildProps> = ({ data, title, height, type, sendDataToParent  }: any) => {
    const series = data?.data
    // console.log('please',data?.data);

    var options: ApexOptions = {
        chart: {
            toolbar: {
                show: false
            },
            stacked: false,
            events: {
                selection: function (chart, e) {
                    console.log(new Date(e.xaxis.min))
                }
            },
        },
        colors: data?.colors,
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth',

            width: [4, 4]
        },
        fill: {
            type: 'solid',
        },
        legend: {
            position: 'top',
            horizontalAlign: 'left'
        },
        xaxis: {
            categories: data?.categories,
        },
        yaxis: {
            labels: {
                show: true
            }
        },
        tooltip: {
            theme: 'dark',
        }
    };

    //Group Button Sample
    const groupButtonData = [
        {
        label: "Daily",
        onClick: () => sendDataToParent('days'),
        },
        {
        label: "Weekly",
        onClick: () => sendDataToParent('week'),
        },
        {
        label: "Monthly",
        onClick: () => sendDataToParent('month'),
        },
    ];

    return (
        <div className='p-4 bg-white rounded-md'>
            <div className="grid grid-cols-4 gap-0">
                <div className="h-10 col-span-3 "><h2 className='text-lg font-semibold col-2'>{title}</h2></div>
                <div className="h-10 "><GroupButton data={groupButtonData} /></div>
            </div>
            <ApexChart height={height} options={options} series={series} type={type} />
        </div>
    )
}

export default AreaChart