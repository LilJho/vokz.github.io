"use client"

import { ApexOptions } from 'apexcharts';
import dynamic from 'next/dynamic'
// import Chart from "react-apexcharts"
const Chart = dynamic(() => import('react-apexcharts'), { ssr: true });

interface IApexChartProps {
    options: ApexOptions
    series: any[]
    height?: string
    type: "area" | "line" | "bar" | "pie" | "donut" | "radialBar" | "scatter" | "bubble" | "heatmap" | "candlestick" | "boxPlot" | "radar" | "polarArea" | "rangeBar" | "rangeArea" | "treemap" | undefined
}

const ApexChart = ({ options, series, height, type }: IApexChartProps) => {
    return (
        <Chart options={options} series={series} height={height} type={type} />
    )
}

export default ApexChart
