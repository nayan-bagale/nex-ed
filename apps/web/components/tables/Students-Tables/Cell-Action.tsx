import * as React from "react"
import { Info } from "lucide-react"


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
import { BarGraph } from "@/components/Students/BarGraph"
import { ScrollArea } from "@/components/ui/scroll-area"
import {SimpleBarChart} from "@/components/Students/SimpleBarChart"
import { User } from "@/types/student-table"


interface CellActionProps {
    data: User;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
    // console.log(data)
    return (
        <>
            <Drawer>
                <DrawerTrigger>
                    <Info />
                </DrawerTrigger>
                <DrawerContent>
                    <ScrollArea>
                    <div className="mx-auto w-full max-w-sm">
                        <DrawerHeader>
                            <DrawerTitle>{data.name}</DrawerTitle>
                            <DrawerDescription>{data.subject_name}</DrawerDescription>
                            {/* <DrawerDescription>
                                <p>{data.company}</p>
                            </DrawerDescription> */}
                        </DrawerHeader>
                        <div className="p-4 pb-0">              
                                {/* <BarGraph/> */}
                                <SimpleBarChart id={data.student_id} />
                        </div>
                        <DrawerFooter>
                            {/* <Button>Submit</Button> */}
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