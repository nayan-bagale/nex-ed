"use client";

import { Button } from "@/components/ui/button";
import { User } from "@/data/data";
import { Eye } from "lucide-react";


import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"


interface CellActionProps {
    data: User;
    action: 'absent' | 'present';
}

export const CellAction: React.FC<CellActionProps> = ({ data, action }) => {
    return (
        <>
            <Drawer>
                <DrawerTrigger><Eye /></DrawerTrigger>
                <DrawerContent>
                    <DrawerHeader>
                        <DrawerTitle>{data.name}</DrawerTitle>
                        <DrawerDescription>{data.role}</DrawerDescription>
                        <DrawerDescription>
                            <p>{data.company}</p>
                        </DrawerDescription>
                    </DrawerHeader>
                    <DrawerFooter>
                        <div className=" flex items-center w-full justify-center">

                            <Button className=" w-fit">Submit</Button>
                        </div>
                        <DrawerClose>
                            <Button variant="outline">Cancel</Button>
                        </DrawerClose>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>

        </>
    );
};