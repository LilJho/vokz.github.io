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

    const extractNumericValue = (str: string) => {
        const match = str.match(/(\d+(\.\d+)?)/); // Regular expression to match numeric values
        return match ? parseFloat(match[0]) : null; // Convert the matched value to a float
    };

    const [dateLabels, dateValues] = generateDateLabels('day');
    const [chartData, setChartData] = useState<any[]>([]);

    useEffect(() => {
        var bmiLabels: any[] = [];
        var bmiValues: any[] = [];
        var bmiData: any[] = [];
        async function fetchData() {
            try {
                const fetchPromises = dateValues.map(async (key) => {
                    try {
                        const result = await fetchSummary(key);
                        if (result.data && result.data.length > 0) {
                            for(var i=0;i<result.data.length;i++){

                                bmiLabels.push(result.data[i].diagnosis_label);
                                bmiValues.push(extractNumericValue(result.data[i].diagnosis_value))
                            }

                            for (let i = 0; i < bmiLabels.length; i++) {
                                bmiData.push({ name: bmiLabels[i], data: bmiValues[i] });
                            }

                            console.log(bmiData); 
                            
                        }
                    } catch (error) {
                        console.error('Error fetching data for', key, ':', error);
                        throw error;
                    }
                });
                
                await Promise.all(fetchPromises);
                setChartData(bmiData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        fetchData();
    }, []);

    console.log(dateLabels)

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
                name: "Weight",
                data: [143.8]
            },
            {
                name: "Body Fat",
                data: [13.4]
            },
            {
                name: "BMI",
                data: [21.3]
            },
            {
                name: "Skeletal Muscle",
                data: [55.9]
            },
            {
                name: "Muscle Mass",
                data: [118.2]
            },
            {
                name: "Protein",
                data: [19.7]
            },
            {
                name: "BMR",
                data: [1589]
            },
            {
                name: "Fat Free Body Weight",
                data: [124.4]
            },
            {
                name: "Subcutaneous Fat",
                data: [12.1]
            },
            {
                name: "Visceral Fat",
                data: [4]
            },
            {
                name: "Body Water",
                data: [62.5]
            },
            {
                name: "Bone Mass",
                data: [6.2]
            },
            {
                name: "Heart Rate",
                data: [72]
            },
            {
                name: "Cardiac Index",
                data: [2.8]
            },
            {
                name: "Metabolic Age",
                data: [48]
            }
        ], // Use the dynamic chartData here
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
