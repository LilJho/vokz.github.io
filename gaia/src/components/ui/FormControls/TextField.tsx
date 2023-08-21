import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  description?: string;
  label?: string;
  required?: boolean;
}

const TextField = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className = "",
      type,
      leftIcon = "",
      rightIcon = "",
      size,
      label,
      description,
      required = false,
      ...props
    },
    ref
  ) => {
    return (
      <div
        className={cn(
          "flex items-center h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-emerald-200 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-within:outline-none focus-within:border-primary-400 focus-within:ring-[3px] focus-within:ring-ring focus-within:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 text-gray-400 focus-within:text-primary-500 transition-colors duration-100 gap-2"
          , className)}
      >
        {leftIcon !== "" && (
          <div className="left-5 pointer-events-none">
            <span className={`[&>*]:w-4 [&>*]:h-4 text-sm text-inherit`}>
              {leftIcon}
            </span>
          </div>
        )}
        <input
          className={`flex-1 bg-white w-full text-gray-600 focus:outline-none custom-input
      `}
          ref={ref}
          {...props}
        />
        {rightIcon !== "" && (
          <div className="right-5 pointer-events-none">
            <span className={`[&>*]:w-4 [&>*]:h-4 text-sm text-inherit`}>
              {rightIcon}
            </span>
          </div>
        )}
      </div>
    );
  }
);
TextField.displayName = "Input";

export { TextField };
