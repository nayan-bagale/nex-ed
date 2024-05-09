"use client";

import { DataTable } from "@/components/ui/data-table";
import { columns } from "./Columns";
import { User } from "@/types/student-table";

interface ProductsClientProps {
    data: User[];
}

export const UserClient: React.FC<ProductsClientProps> = ({ data }) => {
    
    return (
        <>
            <DataTable searchKey="name" columns={columns} data={data} />
        </>
    );
};