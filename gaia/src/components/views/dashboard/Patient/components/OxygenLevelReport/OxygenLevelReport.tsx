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
            const diagnosis = await supabase.from('daily_activities').select('summary_data').eq('created_at', paramDate).eq('patient_id', user?.uuid);
            return diagnosis;
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }
    };

    function generateDateLabels(interval: 'day' | 'week' | 'month' | 'days' = 'day'): [string[], string[]] {
        const currentDate: Date = new Date();
        const dateLabels: string[] = [];
        const dateValues: string[] = [];
    
        switch (interval) {
            case 'week':
                const currentDayOfWeek: number = currentDate.getDay(); // 0 for Sunday, 1 for Monday, etc.
                const daysUntilMonday: number = (7 - currentDayOfWeek + 1) % 7;
                const startOfWeek: Date = new Date(currentDate);
                startOfWeek.setDate(currentDate.getDate() + daysUntilMonday);
    
                for (let iWeek: number = 0; iWeek < 7; iWeek++) {
                    const nextDate: Date = new Date(startOfWeek);
                    nextDate.setDate(startOfWeek.getDate() + iWeek);
                    dateLabels.push(nextDate.toISOString().split('T')[0]);
                    dateValues.push(nextDate.toISOString().split('T')[0]);
                }
                break;
            case 'month':
                for (let iMonth: number = 0; iMonth < 12; iMonth++) { // Generate labels for 12 months starting from January
                    const nextMonth: Date = new Date(currentDate);
                    nextMonth.setMonth(iMonth);
                    const monthName: string = nextMonth.toLocaleString('default', { month: 'long' });
                    dateLabels.push(monthName);
                    dateValues.push(nextMonth.toISOString().split('T')[0]);
                }
                break;
            case 'days':
            default:
                const currentDay: number = currentDate.getDay(); // 0 for Sunday, 1 for Monday, etc.
                const daysUntilSunday: number = (7 - currentDay) % 7;
                const startOfWeekDays: Date = new Date(currentDate);
                startOfWeekDays.setDate(currentDate.getDate() - currentDay);
    
                for (let iDays: number = 0; iDays < 7; iDays++) {
                    const nextDate: Date = new Date(startOfWeekDays);
                    nextDate.setDate(startOfWeekDays.getDate() + iDays);
                    dateLabels.push(nextDate.toISOString().split('T')[0]);
                    dateValues.push(nextDate.toISOString().split('T')[0]);
                }
                break;
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
            type: "area",
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
