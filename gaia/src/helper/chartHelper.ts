 
import { supabase } from '@/services/databaseServices';

export async function fetchSummary(
     tableName:string
    ,selectQuery:string
    ,filterData:string
    ,paramDate: string
    , userId: string | undefined) {
  try {
    const diagnosis = await supabase
      .from(tableName)
      .select(selectQuery)
      .gte('created_at', paramDate)
      .eq('diagnosis', filterData) 
      .eq('patient_id', userId);  

    const summary: number[] | any = diagnosis.data?.map((e: any) => Number(e.diagnosis_numeric));
    return summary
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}

export async function  generateDateLabels(interval = 'day') {
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

