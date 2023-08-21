import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { RiLoader5Line } from "react-icons/ri"

const ColorDefault = (color = "default") => {
  switch (color) {
    case "default":
      return "border-primary-500 bg-primary-500 hover:bg-primary-600 active:bg-primary-700 text-white";
    case "blue":
      return "border-indigo-500 bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-700 text-white";
    case "green":
      return "border-green-500 bg-green-500 hover:bg-green-600 active:bg-green-700 text-white";
    case "yellow":
      return "border-amber-500 bg-amber-500 hover:bg-amber-600 active:bg-amber-700 text-white";
    case "gray":
      return "border-gray-500 bg-gray-700 hover:bg-gray-800 active:bg-gray-900 text-white";
    case "red":
      return "border-rose-500 bg-rose-500 hover:bg-rose-600 active:bg-rose-700 text-white";
    default:
      break;
  }
};
const ColorOutlined = (color = "default") => {
  switch (color) {
    case "default":
      return "border-primary-500 bg-white hover:border-primary-600 hover:bg-primary-600 active:border-primary-700 active:bg-primary-700 text-primary-500 hover:text-white active:text-white";
    case "blue":
      return "border-indigo-500 bg-white hover:border-indigo-600 hover:bg-indigo-600 active:border-indigo-700 active:bg-indigo-700 text-indigo-500 hover:text-white active:text-white";
    case "green":
      return "border-green-500 bg-white hover:border-green-600 hover:bg-green-600 active:border-green-700 active:bg-green-700 text-green-500 hover:text-white active:text-white";
    case "yellow":
      return "border-amber-500 bg-white hover:border-amber-600 hover:bg-amber-600 active:border-amber-700 active:bg-amber-700 text-amber-500 hover:text-white active:text-white";
    case "gray":
      return "border-gray-500 bg-white hover:border-gray-600 hover:bg-gray-600 active:border-gray-700 active:bg-gray-700 text-gray-500 hover:text-white active:text-white";
    case "red":
      return "border-rose-500 bg-white hover:border-rose-600 hover:bg-rose-600 active:border-rose-700 active:bg-rose-700 text-rose-500 hover:text-white active:text-white";
    default:
      break;
  }
};

const ColorLight = (color = "default") => {
  switch (color) {
    case "default":
      return "border-none bg-primary-50 hover:bg-primary-200 active:bg-primary-300 text-primary-600";
    case "blue":
      return "border-none bg-indigo-50 hover:bg-indigo-100 active:bg-indigo-200 text-indigo-600";
    case "green":
      return "border-none bg-green-50 hover:bg-green-100 active:bg-green-200 text-green-600";
    case "yellow":
      return "border-none bg-amber-50 hover:bg-amber-100 active:bg-amber-200 text-amber-600";
    case "gray":
      return "border-none bg-gray-200 hover:bg-gray-300 active:bg-gray-400 text-gray-800";
    case "red":
      return "border-none bg-rose-200 hover:bg-rose-200 active:bg-rose-300 text-rose-600";
    default:
      break;
  }
};

const ColorGhost = (color = "default") => {
  switch (color) {
    case "default":
      return "border-transparent text-primary-500 hover:text-primary-600 active:text-primary-700";
    case "blue":
      return "border-transparent text-indigo-500 hover:text-indigo-600 active:text-indigo-700";
    case "green":
      return "border-transparent text-green-500 hover:text-green-600 active:text-green-700";
    case "yellow":
      return "border-transparent text-amber-500 hover:text-amber-600 active:text-amber-700";
    case "red":
      return "border-transparent text-rose-500 hover:text-rose-600 active:text-rose-700";
    case "gray":
      return "border-transparent text-gray-500";
    default:
      break;
  }
};

const VariantDefault = (variant = "default", color = "default") => {
  switch (variant) {
    case "default":
      return `${ColorDefault(color)}`;
    case "outlined":
      return `${ColorOutlined(color)}`;
    case "light":
      return `${ColorLight(color)}`;
    case "ghost":
      return `${ColorGhost(color)}`;
    case "unstyled":
      return "border-none"
    default:
      break;
  }
};


const buttonVariants = cva(
  "inline-flex items-center justify-center border text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-gray-950 dark:focus-visible:ring-gray-800",
  {
    variants: {
      radius: {
        rounded: "rounded-full",
        md: "rounded-md",
        lg: "rounded-lg",
        none: "rounded-none",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
        square: "p-2 rounded-md text-sm",
        text: "px-2 py-1.5 rounded-sm text-sm"
      },
    },
    defaultVariants: {
      radius: "md",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  asChild?: boolean
  isLoading?: boolean
  variant?: "default" | "outlined" | "light" | "ghost" | "unstyled";
  color?: "default" | "blue" | "green" | "gray" | "red" | "yellow";
  radius?: "rounded" | "md" | "lg" | "none";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, color, size, radius, isLoading = false, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ size, radius, className }), VariantDefault(variant, color))}
        ref={ref}
        {...props}
      >
        {isLoading && <RiLoader5Line className={`animate-spin absolute  w-6 h-6 ${isLoading ? "opacity-100" : "opacity-0"}`} />}
        <span className={`inline-flex items-center ${isLoading ? "opacity-0" : "opacity-100"}`}>
          {props.children}
        </span>
      </Comp>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
