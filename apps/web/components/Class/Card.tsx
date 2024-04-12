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



const Card_ = () => {
    return (
        <Card className=" w-fit">
            <Link href="/class/dlt" className=" bg-background hover:bg-accent hover:text-accent-foreground">
            <CardHeader>
                <CardTitle>DLT</CardTitle>
                <CardDescription>Card Description</CardDescription>
            </CardHeader>
            <Separator />
            </Link>
            <CardContent>
                <p className="pt-2">Prof</p>
            </CardContent>
            <CardFooter>
                <p>Footer</p>
            </CardFooter>
        </Card>

    )
}

export default Card_;