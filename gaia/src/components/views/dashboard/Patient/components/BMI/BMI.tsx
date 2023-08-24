import React, { useEffect, useState } from "react";
import AreaChart from "@/components/ui/Charts/AreaChart";
import userStore from '@/lib/store/userStore'
import { supabase } from "@/services/supabaseConfig";
import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";

const BMI: React.FC = () => {
    const user = userStore((state) => state.user);

    // For filtering group button
    const [childData, setChildData] = useState<any>('');
    // Function to receive data from child component
    const receiveDataFromChild = (data: string) => {
        setChildData(data);
    };

    const fetchSummary = async (paramDate: any,range: string) => {
        try {
            if(range=='week'){
                const spl = paramDate.split('/');
                const diagnosis = await supabase.from('bmi_report').select('*').eq('patient_id', user?.uuid).gte('created_at', spl[0]).lte('created_at', spl[1]).order('created_at', { ascending: false }).limit(15);
                return diagnosis;
            }else{
                const diagnosis = await supabase.from('bmi_report').select('*').eq('created_at', paramDate).eq('patient_id', user?.uuid);
                return diagnosis;
            }
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
                const startOfWeek: Date = new Date(currentDate);
                startOfWeek.setDate(currentDate.getDate() - currentDate.getDay()); // Set to the start of the current week

                for (let iWeek = 0; iWeek < 4; iWeek++) {
                    const endOfWeek: Date = new Date(startOfWeek);
                    endOfWeek.setDate(startOfWeek.getDate() + 6);

                    dateLabels.push(`${startOfWeek.toISOString().split('T')[0]}/${endOfWeek.toISOString().split('T')[0]}`);
                    dateValues.push(`${startOfWeek.toISOString().split('T')[0]}/${endOfWeek.toISOString().split('T')[0]}`);

                    startOfWeek.setDate(endOfWeek.getDate() + 1); // Move to the next week
                }

                    // Sort the dateLabels and dateValues in ascending order
                    dateLabels.sort();
                    dateValues.sort();

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

    const [dateLabels, dateValues] = generateDateLabels(childData ?? '');
    const [chartData, setChartData] = useState<any[]>([]);

    useEffect(() => {

        var finalData: any[] = [];
        async function fetchData() {
            try {
                const fetchPromises = dateValues.map(async (key) => {
                    var bmiLabels: any[] = [];
                    var bmiData: any[] = [];

                    try {
                        const result = await fetchSummary(key,childData ?? '');
                        const wk = childData ?? '';

                        // Populate the bmiLabels array with unique diagnosis labels
                        result?.data?.forEach((item:any) => {
                            if (!bmiLabels.includes(item.diagnosis_label)) {
                                bmiLabels.push(item.diagnosis_label);
                            }
                        });

                        // Initialize data arrays for each label with zeros
                        bmiLabels.forEach((label) => {
                            let dataArray: any = [];
                            if(wk=='week'){

                                const dataArra = dateValues.map((dateRange) => {
                                    const [startDateStr, endDateStr] = dateRange.split('/');
                                    const startDate = new Date(startDateStr);
                                    const endDate = new Date(endDateStr);
                            
                                    // Filter the data to only include items for the current label and within the date range
                                    const matchingData = result.data?.filter((item) => item.diagnosis_label === label && new Date(item.created_at) >= startDate && new Date(item.created_at) <= endDate);
                            
                                    // Find the latest value for the label within the date range
                                    const latestValue = matchingData?.reduce((latest, item) => {
                                        const value = extractNumericValue(item.diagnosis_value);
                                        if (value !== null && value > latest) {
                                            return value;
                                        }
                                        return latest;
                                    }, 0);
                            
                                    return latestValue;
                                });
                            
                                bmiData.push({
                                    name: label,
                                    data: dataArra,
                                });

                            }else{
                                dataArray = dateValues.map((date) => {
                                    const value = result?.data?.find((item:any) => item.diagnosis_label === label && item.created_at === date);
                                    console.log(date,value)
                                    return value ? extractNumericValue(value.diagnosis_value) || 0 : 0;
                                });

                                bmiData.push({
                                    name: label,
                                    data: dataArray,
                                });
                            }

                        });


                        // Push the unique bmiData to finalData
                        for (const dataItem of bmiData) {
                            const existingDataIndex = finalData.findIndex((item) => item.name === dataItem.name);
                            if (existingDataIndex === -1) {
                                finalData.push(dataItem);
                            } else {
                                // Merge the data arrays for items with the same name
                                finalData[existingDataIndex].data = finalData[existingDataIndex].data.map((value: any, index: any) => {
                                    return value + dataItem.data[index];
                                });
                            }
                        }
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

    console.log(dateValues);
    console.log(chartData); 

    const AreaChartData = {
        categories: dateLabels,
        showForNullSeries: true,
        showForZeroSeries: true,
        chart: {
            height: 350,
            type: "area",
            stacked: true
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
            <AreaChart data={AreaChartData} title={"BMI Status Report"} height={"300px"} type="bar" sendDataToParent={receiveDataFromChild} />
        </>
    )
}

export default BMI;
