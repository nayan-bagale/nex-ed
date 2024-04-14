import Link from "next/link";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from "./ui/breadcrumb";

type BreadCrumbType = {
    title: string;
    link: string;
};

type BreadCrumbPropsType = {
    items: BreadCrumbType[];
};

export default function BreadCrumb({ items }: BreadCrumbPropsType) {
    return (<>
        <Breadcrumb>
            <BreadcrumbList>
                {items.map((item, index) => {
                    if(index === items.length-1){
                        return (
                            <BreadcrumbItem key={item?.title}>
                                <BreadcrumbPage>{item?.title}</BreadcrumbPage>
                            </BreadcrumbItem>
                        )
                    }
                    return (
                        <>
                            <BreadcrumbItem key={item?.title}>
                                <Link href={item?.link}>{item?.title}</Link>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                        </>
                    )
                })
                }

            </BreadcrumbList>
        </Breadcrumb>
    </>

    );
}