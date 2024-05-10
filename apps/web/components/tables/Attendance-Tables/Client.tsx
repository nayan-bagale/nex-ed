"use client";

import { DataTable } from "@/components/ui/data-table-attendance";
import { columns } from "./Columns";
import { Attendance } from "@/types/attendance-table";

interface ProductsClientProps {
    data: Attendance[];
    dates: any
}

export const UserClient: React.FC<ProductsClientProps> = ({ data, dates }) => {

    return (
        <>
            <DataTable searchKey="name" columns={columns} data={data} dates={dates} />
        </>
    );
};