import { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";
// import Chart from "react-apexcharts"
const Chart = dynamic(() => import("react-apexcharts"), { ssr: true });

interface IStatusCardProps {
  title: string;
  description: string;
  value: string;
  icon: React.ReactNode | any;
  backgroundColor: string;
  records: number[] | any;
  chart: string | any;
}

const StatusCard = ({
  title,
  description,
  value,
  icon,
  backgroundColor,
  records,
  chart,
}: IStatusCardProps) => {

  const chartData: ApexOptions = {
    chart: {
      id: "basic-area",
      type: chart,
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
      sparkline: {
        enabled: true,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      width: [4, 4],
      // curve: "smooth",
    },
    xaxis: { 
      labels: {
        show: true,
      },
      categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
    },
    yaxis: {
      show: false,
      min: Math.min(...records),
      max: Math.max(...records) * 1.1,
    },
    grid: {
      show: false,
    },
    tooltip: {
      x: {
        show: false,
      },
      y: {
        formatter: function (value: any) {
          return value;
        },
      },
      marker: {
        show: false,
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "light",
        type: "vertical",
        shadeIntensity: 0.5,
        gradientToColors: ["#fff", backgroundColor],
        inverseColors: true,
        opacityFrom: 0.7,
        opacityTo: 0.2,
        stops: [0, 100],
      },
    },
    colors: ["#fff"],
  };

  const series = [
    {
      name: "",
      data: records,
    },
  ];
 
  return (
    <div className={`card  flex-1 rounded-lg ${backgroundColor}`}>
      <div className="flex items-center justify-between p-4 text-white">
        <div className="flex flex-col">
          <h5 className="text-2xl font-semibold">{title}</h5>
          <span className="text-sm font-medium">{description}</span>
          <h5 className="text-xl font-semibold">{value}</h5>
        </div>
        {icon}
      </div>
      <div className="h-[50px]">
        <Chart options={chartData} series={series} type={chart} height="50px" />
      </div>
    </div>
  )
};

export default StatusCard;
