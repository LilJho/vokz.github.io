import React, { useEffect, useState } from "react";
import PatientStatus from './components/PatientStatus'
import AreaChart from "@/components/ui/Charts/AreaChart";
import userStore from '@/lib/store/userStore'
import { DailyActivitiesService } from '@/services/databaseServices'
import { supabase } from "@/services/supabaseConfig";
import { PostgrestSingleResponse } from '@supabase/supabase-js';

const Index = () => {
    const user = userStore((state) => state.user);

    const fetchSummary = async (paramDate: any) => {
        try {
          console.log('param',paramDate); 
        //   const diagnosis = await DailyActivitiesService.getOneWhere('created_at', paramDate, 'summary_data');
          const diagnosis = await supabase.from('daily_activities').select('summary_data').eq('created_at', paramDate);
          console.log('fetch',diagnosis);
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
     
    const [dateLabels, dateValues] = generateDateLabels('day'); // Get both date labels and values
    let legendValues: any = [];
    useEffect(() => {
        async function fetchData() {
            try {
                // setSteps(dateLabels); // If needed, set the date labels in state
        
                // Use Promise.all to fetch data for each date
                const fetchPromises = dateValues.map(async (key) => {
                    try {
                        const result = await fetchSummary(key);
                        // Check if there is data in the response
                        if (result.data && result.data.length > 0) {
                            // Access the first item in the data array
                            const firstItem = result.data[0];

                            // Access the "summary_data" array within the first item
                            const summaryData = firstItem.summary_data;

                            // Now, summaryData contains ["9378", "0.4"]
                            legendValues.push(summaryData[0]);
                            console.log('legendValues',legendValues); // Output: ["9378", "0.4"]
                        }
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
        categories: dateLabels,
        data: [
          {
            name: "Total Steps",
            data: legendValues,
          },
          {
            name: "Total Sleep",
            data: legendValues,
          },
        ],
        colors: ["#008FFB", "#00E396"],
      };

      

    return (
        <>
            <div className='flex flex-col gap-4 bg-white p-6 rounded-lg h-full'>
                <h3 className="text-xl font-semibold">{user?.first_name} {user?.last_name}'s Daily Status</h3>
                 <PatientStatus />
                <div className="grid grid-cols-2 gap-4">
                    <AreaChart data={AreaChartData} title={"Daily Total Steps and Sleep"} height={"300px"} type="line"/>
                    <AreaChart data={AreaChartData} title={"Daily Weight and Viceral Fats Progress"} height={"300px"} type="area"/>
                </div>
            </div>
        </>
    )
}

export default Index