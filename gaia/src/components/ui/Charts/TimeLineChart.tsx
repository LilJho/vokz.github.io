"use client"

import React from 'react'
import ApexChart from '../ApexChart';
import { ApexOptions } from 'apexcharts';

const TimeLineChart = ({ data, title, height }: any) => {
    const series = data.data
    const options: ApexOptions = {
        chart: {
            toolbar: {
                show: false
            },
        },
        plotOptions: {
            bar: {
                horizontal: true
            }
        },
        xaxis: {
            type: 'datetime'
        }
    };
    return (
        <div className='p-4 bg-white rounded-md'>
            <h2 className='text-lg font-semibold'>{title}</h2>
            <ApexChart height={height} options={options} series={series} type="rangeBar" />
        </div>
    )
}

export default TimeLineChart