"use client"

import React from 'react'
import ApexChart from '../ApexChart';
import { ApexOptions } from 'apexcharts';

const AreaChart = () => {
    const series = [
        {
            name: 'New Users',
            data: [31, 40, 28, 51, 42, 109, 100]
        },
        {
            name: 'Returing Users',
            data: [11, 32, 45, 32, 34, 52, 41]
        }
    ]

    var options: ApexOptions = {
        chart: {
            toolbar: {
                show: false
            },
            stacked: true,
            events: {
                selection: function (chart, e) {
                    console.log(new Date(e.xaxis.min))
                }
            },
        },
        colors: ['#008FFB', '#00E396'],
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth'
        },
        fill: {
            type: 'solid',
        },
        legend: {
            position: 'top',
            horizontalAlign: 'left'
        },
        xaxis: {
            categories: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        },
        yaxis: {
            labels: {
                show: false
            }
        },
        tooltip: {
            theme: 'dark',
        }
    };
    return (
        <div className='p-4 bg-white rounded-md'>
            <h2 className='text-lg font-semibold'>Countries</h2>
            <ApexChart height='400px' options={options} series={series} type="area" />
        </div>
    )
}

export default AreaChart