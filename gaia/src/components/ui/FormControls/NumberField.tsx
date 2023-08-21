"use client";
import { cn } from "@/lib/utils";
import { ChangeEvent, SetStateAction, forwardRef, useEffect, useState } from "react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  value?: string | number;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  format?: string;
  inputLength?: number;
  placeholder?: string;
  required?: boolean;
  rightIcon?: string;
  leftIcon?: string;
  className?: string;
  description?: string;
  label?: string;
}

const NumberField = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type,
      leftIcon = "",
      rightIcon = "",
      size,
      label,
      description,
      required = false,
      format,
      inputLength,
      value,
      onChange,
      placeholder,
      ...props
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = useState<number | string>(
      value || ""
    );

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
      const { value: inputValue, selectionStart } = event.target;
      // Remove all non-numeric characters from the input value
      const numericValue = inputValue.replace(/\D/g, "");
      // Determine the maximum length of the input value based on the format
      const maxLength = format
        ? Math.min(
          numericValue.length +
          format.split("").filter((char) => /\d/.test(char)).length,
          format.length
        )
        : inputLength;
      // Format the numeric value with the specified format
      let formattedValue = "" as string;

      if (format) {
        let valueIndex = 0;
        for (let i = 0; i < format.length; i++) {
          const formatChar = format[i];
          if (/[0x]/i.test(formatChar)) {
            const inputChar = numericValue[valueIndex];
            if (inputChar) {
              formattedValue += inputChar;
              valueIndex++;
            }
          } else {
            formattedValue += formatChar;
          }
        }
        // Remove any hyphens at the end of the formatted value
        formattedValue = formattedValue.replace(/-+$/, "");
      } else {
        formattedValue = numericValue.slice(0, maxLength);
      }

      setInternalValue(formattedValue);
      if (onChange) {
        onChange(event);
      }

      // Adjust the cursor position if necessary to allow for deleting hyphens
      let newCursorPosition = selectionStart ?? 0;
      if (inputValue === "") {
        if (
          formattedValue[newCursorPosition - 1] === "-" &&
          (newCursorPosition === 1 ||
            formattedValue[newCursorPosition - 2] !== "-")
        ) {
          newCursorPosition--;
        } else if (formattedValue[newCursorPosition] === "-") {
          newCursorPosition++;
        }
      }
      // setValue(formattedValue.slice(0, maxLength));
      // Set the cursor position to the adjusted position
      event.target.setSelectionRange(newCursorPosition, newCursorPosition);
    };

    const handleKeyDown = (
      event: React.KeyboardEvent<HTMLInputElement>
    ): void => {
      if (event.key !== "Backspace" && isNaN(parseInt(event.key, 10))) {
        event.preventDefault();
      }

      const { key, target } = event;
      if (
        key === "ArrowLeft" &&
        target instanceof HTMLInputElement &&
        target.selectionStart !== null &&
        target.selectionStart > 0
      ) {
        target.setSelectionRange(
          target.selectionStart - 1,
          target.selectionStart - 1
        );
      } else if (
        key === "ArrowRight" &&
        target instanceof HTMLInputElement &&
        target.selectionStart !== null &&
        typeof internalValue === "string" &&
        target.selectionStart < internalValue.length
      ) {
        target.setSelectionRange(
          target.selectionStart + 1,
          target.selectionStart + 1
        );
      }
    };

    const getMaxLength = (
      numericValueLength: number,
      format: string,
      selectionStart: number
    ): number => {
      let remainingCharsCount = format.length - selectionStart;
      for (let i = numericValueLength; i < format.length; i++) {
        if (/\d/.test(format[i])) {
          remainingCharsCount++;
        }
      }
      return numericValueLength + remainingCharsCount;
    };

    const maxLength = format
      ? getMaxLength(
        (typeof value === "string" ? value.replace(/-/g, "") : "").length,
        format,
        value?.toString().length || 0
      )
      : inputLength;

    useEffect(() => {
      setInternalValue(value || "");
    }, [value]);

    return (

      <div
        className={cn(
          "flex items-center h-10 w-full rounded-md border bg-transparent px-3 py-2 text-sm ring-emerald-200 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-within:outline-none focus-within:border-primary-400 focus-within:ring-[3px] focus-within:ring-ring focus-within:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 text-gray-400 focus-within:text-primary-500 transition-colors duration-100 gap-2"
        )}
      >
        {leftIcon !== "" && (
          <div className="z-20 left-5 pointer-events-none">
            <span className={`[&>*]:w-4 [&>*]:h-4 text-sm text-inherit`}>
              {leftIcon}
            </span>
          </div>
        )}
        <input
          className={`flex-1 bg-white w-full text-gray-600 focus:outline-none custom-input
      `}
          placeholder={format ? format.replace(/\d/g, "0") : placeholder}
          type="text"
          value={internalValue}
          onChange={handleInputChange}
          maxLength={maxLength}
          onKeyDown={handleKeyDown}
          ref={ref}
          {...props}
        />
        {rightIcon !== "" && (
          <div className="z-20 right-5 pointer-events-none">
            <span className={`[&>*]:w-4 [&>*]:h-4 text-sm text-inherit`}>
              {rightIcon}
            </span>
          </div>
        )}
      </div>
    );
  }
);
NumberField.displayName = "Input";

export { NumberField };