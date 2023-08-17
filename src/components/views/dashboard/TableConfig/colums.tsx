import { LuArrowUpDown } from "react-icons/lu";
import { ColumnDef } from "@tanstack/react-table";
import { PatientActivityType, PatientOverviewType } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { BiDownArrowAlt, BiUser } from "react-icons/bi";
import { ReportIcon } from "@/config/reportSubmitted";
import { Badge } from "@/components/ui/badge";

export const columns: ColumnDef<PatientActivityType>[] = [
    {
        id: "patient_id",
        accessorKey: "patient_id",
        header: ({ column }) => {
            return (
                <span
                    className="px-0 hover:bg-transparent text-primary-600 font-semibold"
                >
                    Patiens ID
                </span>
            );
        },
    },
    {
        id: "last_name",
        accessorKey: "last_name",
        header: ({ column }) => {
            return (
                <Button
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="px-0 hover:bg-transparent text-primary-600 font-semibold"
                    variant="ghost"
                >
                    Patient Name
                    <LuArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            const { first_name, middle_name, last_name } = row.original;
            const fullName = `${first_name} ${middle_name} ${last_name}`;
            return <span>{fullName}</span>;
        },
    },
    {
        id: "email",
        accessorKey: "email",
        header: ({ column }) => {
            return (
                <span
                    className="px-0 hover:bg-transparent text-primary-600 font-semibold"
                >
                    Email Address
                </span>
            );
        },
    },
    {
        id: "mobile_number",
        accessorKey: "mobile_number",
        header: ({ column }) => {
            return (
                <span
                    className="px-0 hover:bg-transparent text-primary-600 font-semibold"
                >
                    Mobile Number
                </span>
            );
        },
        cell: ({ row }) => {
            return <span>{`(+63) ${row.original.mobile_number}`}</span>;
        },
    },

    {
        id: "Actions",
        accessorKey: "actions",
        header: () => {
            return (
                <span className="px-0 hover:bg-transparent text-primary-600 font-semibold">
                    Actions
                </span>
            );
        },
        cell: ({ row }: any) => {
            return <div className="flex gap-2">
                <Button variant="secondary" size="icon">
                    <BiUser className="w-5 h-5" />
                </Button>
                <Button variant="secondary" size="icon">
                    <BiDownArrowAlt className="w-5 h-5" />
                </Button>
            </div>;
        },
    },
];
