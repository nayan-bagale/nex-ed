'use client'

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Separator } from "../ui/separator";
import Link from "next/link";
import { Button } from "../ui/button";
import { Edit, Trash, MoreVertical } from "lucide-react";
import { AlertModal } from "../Modal/Alert-Modal";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";


const Menu = () => {
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);

    const onConfirm = async () => { };
    return (<>
        <AlertModal
            isOpen={open}
            onClose={() => setOpen(false)}
            onConfirm={onConfirm}
            loading={loading}
        />
        <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreVertical className="h-6 w-6" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>

                <DropdownMenuItem
                    onClick={() => console.log("Edit")}
                >
                    <Edit className="mr-2 h-4 w-4" /> Update
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setOpen(true)}>
                    <Trash className="mr-2 h-4 w-4" /> Delete
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu></>)
}

const Card_ = () => {

    return (
        <Card className=" w-fit">

            <CardHeader>
                <div className=" flex justify-between pr-2 ">
                    <div className=" space-y-2">
                        <Link href="/class/dlt" className=" hover:underline">
                            <CardTitle>
                                DLT
                            </CardTitle>
                        </Link>

                    </div>
                    <div className=" self-start -mt-3 -mr-5">
                        <Menu />
                    </div>
                </div>
            </CardHeader>
            {/* <Separator className=" -mt-2 mb-2" /> */}
            <CardContent>
                <CardDescription>Final Year (2023-24) Sec: B</CardDescription>
                <p className="text-sm text-muted-foreground">Prof. Nayan Bagale</p>
            </CardContent>
            <Separator className=" -mt-2 mb-2" />
            <CardFooter>
                <div className=" flex justify-between w-full">
                    <p className="text-sm">Total Students: </p>
                    <p className="text-sm">+99</p>
                </div>
            </CardFooter>
        </Card>

    )
}

export default Card_;