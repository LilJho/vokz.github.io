"use client"

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
import DataTable from '@/components/ui/Table/DataTable';
import Pagination from '@/components/ui/Table/Pagination';
import DataTableControl from './TableConfig/DataTableControls';
import { useUserStore } from '@/lib/store/userStore';

const PatientsOverview = ({ data }: any) => {
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
    });

    return (
        <div className="py-8 px-10 border rounded-lg h-full mt-5 bg-white">
            <h3 className="text-xl font-semibold">Patients Daily Activity</h3>
            <DataTableControl table={table} />
            <div className="rounded-md mt-6">
                <DataTable table={table} columns={columns} />
            </div>
            <Pagination table={table} />
        </div>
    )
}

export default PatientsOverview