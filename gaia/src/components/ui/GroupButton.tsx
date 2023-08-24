"use client"

import React, { useState } from 'react'
import { Button } from './button'
import { cn } from '@/lib/utils'

interface GroupButtonProps {
    orientation?: "horizontal" | "vertical"
    data: {
        label: string
        onClick?: () => void;
    }[]
    variant?: string,
    color?: string
}

const GroupButton = ({ orientation = "vertical", data, color = "default" }: GroupButtonProps) => {

    const [active, setActive] = useState(0)

    const handleClick = (index: number, onClick: any) => {
        setActive(index)
        onClick()
    }

    return (
        <div className={cn(`flex ${orientation === "vertical" ? "flex-row" : "flex-col"}`)}>
            {data.map((item, index) => (
                <Button
                    key={index}
                    variant={active === index ? "default" : "outlined"}
                    color={color as any}
                    onClick={() => handleClick(index, item.onClick)}
                    className={cn(`${active !== index && "even:border-x-0"} rounded-none first-of-type:rounded-l-lg last-of-type:rounded-r-lg`)}>
                    {item.label}
                </Button>
            ))}
        </div>
    )
}

export default GroupButton