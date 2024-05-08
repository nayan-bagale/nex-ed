import { get_subject_Action } from "@/action/subject_Action";
import JoinForm from "@/components/Class/Join/JoinForm";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { redirect } from "next/navigation";


const page = async ({ params }: { params: { subject_id: string } }) => {

    if (params.subject_id.length !== 10) return redirect('/not-found');

    const data = await get_subject_Action(params.subject_id);

    if (!data.ok || !data.data) {
        return redirect('/not-found');
    }

    const subject = data?.data.find((sub) => sub.id === params.subject_id)

    
    return (
        
        <div className="flex-1 space-y-4 p-4 pt-4">
            
            <div className="flex items-start justify-between">
                <Heading title={`Join ${subject?.name}`} description={`${subject?.description}`} />
            </div>
            <Separator />
            <div className="flex flex-col space-y-4">
                <div className="flex flex-col space-y-4">
                    <div className="flex items-center justify-between">
                        <h2>Teacher:</h2>
                        <h3>Prof. {subject?.teacher}</h3>
                    </div>
                    <div className="flex items-center justify-between">
                        <h2>Join Code</h2>
                        <h3>{subject?.id}</h3>
                    </div>
                </div>
            </div>
            <Separator />
            <JoinForm id={subject?.id as string} />
        </div>
        
    )
}

export default page