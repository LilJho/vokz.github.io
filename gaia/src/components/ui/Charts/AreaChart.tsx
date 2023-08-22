"use client"

import React from 'react'
import ApexChart from '../ApexChart';
import { ApexOptions } from 'apexcharts';

const AreaChart = ({ data, title, height, type }: any) => {
    const series = data?.data
    // console.log('please',data?.data);

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
    return (
        <div className='p-4 bg-white rounded-md'>
            <div className="col-2">
                <h2 className='text-lg font-semibold'>{title}</h2>
            </div>
            <div className="col-2">
                <div className="btn-group" role="group" aria-label="Basic example">
                    <button type="button" className="btn btn-outline-success">Left</button>
                    <button type="button" className="btn btn-outline-success">Middle</button>
                    <button type="button" className="btn btn-outline-success">Right</button>
                </div>
            </div>
            <ApexChart height={height} options={options} series={series} type={type} />
        </div>
    )
}

export default AreaChart