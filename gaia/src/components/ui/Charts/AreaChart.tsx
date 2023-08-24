"use client"

import React from 'react'
import ApexChart from '../ApexChart';
import { ApexOptions } from 'apexcharts';
import GroupButton from "@/components/ui/GroupButton";

const AreaChart = ({ data, title, height, type }: any) => {
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
        onClick: () => console.log("1"),
        },
        {
        label: "Weekly",
        onClick: () => console.log("2"),
        },
        {
        label: "Monthly",
        onClick: () => console.log("3"),
        },
    ];

    return (
        <div className='p-4 bg-white rounded-md'>
            <div className="col-1">
                <h2 className='text-lg font-semibold col-2'>{title}</h2>
                <GroupButton data={groupButtonData} className='col-2'/>
            </div>
            <ApexChart height={height} options={options} series={series} type={type} />
        </div>
    )
}

export default AreaChart