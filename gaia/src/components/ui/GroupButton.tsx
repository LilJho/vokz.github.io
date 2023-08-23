"use client"

import React from 'react'
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

const GroupButton = ({ orientation = "vertical", data, variant = "default", color = "default" }: GroupButtonProps) => {
    return (
        <div className={cn(`flex ${orientation === "vertical" ? "flex-row" : "flex-col"}`)}>
            {data.map((item, index) => (
                <Button
                    key={index}
                    variant={variant as any}
                    color={color as any}
                    onClick={item.onClick}
                    className={cn(`${variant === "outlined" && orientation === "vertical" && "even:border-x-0"} rounded-none first-of-type:rounded-l-lg last-of-type:rounded-r-lg`)}>
                    {item.label}
                </Button>
            ))}
        </div>
    )
}

export default GroupButton