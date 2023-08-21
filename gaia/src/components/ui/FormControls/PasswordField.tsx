import * as React from "react";

import { cn } from "@/lib/utils";
import useToggle from "@/hooks/useToggle";
import { RiEyeLine, RiEyeOffLine } from "react-icons/ri";

export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    description?: string;
    label?: string;
    required?: boolean;
}

const PasswordField = React.forwardRef<HTMLInputElement, InputProps>(
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
        const [show, toggle] = useToggle();

        return (
            <div
                className={cn(
                    "flex items-center h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-emerald-200 placeholder:text-muted-foreground focus-within:outline-none focus-within:border-primary-400 focus-within:ring-[3px] focus-within:ring-ring focus-within:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 text-gray-400 focus-within:text-primary-500 transition-colors duration-100 gap-2 relative"
                    , className)}
            >
                <input
                    className={`flex-1 bg-white w-full text-gray-600 focus:outline-none custom-input
      `}
                    type={show ? "text" : "password"}
                    ref={ref}
                    {...props}
                />
                <button
                    className={`z-10 cursor-pointer [&>*]:w-5 [&>*]:h-5 text-sm`}
                    type="button"
                >
                    {show ? (
                        <RiEyeOffLine onClick={toggle} />
                    ) : (
                        <RiEyeLine onClick={toggle} />
                    )}
                </button>
            </div>
        );
    }
);
PasswordField.displayName = "Input";

export { PasswordField };
