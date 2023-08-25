import * as React from "react";

import { cn } from "@/lib/utils";
import { RiCalendar2Line } from "react-icons/ri";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  description?: string;
  label?: string;
  required?: boolean;
}

const DateField = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type,
      leftIcon,
      rightIcon,
      size,
      label,
      description,
      required = false,
      ...props
    },
    ref
  ) => {
    return (
      <div className="relative">
        <input
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-white px-3 py-2 text-sm ring-emerald-200 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:border-primary-400 focus-visible:ring-[3px] focus-visible:ring-ring focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 text-gray-800 focus-visible:text-primary-500 transition-colors duration-100 gap-2 custom-input"
          )}
          type="date"
          ref={ref}
          {...props}
        />
        <div className="absolute top-1/2 right-4 transform -translate-y-1/2 pointer-events-none">
          <RiCalendar2Line className={`relative w-5 h-5`} />
        </div>
      </div>
    );
  }
);
DateField.displayName = "Input";

export { DateField };

const IconSize = (size = "default") =>
({
  default: "[&>*]:w-5 [&>*]:h-5 text-base",
  sm: "[&>*]:w-4 [&>*]:h-4 text-sm",
}[size]);
