import { LuArrowUpDown } from "react-icons/lu";
import { ColumnDef } from "@tanstack/react-table";
import { PatientOverviewType } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { BiDownArrowAlt, BiLoaderAlt } from "react-icons/bi";
import { ReportIcon } from "@/config/reportSubmitted";
import { Badge } from "@/components/ui/badge";

export const columns: ColumnDef<PatientOverviewType>[] = [
    {
        id: "date",
        accessorKey: "date",
        header: ({ column }) => {
            return (
                <Button
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="px-0 hover:bg-transparent text-primary-600 font-semibold"
                    variant="ghost"
                    data-bs-original-title="Test"
                    tooltip="yes"
                >
                    Date
                    <LuArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
    },
    {
        id: "report_submitted",
        accessorKey: "report_submitted",
        header: ({ column }) => {
            return (
                <span
                    className="px-0 hover:bg-transparent text-primary-600 font-semibold"
                >
                    Report Submitted
                </span>
            );
        },
        cell: ({ row }) => {
            const Icon = ReportIcon[row.original.report_submitted]

            return (
                <div className="flex items-center gap-2">
                    <Icon className="text-primary-600" />
                    <span>
                        {row.original.report_submitted}
                    </span>
                </div>
            );
        },
    },
    {
        id: "status",
        accessorKey: "status",
        header: ({ column }) => {
            return (
                <span
                    className="px-0 hover:bg-transparent text-primary-600 font-semibold"
                >
                    Status
                </span>
            );
        },
        cell: ({ row }) => {
            return (
                <Badge variant="success">{row.original.status}</Badge>
            );
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
                    <BiLoaderAlt className="w-5 h-5" />
                </Button>
                <Button variant="secondary" size="icon">
                    <BiDownArrowAlt className="w-5 h-5" />
                </Button>
            </div>;
        },
    },

];
