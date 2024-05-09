"use client";

import { DataTable } from "@/components/ui/data-table-attendance";
import { columns } from "./Columns";
import { useState } from "react";
import { Attendance } from "@/types/attendance-table";

interface ProductsClientProps {
    data: Attendance[];
}

export const UserClient: React.FC<ProductsClientProps> = ({ data }) => {

    return (
        <>
            <DataTable searchKey="name" columns={columns} data={data} />
        </>
    );
};