import { ApexOptions } from 'apexcharts';
// import Chart from "react-apexcharts"
import ApexChart from '@/components/ui/ApexChart';
import { BiRun } from 'react-icons/bi';
const Pedometer = () => {
    const series = [
        {
            name: "Steps",
            data: [38, 40, 72, 71, 99, 56, 44, 56]
        }
    ]
    const chartData: ApexOptions = ({
        chart: {
            id: "basic-area",
            toolbar: {
                show: false
            },
            zoom: {
                enabled: false
            },
            sparkline: {
                enabled: true
            },
        },
        // dataLabels: {
        //     enabled: false
        // },
        stroke: {
            curve: 'smooth',
        },
        xaxis: {
            labels: {
                show: false,
            }
        },
        grid: {
            show: false
        },
        tooltip: {
            x: {
                show: false
            },
            y: {
                formatter: function (value: any) {
                    return value;
                }
            },
            marker: {
                show: false
            }
        },
    })

    return (
        <div className={`min-[340px] flex-1 rounded-lg bg-blue-200`}>
            <div className='p-4 flex justify-between items-center text-white'>
                <div className='flex flex-col'>
                    <h5 className='text-2xl font-semibold'>Pedometer</h5>
                    <span className='text-sm font-medium'>Maximum Steps</span>
                    <h5 className='text-xl font-semibold'>936 Steps</h5>
                </div>
                <div className='octagon p-4 bo'>
                    <BiRun className="w-8 h-8" />
                </div>
            </div>
            <div className='h-[80px]'>
                <ApexChart
                    options={chartData}
                    series={series}
                    type="bar"
                    height="80px"
                />
            </div>
        </div>
    )
}

export default Pedometer