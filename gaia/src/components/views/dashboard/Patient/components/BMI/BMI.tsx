import React, { useEffect, useState } from "react";
import AreaChart from "@/components/ui/Charts/AreaChart";
import userStore from '@/lib/store/userStore'
import { supabase } from "@/services/supabaseConfig";
import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";

const BMI: React.FC = () => {
    const user = userStore((state) => state.user);

    const fetchSummary = async (paramDate: any) => {
        try {
            const diagnosis = await supabase.from('bmi_report').select('*').eq('created_at', paramDate).eq('patient_id', user?.uuid);
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
    
    

    const extractNumericValue = (str: string) => {
        const match = str.match(/(\d+(\.\d+)?)/); // Regular expression to match numeric values
        return match ? parseFloat(match[0]) : null; // Convert the matched value to a float
    };

    const [dateLabels, dateValues] = generateDateLabels('days');
    const [chartData, setChartData] = useState<any[]>([]);

    useEffect(() => {
        var finalData: any[] = [];
        async function fetchData() {
            try {
                const fetchPromises = dateValues.map(async (key) => {
                    var bmiLabels: any[] = [];
                    var bmiData: any[] = [];

                    try {
                        const result = await fetchSummary(key);
                        if (result.data && result.data.length > 0) {
                            for (var i = 0; i < result.data.length; i++) {
                                const diagnosisLabel = result.data[i].diagnosis_label;
                                const diagnosisValue = extractNumericValue(result.data[i].diagnosis_value);

                                // Check if the label already exists in bmiLabels
                                const existingLabelIndex = bmiLabels.findIndex((label) => label === diagnosisLabel);

                                if (existingLabelIndex === -1) {
                                    // If label doesn't exist, add it to bmiLabels and create a new data array
                                    bmiLabels.push(diagnosisLabel);
                                    bmiData.push({ name: diagnosisLabel, data: [diagnosisValue] });
                                } else {
                                    // If label already exists, add the value to the existing data array
                                    bmiData[existingLabelIndex].data.push(diagnosisValue);
                                }
                            }

                            // Push the unique bmiData to finalData
                            for (const dataItem of bmiData) {
                                const existingDataIndex = finalData.findIndex((item) => item.name === dataItem.name);
                                if (existingDataIndex === -1) {
                                    finalData.push(dataItem);
                                } else {
                                    // Merge the data arrays for items with the same name
                                    finalData[existingDataIndex].data = finalData[existingDataIndex].data.concat(dataItem.data);
                                }
                            }
                        }
                    
                        else{
                            setChartData([]);
                        }

                        // console.log('bmidata' + key, bmiData);
                    } catch (error) {
                        console.error('Error fetching data for', key, ':', error);
                        throw error;
                    }
                });

                await Promise.all(fetchPromises);
                setChartData(finalData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }


        fetchData();
    }, []);

    // console.log(dateLabels)

    const AreaChartData = {
        categories: dateLabels,
        showForNullSeries: false,
        showForZeroSeries: false,
        chart: {
            height: 350,
            type: "area",
            stacked: false
        },
        data: chartData ?? [],
        colors: ["#008FFB", "#f54254", "#00E396","#008FFB", "#f54254", "#00E396","#008FFB", "#f54254", "#00E396","#008FFB", "#f54254", "#00E396","#008FFB", "#f54254", "#00E396"],
        plotOptions: {
            bar: {
                columnWidth: "20%"
            }
        }
    };

    return (
        <>
            <AreaChart data={AreaChartData} title={"BMI Status Report"} height={"300px"} type="bar"/>
        </>
    )
}

export default BMI;
