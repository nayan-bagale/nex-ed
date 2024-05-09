"use client";
import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./Cell-Action";
import { Checkbox } from "@/components/ui/checkbox";
import { Attendance } from "@/types/attendance-table";

export const columns: ColumnDef<Attendance>[] = [
    // {
    //     id: "select",
    //     header: ({ table }) => (
    //         <Checkbox
    //             checked={table.getIsAllPageRowsSelected()}
    //             onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
    //             aria-label="Select all"
    //         />
    //     ),
    //     cell: ({ row }) => (
    //         <Checkbox
    //             checked={row.getIsSelected()}
    //             onCheckedChange={(value) => row.toggleSelected(!!value)}
    //             aria-label="Select row"
    //         />
    //     ),
    //     enableSorting: false,
    //     enableHiding: false,
    // },
    {
        accessorKey: "id",
        header: "ID",
    },
    {
        accessorKey: "name",
        header: "NAME",
    },
    {
        accessorKey: "subject_name",
        header: "SUBJECT",
    },
    // {
    //     accessorKey: "role",
    //     header: "Course",
    // },
    {
        id: "actions",
        header: "P/A",
        cell: ({ row }) => <CellAction data={row.original}/>,
    },
    // {
    //     id:"actions",
    //     header: "Absent",
    //     cell: ({ row }) => <CellAction data={row.original} action="absent" />,
    // }
];