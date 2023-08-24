import React, { FC, Fragment, useState } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { HiCheck, HiSelector } from "react-icons/hi";

type IComboBoxProps<T = any> = {
  fullWidth?: boolean;
  size?: "default" | "sm" | "lg";
  data?: T[];
  objKey?: string;
  required?: boolean;
  label?: string;
  value?: T;
  onChange?: (value: T) => void;
  className?: string;
  readOnly?: boolean;
};

type OptionValue = string | { [key: string]: any };

const HeadLessComboBox: FC<IComboBoxProps> = ({
  fullWidth = false,
  size,
  data = [],
  objKey = "",
  value = "",
  onChange,
  className = "",
  readOnly
}) => {
  const [query, setQuery] = useState("");

  const filteredData =
    query === ""
      ? data
      : data.filter((val) => {
        const valueToCompare =
          typeof val === "object" && objKey ? val[objKey] : val;
        if (typeof valueToCompare === "string") {
          return valueToCompare
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""));
        }
        return false;
      });

  const getWidth = setWidthBasedOnLength(data, objKey);

  const renderOption = <T extends OptionValue>(data: T): string => {
    if (typeof data === "string") {
      return data;
    }
    if (typeof data === "object" && objKey && data[objKey]) {
      return String(data[objKey]);
    }
    return "";
  };

  return (
    <div
      className={`${TextSize(size)} ${className} ${fullWidth ? "w-full" : ""
        }`}
    >

      <Combobox disabled={readOnly} value={value} onChange={onChange}>
        <div className="relative">
          <div
            style={{ minWidth: fullWidth ? getWidth : "" }}
            className={`relative ${fullWidth && "w-full"
              } cursor-default bg-white text-left border ring-emerald-200 focus:outline-none focus:ring-[3px] focus:ring-ring focus:border-primary-400 focus:ring-offset-0 ${SelectSize(
                size
              )}`}
          >
            <Combobox.Input
              className={`relative bg-white text-left focus:outline-none w-full`}
              displayValue={(val: any) => renderOption(val)}
              onChange={(event) => setQuery(event.target.value)}
            />
            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
              <HiSelector
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </Combobox.Button>
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery("")}
          >
            <Combobox.Options
              className={`absolute z-20 mt-2 max-h-60 ${fullWidth ? "w-full" : "max-w-max"
                } overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}
            >
              {filteredData.length === 0 && query !== "" ? (
                <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                  Nothing found.
                </div>
              ) : (
                filteredData.map((val) => (
                  <Combobox.Option
                    key={val.id}
                    className={({ active }) =>
                      `relative cursor-pointer select-none ${OptionSize(
                        size
                      )} ${TextSize(size)}  ${active
                        ? "bg-primary-50 text-primary-900"
                        : "text-neutral-900"
                      }`
                    }
                    value={val}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`block truncate ${selected ? "font-medium" : "font-normal"
                            }`}
                        >
                          {renderOption(val)}
                        </span>
                        {selected ? (
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-primary-600">
                            <HiCheck className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  );
};

export default HeadLessComboBox;

const TextSize = (size = "default") =>
({
  default: "text-sm",
  sm: "text-sm",
  lg: "text-lg",
}[size]);

const SelectSize = (size = "default") =>
({
  default: "pl-3 py-2 pr-9 rounded-md h-10",
  sm: "pl-3.5 py-2 pr-10 rounded-md min-h-[2.375rem]",
  lg: "pl-4 py-2.5 pr-10 text-lg rounded-md min-h-[3.125rem]",
}[size]);

const OptionSize = (size = "default") =>
({
  default: "py-2 pl-10 pr-4",
  sm: "py-1.5 pl-10 pr-4",
  lg: "py-2 pl-10 pr-4",
}[size]);

const setWidthBasedOnLength = (array: any[], objKey = "") => {
  let longestWord = "";

  const data = objKey === "" ? array : array.map((val: any) => val[objKey]);

  data?.forEach((word: string) => {
    if (word.length > longestWord.length) {
      longestWord = word;
    }
  });
  return (longestWord.length * 9) / 16;
};
