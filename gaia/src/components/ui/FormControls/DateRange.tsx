"use client"

import { DateRangePicker } from 'react-date-range-dayjs';
import dayjs from 'dayjs';
import { useState } from 'react';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from '@/lib/utils';
import useToggle from '@/hooks/useToggle';
import { RiCalendar2Line } from 'react-icons/ri';

type SelectionType = {
    startDate: dayjs.Dayjs,
    endDate: dayjs.Dayjs,
    key: string
}

interface DateRangeProps {
    selectionRange: SelectionType
    setSelectionRange: React.Dispatch<React.SetStateAction<SelectionType>>
}

const DateRange = ({ selectionRange, setSelectionRange }: DateRangeProps) => {
    const [open, toggle] = useToggle()

    function handleSelect(ranges: any) {
        setSelectionRange(ranges.selection)
        setTimeout(() => {
            toggle()
        }, 200);
    }

    const formatDate = (date: any) => {
        if (date === "") return

        return dayjs(date).format('MMM DD YYYY')
    }
    return (
        <Popover open={open} onOpenChange={toggle}>
            <PopoverTrigger
                className={cn(
                    "flex h-10 rounded-md border bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-slate-400 focus-visible:outline-none focus-visible:border-primary-400 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 text-primary-500 focus-visible:text-primary-500 transition-colors duration-100 gap-3 custom-input"
                )}
            >
                {`${formatDate(selectionRange.startDate)} - ${formatDate(selectionRange.endDate)}`}
                <RiCalendar2Line className={`relative w-5 h-5`} />
            </PopoverTrigger>
            <PopoverContent className=''>
                <DateRangePicker
                    color="#16A34A"
                    rangeColors={["#16A34A"]}
                    ranges={[selectionRange]}
                    onChange={handleSelect}
                    showDateDisplay={false}
                />
            </PopoverContent>
        </Popover>

    )
}

export default DateRange