"use client"

import * as React from "react"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

export function ComboboxDemo() {
    const [subject, setSubject] = React.useState<string>("")

    return (
        <div className="flex flex-col space-y-1.5">
            {/* <Label htmlFor="Subjects">Subjects</Label> */}
            <Select onValueChange={(e) => setSubject(e)}>
                <SelectTrigger id="Subjects">
                    <SelectValue placeholder="Subjects" />
                </SelectTrigger>
                <SelectContent position="popper">
                    <SelectItem value="dlt">DLT</SelectItem> 
                </SelectContent>
            </Select>
        </div>
    )
}
