"use client";
import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./Cell-Action";
import { User } from "@/data/data";
import { Checkbox } from "@/components/ui/checkbox";

export const columns: ColumnDef<User>[] = [
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
        accessorKey: "company",
        header: "Subject",
    },
    // {
    //     accessorKey: "role",
    //     header: "Course",
    // },
    {
        id: "actions",
        header: "Present",
        cell: ({ row }) => <CellAction data={row.original} action={'present'} />,
    },
    // {
    //     id:"actions",
    //     header: "Absent",
    //     cell: ({ row }) => <CellAction data={row.original} action="absent" />,
    // }
];