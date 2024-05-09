
import { getSubjects, getTotalStudents } from "@/action/subject_Action";
import { SubjectsT } from "@/components/Store/class";
import { redirect } from "next/navigation";
import { authOptions } from "@/components/utils/options";
import { getServerSession } from "next-auth";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { MenuS, MenuT } from "@/components/Class/SubjectMenu";

const SubjectCard = async () => {
    const session = await getServerSession(authOptions);

    const subjects = await getSubjects(session?.user.id as string);
    // if (!subjects.ok) return redirect('/not-found');
    if (!subjects.data) {
        if (session?.user.role === 'teacher') {
            return (
                <div className=" flex justify-center items-center w-full">
                    <h1 className=" text-2xl font-bold text-muted-foreground">
                        No subjects, Click on the button above to add a subject.
                    </h1>
                </div>
            )
        } else {
            return (
                <div className=" flex justify-center items-center w-full">
                    <h1 className=" text-2xl font-bold text-muted-foreground">
                        Not enrolled in any subjects.
                    </h1>
                </div>
            )
        }
    }

    return (
        <div className=" p-2">
            <div className=" flex gap-2 flex-wrap justify-center md:justify-start">{
                subjects.data.map(async (subject) => {
                    
                    const count = await getTotalStudents(subject.id)
                    subject.total_students = count.data as number

                    return (
                    <Card key={subject.id} className=" w-[18rem]">
                        <CardHeader>
                            <div className=" flex justify-between pr-2 ">
                                <div className=" space-y-2">
                                    <Link href={`/class/${subject.id}`} className=" hover:underline">
                                        <CardTitle>
                                            {subject.name}
                                        </CardTitle>
                                    </Link>

                                </div>
                                <div className=" self-start -mt-3 -mr-5">
                                    {session?.user.role === 'teacher' ? (<MenuT subject={subject} />) : (<MenuS subject={subject} />)}
                                </div>
                            </div>
                        </CardHeader>
                        {/* <Separator className=" -mt-2 mb-2" /> */}
                        <CardContent>
                            <CardDescription>{subject.description}</CardDescription>
                            <p className="text-sm text-muted-foreground">Prof. {subject.teacher_name}</p>
                        </CardContent>
                        <Separator className=" -mt-2 mb-2" />
                        <CardFooter>
                            <div className=" flex justify-between w-full">
                                <p className="text-sm">Total Students: </p>
                                <p className="text-sm">{subject.total_students >= 99 ? "+99" : subject.total_students.toString()}</p>
                            </div>
                        </CardFooter>
                    </Card>)
                })
            }
            </div>
        </div>
    )
}

export default SubjectCard