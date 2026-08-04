"use client";

import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import {DataTableSkeleton} from "./DataTableSkeleton";
import {DataTablePagination} from "./DataTablePagination";

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    isLoading?: boolean;

    pagination?: {
        page: number;
        totalPages: number;
        totalResults: number;
    };

    onPageChange?: (page: number) => void;
}

export function DataTable<TData, TValue>({
    columns,
    data,
    isLoading = false,
    pagination,
    onPageChange,
}: DataTableProps<TData, TValue>) {
    //  Table
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    if (isLoading) {
        return <DataTableSkeleton />;
    }

    return (
        <div className="space-y-4">
            <div className="overflow-hidden rounded-lg border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableHead
                                        key={header.id}
                                        className="text-right">
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                  header.column.columnDef
                                                      .header,
                                                  header.getContext(),
                                              )}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>

                    <TableBody>
                        {table.getRowModel().rows.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow key={row.id}>
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext(),
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center">
                                    لا توجد بيانات
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {pagination && onPageChange && (
                <DataTablePagination
                    page={pagination.page}
                    totalPages={pagination.totalPages}
                    totalResults={pagination.totalResults}
                    onPageChange={onPageChange}
                />
            )}
        </div>
    );
}
