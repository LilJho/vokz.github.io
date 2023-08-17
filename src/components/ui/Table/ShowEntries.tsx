import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/FormControls/select";

interface IProps {
  value: string;
  onChange?: (selected: any) => void;
}

const ShowEntries = ({ value, onChange }: IProps) => {
  return (
    <div className="flex items-center space-x-2">
      <p className="text-sm font-medium">Rows per page</p>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-[70px]">
          <SelectValue placeholder={value} />
        </SelectTrigger>
        <SelectContent side="bottom">
          {[5, 10, 20, 30, 40, 50, 60, 100].map((pageSize) => (
            <SelectItem key={pageSize} value={`${pageSize}`}>
              {pageSize}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default ShowEntries;

const SelectSize = (size = "default") =>
({
  default: "pl-4 py-2.5 pr-10 text-base rounded-md",
  sm: "pl-3.5 py-2 pr-10 text-sm rounded-md",
  lg: "pl-4 py-2.5 pr-10 text-lg rounded-md",
}[size]);

const OptionSize = (size = "default") =>
({
  default: "py-2 px-4 text-base",
  sm: "py-1.5 px-4 text-sm",
  lg: "py-2 px-4 text-lg",
}[size]);
