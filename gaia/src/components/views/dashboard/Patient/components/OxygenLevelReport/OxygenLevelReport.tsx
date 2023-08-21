import React, { useEffect, useState } from "react";
import AreaChart from "@/components/ui/Charts/AreaChart";
import userStore from '@/lib/store/userStore'
import { supabase } from "@/services/supabaseConfig";
import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";

const OxygenLevelReport: React.FC = () => {
    const user = userStore((state) => state.user);

    const fetchSummary = async (paramDate: any) => {
        try {
            const diagnosis = await supabase.from('daily_activities').select('summary_data').eq('created_at', paramDate);
            return diagnosis;
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }
    };

    function generateDateLabels(interval = 'day') {
        const currentDate = new Date();
        const dateLabels = [];
        const dateValues = [];

        switch (interval) {
            case 'day':
                for (let i = 0; i < 7; i++) {
                    const nextDate = new Date(currentDate);
                    nextDate.setDate(currentDate.getDate() + i);
                    dateLabels.push(nextDate.toISOString().split('T')[0]);
                    dateValues.push(nextDate.toISOString().split('T')[0]);
                }
                break;
            case '5days':
                for (let i = 0; i < 7; i += 5) {
                    const nextDate = new Date(currentDate);
                    nextDate.setDate(currentDate.getDate() + i);
                    dateLabels.push(nextDate.toISOString().split('T')[0]);
                    dateValues.push(nextDate.toISOString().split('T')[0]);
                }
                break;
            case 'week':
                for (let i = 0; i < 7; i++) {
                    const nextDate = new Date(currentDate);
                    nextDate.setDate(currentDate.getDate() + i * 7);
                    dateLabels.push(nextDate.toISOString().split('T')[0]);
                    dateValues.push(nextDate.toISOString().split('T')[0]);
                }
                break;
            case 'month':
                for (let i = 0; i < 7; i++) {
                    const nextMonth = new Date(currentDate);
                    nextMonth.setMonth(currentDate.getMonth() + i);
                    const monthName = nextMonth.toLocaleString('default', { month: 'long' });
                    dateLabels.push(monthName);
                    dateValues.push(nextMonth.toISOString().split('T')[0]);
                }
                break;
            default:
                for (let i = 0; i < 7; i++) {
                    const nextDate = new Date(currentDate);
                    nextDate.setDate(currentDate.getDate() + i);
                    dateLabels.push(nextDate.toISOString().split('T')[0]);
                    dateValues.push(nextDate.toISOString().split('T')[0]);
                }
        }

        return [dateLabels, dateValues];
    }

    const [dateLabels, dateValues] = generateDateLabels('day');
    const [stepsValues, setStepsValues] = useState<string[]>([]);
    const [sleepValues, setSleepValues] = useState<string[]>([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const fetchPromises = dateValues.map(async (key) => {
                    try {
                        const result = await fetchSummary(key);
                        if (result.data && result.data.length > 0) {
                            const firstItem = result.data[0];
                            const summaryData = firstItem.summary_data;
                            setStepsValues((prevStepsValues) => [...prevStepsValues, summaryData[0]]);
                            setSleepValues((prevSleepValues) => [...prevSleepValues, summaryData[1]]);
                        }
                    } catch (error) {
                        console.error('Error fetching data for', key, ':', error);
                        throw error;
                    }
                });

                await Promise.all(fetchPromises);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        fetchData();
    }, []);

    const AreaChartData = {
        categories: dateLabels,
        showForNullSeries: false,
        showForZeroSeries: false,
        chart: {
            height: 350,
            type: "line",
            stacked: false
          },
        data: [
          {
            name: "Oxygen Level",
            data: stepsValues,
          },
          {
            name: "Pulse Rate",
            data: sleepValues,
          },
          {
            name: "O2 Score",
            data: sleepValues,
          },
        ],
        colors: ["#008FFB","#f54254", "#00E396"],
        plotOptions: {
            bar: {
                columnWidth: "20%"
            }
        }
      };

    return (
        <>
            <AreaChart data={AreaChartData} title={"Oxygen Level Report"} height={"300px"}  />
        </>
    )
}

export default OxygenLevelReport;
