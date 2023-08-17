"use client"

import { Button } from "@/components/ui/button";
import Pedometer from "./Pedometer";

const DataVisuals = () => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <Pedometer />
            <div className="flex flex-col">
            </div>
        </div>
    );
};

export default DataVisuals;
