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
                            <BreadcrumbItem>
                                <BreadcrumbPage>{item?.title}</BreadcrumbPage>
                            </BreadcrumbItem>
                        )
                    }
                    return (
                        <>
                            <BreadcrumbItem>
                                <BreadcrumbLink href={item?.link}>{item?.title}</BreadcrumbLink>
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