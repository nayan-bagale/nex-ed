"use client";

import { DataTable } from "@/components/ui/data-table";
import { User } from "@/data/data";
import { columns } from "./Columns";

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