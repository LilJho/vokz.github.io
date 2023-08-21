import React, { useEffect, useState } from "react";
import PatientStatus from './components/PatientStatus/PatientStatus'
import StepAndSleep from "./components/StepsAndSleep/StepsAndSleep";
import WeightAndFats from "./components/WeightAndFats/WeightAndFats";
import OxygenLevelReport from "./components/OxygenLevelReport/OxygenLevelReport";
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
      

    return (
        <>
            <div className='flex flex-col gap-4 bg-white p-6 rounded-lg h-full'>
                <PatientsName />
                <PatientStatus />
                <div className="grid grid-cols-2 gap-4">
                    <StepAndSleep/> 
                    <WeightAndFats/>
                </div>
                <OxygenLevelReport/>
            </div>
        </>
    )
}

export default Index