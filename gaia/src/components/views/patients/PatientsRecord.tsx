"use client"

import DataTable from '@/components/ui/Table/DataTable'
import Pagination from '@/components/ui/Table/Pagination'
import React, { useState } from 'react'
import {
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    getCoreRowModel,
    getFilteredRowModel,
    getSortedRowModel,
    useReactTable,
    getPaginationRowModel,
} from "@tanstack/react-table";
import { columns } from "./TableConfig/colums"

const PatientsRecord = ({ data }: any) => {
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = useState({});
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [sorting, setSorting] = useState<SortingState>([]);

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        onColumnFiltersChange: setColumnFilters,
        onSortingChange: setSorting,
        state: {
            columnVisibility,
            rowSelection,
            columnFilters,
            sorting,
        },
        enableGlobalFilter: true,
        initialState: {
            pagination: {
                pageSize: 4,
            },
        },
    });

    return (
        <div className="p-6 border w-full rounded-lg h-full bg-white">
            <h3 className="text-xl font-semibold">Activity List</h3>
            <div className="rounded-md mt-6">
                <DataTable table={table} columns={columns} />
            </div>
            <Pagination table={table} />
        </div>
    )
}

export default PatientsRecord