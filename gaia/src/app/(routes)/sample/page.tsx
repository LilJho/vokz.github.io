import AreaChart from "@/components/ui/Charts/AreaChart";
import BasicBarChart from "@/components/ui/Charts/BasicBarChart";
import HorizontalBarchart from "@/components/ui/Charts/HorizontalBarchart";
import RadialCircleChart from "@/components/ui/Charts/RadialCircleChart";
import TimeLineChart from "@/components/ui/Charts/TimeLineChart";
import Loaders from "@/components/ui/Loaders";
import PDFViewer from "@/components/ui/PDFViewer";
import ReactToolTip from "@/components/ui/Tooltip/ReactToolTip";
import { Button } from "@/components/ui/button";
import React from "react";
import AlertSample from "@/components/views/samples/AlertSample";
import ProgressSample from "@/components/views/samples/ProgressSample";
import TabsSample from "@/components/views/samples/TabsSample";

const page = () => {
  const AreaChartData = {
    categories: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
    ],
    data: [
      {
        name: "New Users",
        data: [31, 40, 28, 51, 42, 109, 100],
      },
      {
        name: "Returing Users",
        data: [11, 32, 45, 32, 34, 52, 41],
      },
    ],
    colors: ["#008FFB", "#00E396"],
  };

  const HorizontalBarchartData = {
    categories: [
      "South Korea",
      "Canada",
      "United Kingdom",
      "Netherlands",
      "Italy",
      "France",
      "Japan",
      "United States",
      "China",
      "India",
    ],
    colors: [
      "#33b2df",
      "#546E7A",
      "#d4526e",
      "#13d8aa",
      "#A5978B",
      "#2b908f",
      "#f9a3a4",
      "#90ee7e",
      "#f48024",
      "#69d2e7",
    ],
    data: [
      {
        name: "Scores",
        data: [400, 430, 448, 470, 540, 580, 690, 1100, 1200, 1380], //Update this to change the data in the chart
      },
    ],
  };

  const BasicBarChartData = {
    data: [
      {
        name: "Exteral Cost",
        data: [400, 430, 448, 470, 540, 580, 690, 1100, 1200, 1380],
      },
      {
        name: "Internal Cost",
        data: [44, 55, 41, 64, 22, 43, 21, 448, 470, 540],
      },
    ],
    categories: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
    ],
    colors: ["#33b2df", "#546E7A", "#d4526e"],
  };

  const TimeLineChartData = {
    data: [
      {
        data: [
          {
            x: "Code",
            y: [
              new Date("2019-03-02").getTime(),
              new Date("2019-03-04").getTime(),
            ],
          },
          {
            x: "Test",
            y: [
              new Date("2019-03-04").getTime(),
              new Date("2019-03-08").getTime(),
            ],
          },
          {
            x: "Validation",
            y: [
              new Date("2019-03-08").getTime(),
              new Date("2019-03-12").getTime(),
            ],
          },
          {
            x: "Deployment",
            y: [
              new Date("2019-03-12").getTime(),
              new Date("2019-03-18").getTime(),
            ],
          },
        ],
      },
    ],
  };

  const RadialCircleChartData = {
    data: [70],
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="">
        <h4 className="mb-2 text-lg font-semibold">
          Horizontal Bar graph with labels and value inside
        </h4>
        <HorizontalBarchart
          data={HorizontalBarchartData}
          title="Horizontal Bar graph"
          height="300px"
        />
      </div>
      <div>
        <h4 className="mb-2 text-lg font-semibold">Area chart</h4>
        <AreaChart data={AreaChartData} title="Area Chart" height="300px" />
      </div>
      <div>
        <h4 className="mb-2 text-lg font-semibold">Basic Bar chart</h4>
        <BasicBarChart
          data={BasicBarChartData}
          title="Basic Cost"
          height="200px"
        />
      </div>
      <div>
        <h4 className="mb-2 text-lg font-semibold">Time Line chart</h4>
        <TimeLineChart
          data={TimeLineChartData}
          title="Time Line"
          height="200px"
        />
      </div>
      <div>
        <h4 className="mb-2 text-lg font-semibold">Time Line chart</h4>
        <RadialCircleChart
          data={RadialCircleChartData}
          title="Radial"
          height="200px"
        />
      </div>
      <div className="flex flex-col gap-4">
        <h4 className="mb-2 text-lg font-semibold">Loaders</h4>
        <div>
          <Loaders />
          <Loaders variant="success" />
          <Loaders variant="warning" />
          <Loaders variant="destructive" />
          <Loaders />
          <Loaders variant="success" type="ping" />
          <Loaders variant="warning" type="ping" />
          <Loaders variant="destructive" type="ping" />
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <h4 className="mb-2 text-lg font-semibold">Button</h4>
        <div className="flex gap-4">
          <Button>Hello</Button>
          <Button isLoading>loading</Button>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <h4 className="mb-2 text-lg font-semibold">ToolTip</h4>
        <div className="flex gap-10">
          <ReactToolTip
            side="left"
            trigger={<div className="p-2 bg-gray-500">help</div>}
            text="hello"
          />
          <ReactToolTip
            side="top"
            trigger={<div className="p-2 bg-gray-500">help</div>}
            text="hello"
          />
          <ReactToolTip
            side="right"
            trigger={<div className="p-2 bg-gray-500">help</div>}
            text="hello"
          />
        </div>
      </div>
      {/* <div className="flex flex-col gap-4">
                <h4 className='mb-2 text-lg font-semibold'>PDF Viewer</h4>
                <PDFViewer fileURL="/sample.pdf" />
            </div> */}
      <div className="flex flex-col gap-10">
        {/* <AlertSample />
        <ProgressSample /> */}
        <TabsSample />
      </div>
    </div>
  );
};

export default page;