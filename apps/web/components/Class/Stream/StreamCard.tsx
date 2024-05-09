import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import RoleCheckerClient from "@/components/utils/RoleCheckerClient";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import Image from "next/image";
import { getStream } from "@/action/stream_Action";
import { Menu } from "./StreamMenu";

export const StreamCard = async ({ sub_id }: { sub_id: string }) => {
    const streams = await getStream(sub_id);
    if(!streams.length){
        return (
            <div className=" flex justify-center items-center w-full">
                <h1 className=" text-2xl font-bold text-muted-foreground">No posts</h1>
            </div>
        )
    }
  
    return (
        <div className=" flex flex-col gap-4">{
            streams.filter((streams) => streams.subject_id === sub_id).map((stream) => {
                return (
                    <Card key={stream.id} className=" w-full">
                        <CardHeader>
                            {/* <CardTitle>Card Title</CardTitle> */}

                            <div className="flex items-center">
                                <Avatar className="h-9 w-9">
                                    <AvatarImage className=" object-cover" src={stream.profile as string} alt="Avatar" />
                                    <AvatarFallback>NB</AvatarFallback>
                                </Avatar>
                                <div className="ml-4 space-y-1">
                                    <p className="text-sm font-medium leading-none">Prof. {stream.teacher}</p>
                                    <p className="text-sm text-muted-foreground">
                                        {stream.date}
                                    </p>
                                </div>
                                <RoleCheckerClient>
                                    <div className="ml-auto self-start font-medium">
                                        <Menu id={stream.id} />
                                    </div>
                                </RoleCheckerClient>
                            </div>
                            <Separator />
                        </CardHeader>
                        <CardContent>
                            <p className="mb-3">{stream.text}</p>
                            {stream.files.length !== 0 && (
                                <>
                                    <div className="flex flex-wrap gap-2">
                                        <StreamFiles files={stream.files} />
                                    </div>
                                </>)}
                        </CardContent>
                        {/* <CardFooter>
                            <CardDescription>
                                <a href="#" className="text-primary-foreground">
                                    Download File
                                </a>
                            </CardDescription>
                        </CardFooter> */}
                    </Card>
                )
            }
            )
        }

        </div>
    )
}


const StreamFiles = ({ files }: { files: { size: number, name: string, url: string }[] }) => {
    return (
        <div className="flex flex-col gap-4">
            {files.map((file) => {
                const ext = file.name.split('.').pop();
                if (ext === 'pdf' || ext === 'docx' || ext === 'doc' || ext === 'ppt' || ext === 'pptx' || ext === 'xls' || ext === 'xlsx') {
                    return (
                        <Link key={file.name} href={file.url} className="">
                            {file.name} <span></span>
                        </Link>
                    )
                } else if (ext === 'jpg' || ext === 'jpeg' || ext === 'png' || ext === 'gif') {
                    return (<div key={file.name} className=' flex flex-col gap-1'>
                        <Link href={file.url} className="">
                            <Image src={file.url} alt={file.name} width={300} height={300} />
                            {file.name}
                        </Link>
                    </div>
                    )
                }

                return (
                    <a key={file.name} href={file.url} className="text-primary-foreground">
                        {file.name}
                    </a>
                )
            }
            )}
        </div>
    )
}