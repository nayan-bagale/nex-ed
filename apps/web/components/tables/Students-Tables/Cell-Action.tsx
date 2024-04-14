import * as React from "react"
import { Eye } from "lucide-react"


import { Button } from "@/components/ui/button"
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
import { User } from "@/data/data"
import { BarGraph } from "@/components/Students/BarGraph"
import { ScrollArea } from "@/components/ui/scroll-area"
import {SimpleBarChart} from "@/components/Students/SimpleBarChart"


interface CellActionProps {
    data: User;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
    return (
        <>
            <Drawer>
                <DrawerTrigger>
                    <Eye />
                </DrawerTrigger>
                <DrawerContent>
                    <ScrollArea>
                    <div className="mx-auto w-full max-w-sm">
                        <DrawerHeader>
                            <DrawerTitle>{data.name}</DrawerTitle>
                            <DrawerDescription>{data.role}</DrawerDescription>
                            <DrawerDescription>
                                <p>{data.company}</p>
                            </DrawerDescription>
                        </DrawerHeader>
                        <div className="p-4 pb-0">              
                                {/* <BarGraph/> */}
                                <SimpleBarChart/>
                        </div>
                        <DrawerFooter>
                            <Button>Submit</Button>
                            <DrawerClose asChild>
                                <Button variant="outline">Cancel</Button>
                            </DrawerClose>
                        </DrawerFooter>
                    </div>
                    </ScrollArea>
                </DrawerContent>
            </Drawer>
        </>
    );
};