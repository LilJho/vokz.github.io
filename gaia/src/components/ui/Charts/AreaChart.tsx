"use client"

import React from 'react'
import ApexChart from '../ApexChart';
import { ApexOptions } from 'apexcharts';

const AreaChart = ({ data, title, height }: any) => {
    const series = data?.data

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
        colors: data?.colors,
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
            categories: data?.categories,
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
            <h2 className='text-lg font-semibold'>{title}</h2>
            <ApexChart height={height} options={options} series={series} type="area" />
        </div>
    )
}

export default AreaChart