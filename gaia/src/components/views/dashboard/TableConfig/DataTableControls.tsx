import ShowEntries from "@/components/ui/Table/ShowEntries";
import { RiSearch2Line } from "react-icons/ri";

import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/FormControls/dropdown-menu";

import { Table } from "@tanstack/react-table";
import { PatientActivityType, PatientOverviewType } from "@/lib/types";
import { TextField } from "@/components/ui/FormControls/TextField";
import { Button } from "@/components/ui/button";

interface FiltersProps {
    table: Table<PatientActivityType>;
}

const DataTableControl = ({ table }: FiltersProps) => {
    return (
        <div className="mt-2 flex items-center gap-6">
            <TextField
                leftIcon={<RiSearch2Line />}
                placeholder="Search patients name..."
                className="max-w-sm w-full mr-auto"
                value={(table.getColumn("last_name")?.getFilterValue() as string) ?? ""}
                onChange={(event) =>
                    table.getColumn("last_name")?.setFilterValue(event.target.value)
                }
            />
            <ShowEntries
                value={`${table.getState().pagination.pageSize}`}
                onChange={(value) => {
                    table.setPageSize(Number(value));
                }}
            />
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="">
                        Columns
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-40">
                    <DropdownMenuLabel className="text-sm text-gray-700 ">
                        Toggle Columns
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {table
                        .getAllColumns()
                        .filter((column) => column.getCanHide())
                        .map((column) => {
                            let formattedLabel = column?.columnDef?.id?.replace(/_/g, ' ');
                            return (
                                <DropdownMenuCheckboxItem
                                    key={column.id}
                                    className="capitalize"
                                    checked={column.getIsVisible()}
                                    onCheckedChange={(value) => column.toggleVisibility(!!value)}
                                >
                                    {formattedLabel}
                                </DropdownMenuCheckboxItem>
                            );
                        })}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
};

export default DataTableControl;
