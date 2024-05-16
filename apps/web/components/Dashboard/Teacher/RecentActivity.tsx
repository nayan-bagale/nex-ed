import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { BookPlus, CheckCircle2, ChevronDown, Loader2, PictureInPicture, PictureInPicture2, Table2Icon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const RecentActivity = () => {
    return (
        <div className=' flex flex-col gap-4'>
            <div>
                <div className=' relative mb-4 flex flex-col gap-2'>
                    <Badge className=' w-fit '>
                        Feb 28, 2024
                    </Badge>
                    <Separator className=' absolute bottom-[50%] -z-10 flex items-center' />
                </div>
                <div className='flex  gap-6 ml-2 '>
                    <div className=' relative'>
                        <Separator orientation='vertical' />
                        <div className=' absolute top-0 -right-3 p-1 bg-secondary rounded-full '>
                            <span>
                                <CheckCircle2 className='h-5 w-5' />
                            </span>
                        </div>
                    </div>
                    <div className=' flex flex-col gap-2'>
                        <h2 className=' flex items-center'>
                            Attendace: 10/10
                        </h2>
                        <p className=' ml-2 text-muted-foreground text-sm'> Blockchain: 3/3 </p>
                        <p className=' ml-2 text-muted-foreground text-sm'> DLT: 1/0 </p>
                    </div>
                </div>
            </div>
            {/* <div>
                <div className=' relative mb-4 flex flex-col gap-2'>
                    <Badge className=' w-fit '>
                        Apr 22, 2024
                    </Badge>
                    <Separator className=' absolute bottom-[50%] -z-10 flex items-center' />
                </div>
                <div className=''>
                    <div className='flex gap-6 ml-2 '>
                        <div className=' relative'>
                            <Separator orientation='vertical' />
                            <div className=' absolute top-0 -right-3 p-1 bg-secondary rounded-full '>
                                <span>
                                    <Table2Icon className='h-5 w-5' />
                                </span>
                            </div>
                        </div>
                        <div className=' flex flex-col gap-2 pb-4'>
                            <div className=' flex items-center'>
                                <h2>
                                    New Post Created
                                </h2>
                            </div>
                            <p className=' ml-2 text-muted-foreground text-sm'> New Blockchain </p>
                            <p className=' ml-2 text-muted-foreground text-sm'> OOAD Post </p>
                        </div>
                    </div>
                    <div className='flex gap-6 ml-2 '>
                        <div className=' relative'>
                            <Separator orientation='vertical' />
                            <div className=' absolute top-0 -right-3 p-1 bg-secondary rounded-full '>
                                <span>
                                    <BookPlus className='h-5 w-5' />
                                </span>
                            </div>
                        </div>
                        <div className=' flex flex-col gap-2 pb-4'>
                            <div className=' flex items-center'>
                                <h2>
                                    New Subject Added {' '}
                                </h2>
                                <p className=' text-sm'>
                                    : <Link href={'/class/403002a986'}>
                                        <Button className=' p-0 italic underline' variant={'link'}>
                                            OOAD
                                        </Button>
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className='flex gap-6 ml-2 '>
                        <div className=' relative'>
                            <Separator orientation='vertical' />
                            <div className=' absolute top-0 -right-3 p-1 bg-secondary rounded-full '>
                                <span>
                                    <CheckCircle2 className='h-5 w-5' />
                                </span>
                            </div>
                        </div>
                        <div className=' flex flex-col gap-2'>
                            <h2 className=' flex items-center'>
                                Attendace: 10/10
                            </h2>
                            <p className=' ml-2 text-muted-foreground text-sm'> Blockchain: 3/3 </p>
                            <p className=' ml-2 text-muted-foreground text-sm'> DLT: 1/0 </p>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <div className=' relative mb-4 flex flex-col gap-2'>
                    <Badge className=' w-fit '>
                        Apr 22, 2024
                    </Badge>
                    <Separator className=' absolute bottom-[50%] -z-10 flex items-center' />
                </div>
                <div className=''>
                    <div className='flex gap-6 ml-2 '>
                        <div className=' relative'>
                            <Separator orientation='vertical' />
                            <div className=' absolute top-0 -right-3 p-1 bg-secondary rounded-full '>
                                <span>
                                    <PictureInPicture className='h-5 w-5' />
                                </span>
                            </div>
                        </div>
                        <div className=' flex flex-col gap-2 pb-4'>
                            <div className=' flex items-center'>
                                <h2>
                                    New Meeting Scheduled
                                </h2>
                            </div>
                            <p className=' ml-2 text-muted-foreground text-sm'>
                                OOAd 1st lecture 3:34 AM: <Link href={'/meeting'}>
                                    <Button variant={'link'} className='p-0 underline italic' >Link</Button>
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className=' flex items-center justify-center'>
                <Button>
                    <ChevronDown className=' mr-2 h-4 w-4' />
                    <span>
                        Load More
                    </span>
                    <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                </Button>
            </div> */}

        </div>
    )
}

export default RecentActivity