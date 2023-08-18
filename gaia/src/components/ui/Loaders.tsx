import { cn } from '@/lib/utils';
import { cva } from 'class-variance-authority';
import React from 'react';
import { RiLoader4Fill } from 'react-icons/ri';

const spinnerVariants = cva(
    "p-2 animate-spin",
    {
        variants: {
            variant: {
                default: "text-blue-600",
                destructive: "text-red-700",
                success: "text-green-600",
                warning: "text-yellow-600",
                disabled: "text-gray-400",
                black: "text-gray-800"
            },
            size: {
                default: "w-12 h-12",
                xs: "w-8 h-8",
                sm: "w-10 h-10",
                lg: "w-14 h-14",
            }
        },
        defaultVariants: {
            variant: "default",
            size: "default"
        }
    }
);

const pingVariants = cva(
    "rounded-full ping",
    {
        variants: {
            variant: {
                default: "bg-blue-600",
                destructive: "bg-red-700",
                success: "bg-green-600",
                warning: "bg-yellow-600",
                disabled: "bg-gray-400",
                black: "bg-gray-800"
            },
            size: {
                default: "w-12 h-12",
                xs: "w-8 h-8",
                sm: "w-10 h-10",
                lg: "w-14 h-14",
            }
        },
        defaultVariants: {
            variant: "default",
            size: "default"
        }
    }
);

interface ILoaderProps {
    type?: "spinner" | "ping"
    variant?: "default" | "destructive" | "success" | "warning" | "disabled" | "black"
    size?: "default" | "xs" | "sm" | "lg"
    className?: string
}

const Loaders = ({ type = "spinner", variant, size, className = "" }: ILoaderProps) => {
    return type === 'spinner'
        ? <RiLoader4Fill className={cn(spinnerVariants({ variant, size }), className)} />
        : <div className={cn(pingVariants({ variant, size }), className)}></div>
}

export default Loaders;
