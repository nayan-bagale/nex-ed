"use client";

import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    useReactTable,
} from "@tanstack/react-table";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import { format, set } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Input } from "./input";
import { Button } from "./button";
import { ScrollArea, ScrollBar } from "./scroll-area";
import { useMemo, useState } from "react";
import { useAttendance } from "../Attendance/ContextAPI";
import { Matcher } from "react-day-picker";

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    searchKey: string;
    dates: {[key: string]: string[]}
}

export function DataTable<TData, TValue>({
    columns,
    data,
    searchKey,
    dates
}: DataTableProps<TData, TValue>) {

    const { date, setDate, setSubject, handleSubmit, setTotal } = useAttendance();
    const [matcher, setMatcher] = useState<Matcher>([]);

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
    });

    console.log(dates)

    const subjects = data.filter((a: any, i) => data.findIndex((s: any) => a.subject_id === s.subject_id) === i).map((s: any) => ({ subject_id: s.subject_id, subject_name: s.subject_name }));

    /* this can be used to get the selectedrows 
    console.log("value", table.getFilteredSelectedRowModel()); */
    const handleSelectChange = (e: string) => {
        if (e !== 'all') {
            table.getColumn("subject_name")?.setFilterValue(e.split(":")[0]);
            setSubject(subjects.find((s) => s.subject_name === e.split(":")[0]));
            setMatcher(dates[e.split(":")[1]] ? dates[e.split(":")[1]].map((d: string) => new Date(d)) as Matcher : []);
            return;
        }
        setSubject({});
        table.getColumn("subject_name")?.setFilterValue("");
    };

    useMemo(() => setTotal(table.getFilteredRowModel().rows.length), [table.getFilteredRowModel().rows.length])

    return (
        <>
            <div className=" flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-4">
                <div className=" w-full md:max-w-sm">
                    <Select onValueChange={handleSelectChange} >
                        <SelectTrigger id="subject">
                            <SelectValue placeholder="Select Subject" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                {subjects.length ? (subjects.map((s: any) => {
                                    return (
                                        <SelectItem key={s.subject_id} value={`${s.subject_name}:${s.subject_id}`}>
                                            {s.subject_name}
                                        </SelectItem>
                                    );
                                })) : (
                                    <SelectItem value="all">
                                        All
                                    </SelectItem>
                                )}
                                {/* <SelectItem value="Blockchain">Blockchain</SelectItem> */}
                                {/* <SelectItem value="DLT">DLT</SelectItem> */}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                <Popover>
                    <PopoverTrigger asChild>
                        <Button
                            variant={"outline"}
                            className={cn(
                                "w-full md:w-[280px] justify-start text-left font-normal",
                                !date && "text-muted-foreground"
                            )}
                        >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {date ? format(date, "PPP") : <span>Pick a date</span>}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                        <Calendar
                            mode="single"
                            selected={date || new Date()}
                            onSelect={setDate}
                            disabled={matcher}
                            initialFocus
                            defaultMonth={new Date()}
                            modifiers={{ booked: matcher }}
                            modifiersClassNames={{ booked: "booked" }}
                        />
                    </PopoverContent>
                </Popover>
            </div>

            <Input
                placeholder={`Search ${searchKey}...`}
                value={(table.getColumn(searchKey)?.getFilterValue() as string) ?? ""}
                onChange={(event) =>
                    table.getColumn(searchKey)?.setFilterValue(event.target.value)
                }
                className=" w-full md:max-w-sm"
            />


            <ScrollArea className="rounded-md border h-[calc(80vh-200px)]">
                <Table className="relative">
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext(),
                                                )}
                                        </TableHead>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell className=" text-xs md:text-base" key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext(),
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
                <ScrollBar orientation="horizontal" />
            </ScrollArea>
            <div className="flex items-center justify-end space-x-2 py-4">
                {/* <div className="flex-1 text-sm text-muted-foreground">
                    {table.getFilteredSelectedRowModel().rows.length} of{" "}
                    {table.getFilteredRowModel().rows.length} row(s) selected.
                </div> */}
                <div className="space-x-2">
                    {/* <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        Previous
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        Next
                    </Button> */}
                    <Button
                        variant="default"
                        // size="sm"
                        onClick={handleSubmit}
                    // disabled={!table.getCanNextPage()}
                    >
                        Submit
                    </Button>
                </div>
            </div>
        </>
    );
}