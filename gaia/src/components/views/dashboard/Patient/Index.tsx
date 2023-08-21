import React, { useEffect, useState } from "react";
import PatientStatus from './components/PatientStatus'
import AreaChart from "@/components/ui/Charts/AreaChart";
import userStore from '@/lib/store/userStore'
import { DailyActivitiesService } from '@/services/databaseServices'
import { supabase } from "@/services/supabaseConfig";
import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";

//To prevent hydration error in nextjs when showing dynamic content in client side
const PatientsName = dynamic(() => import("./PatientsName"), { ssr: false, loading: () => <Skeleton className="w-80 h-7" /> });

const Index = () => {
    const user = userStore((state) => state.user);

    const fetchSummary = async (paramDate: any) => {
        try {
            console.log('param', paramDate);
            //   const diagnosis = await DailyActivitiesService.getOneWhere('created_at', paramDate, 'summary_data');
            const diagnosis = await supabase.from('daily_activities').select('summary_data').eq('created_at', paramDate);
            console.log('fetch', diagnosis);
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
                // Default to daily interval
                for (let i = 0; i < 7; i++) {
                    const nextDate = new Date(currentDate);
                    nextDate.setDate(currentDate.getDate() + i);
                    dateLabels.push(nextDate.toISOString().split('T')[0]);
                    dateValues.push(nextDate.toISOString().split('T')[0]);
                }
        }

        return [dateLabels, dateValues];
    }


    // const [stepsCategory, setSteps] = useState<[]>([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const [dateLabels, dateValues] = generateDateLabels('day'); // Get both date labels and values
                // setSteps(dateLabels); // If needed, set the date labels in state

                // Use Promise.all to fetch data for each date
                const fetchPromises = dateValues.map(async (key) => {
                    try {
                        const result = await fetchSummary(key);
                        console.log(result);
                    } catch (error) {
                        console.error('Error fetching data for', key, ':', error);
                        throw error;
                    }
                });

                await Promise.all(fetchPromises); // Wait for all fetch operations to complete
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }


        fetchData();

    });

    const AreaChartData = {
        categories: ["11", "0", "0", "0", "0", "0", "0"],
        data: [
            {
                name: "Total Steps",
                data: [11, 0, 0, 0, 0, 0, 0],
            },
            {
                name: "Total Sleep",
                data: [11, 0, 0, 0, 0, 0, 0],
            },
        ],
        colors: ["#008FFB", "#00E396"],
    };


    return (
        <>
            <div className='flex flex-col gap-4 bg-white p-6 rounded-lg h-full'>
                <PatientsName />
                <PatientStatus />
                <div className="grid grid-cols-2 gap-4">
                    <AreaChart data={AreaChartData} title={"Daily Total Steps and Sleep"} height={"300px"} type="line" />
                    <AreaChart data={AreaChartData} title={"Daily Weight and Viceral Fats Progress"} height={"300px"} type="area" />
                </div>
            </div>
        </>
    )
}

export default Index