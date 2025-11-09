import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import { LuArrowDown, LuArrowUp, LuEllipsis } from "react-icons/lu";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { AdminPaginationEnquiries } from './admin-pagination';
import { LuArrowUpRight } from "react-icons/lu";
import { IconContext } from 'react-icons';
import { XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend, Area, AreaChart } from 'recharts';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
    DialogClose
} from "@/components/ui/dialog";
import { MdLocalPhone } from 'react-icons/md';
import { IoMdMail, IoLogoFacebook } from 'react-icons/io';
import { RiInstagramFill } from 'react-icons/ri';
import { AiOutlineTikTok } from "react-icons/ai";
import { LuUpload } from "react-icons/lu";
import { LuUser } from 'react-icons/lu';
import { LuLock } from 'react-icons/lu';
import { CarsTable } from './inventory-car';
import { useContext, useEffect, useState } from 'react';
import CarsContext from '@/contexts/cars';
import EnquiriesContext from '@/contexts/enquiries';
import TotalEnquiriesContext from '@/contexts/totalEnquiries';
import PageContext from '@/contexts/page';
import TablistEnquiriesContext from '@/contexts/tablist-enquiries';
import type { TotalEnquiriesContextProp, TBusinessInfo, TChartData, TRecentSales, Enquiry } from '@/lib/types';
import { getEnquiriesData } from '@/lib/utils';
import AlertErrorContext from '@/contexts/alert-error';
import { Skeleton } from './skeleton';
import { BlackSpinner } from './spinner';
import Spinner from './spinner';
import { getFetchUrl, getBusinessInfo, getDashboardInfo, deleteEnquiry, resolveEnquiry } from '@/lib/utils';
import AlertSuccessContext from '@/contexts/alert-success';
import type { MouseEvent, ChangeEvent } from 'react';

export function AdminInventoryMain() {
    const cars = useContext(CarsContext)?.cars;

    return (
        <div className={`border border-very-dark-gray rounded-md p-4 lg:p-8 bg-black flex flex-col gap-y-${cars === undefined ? '4' : '8'}`}>
            <div>
                <h1 className="text-secondary text-xl sm:text-xl md:text-2xl lg:text-2xl font-bold">Car Inventory</h1>
                <p className="text-medium-gray text-sm pt-2 lg:pt-1">Organize your vehicles and monitor how your listings are doing.</p>
            </div>
            <CarsTable />
        </div>
    )
}

export function AdminEnquiriesMain() {
    const enquiries = useContext(EnquiriesContext)?.enquiries;
    const setEnquiries = useContext(EnquiriesContext)?.setEnquiries;
    const { setTotalEnquiries } = useContext(TotalEnquiriesContext) as TotalEnquiriesContextProp;
    const { page, setPage } = useContext(PageContext);
    const { tablist } = useContext(TablistEnquiriesContext);
    const [, setIsError] = useContext(AlertErrorContext);
    const [, setIsSuccess] = useContext(AlertSuccessContext);
    const [isResolveButtonLoading, setIsResolveButtonLoading] = useState(false);
    const [isDeleteButtonLoading, setIsDeleteButtonLoading] = useState(false);

    useEffect(() => {
        getEnquiriesData({ page, setEnquiries, setIsError, setTotalEnquiries, tablist })
    }, [page, tablist]);

    // async function resolveEnquiry(e: MouseEvent) {
    //     const elem = e.target as Element;
    //     const id = elem.id.split('-')[1];
    //     setIsResolveButtonLoading(true);
    //     try {
    //         const response = await fetch(getFetchUrl('api/enquiries'), {
    //             method: 'PATCH',
    //             headers: { "Content-Type": "application/json" },
    //             body: JSON.stringify({ id, page, tablist }),
    //             credentials: 'include'
    //         })
    //         const data = await response.json();
    //         if (!data.success) {
    //             throw new Error(data.errorMessage);
    //         }
    //         console.log('Success')
    //         setIsSuccess({ success: true, successMessage: 'The enquiry has been resolved' });
    //         setEnquiries && setEnquiries(data.enquiries)
    //         setTotalEnquiries(data.totalEnquiries);
    //     } catch (error) {
    //         console.error(error);
    //         setIsError({ error: true, errorMessage: error instanceof Error ? error.message : 'An unexpected error occurred' });
    //     }
    //     setIsResolveButtonLoading(false);
    // }

    // async function deleteEnquiry(e: MouseEvent) {
    //     const elem = e.target as Element;
    //     const id = elem.id.split('-')[1];
    //     setIsDeleteButtonLoading(true);
    //     try {
    //         const response = await fetch(getFetchUrl('api/enquiries'), {
    //             method: 'DELETE',
    //             headers: { "Content-Type": "application/json" },
    //             body: JSON.stringify({ id, page, tablist }),
    //             credentials: "include"
    //         })
    //         const data = await response.json();
    //         if (!data.success) {
    //             throw new Error(data.errorMessage);
    //         }
    //         setEnquiries && setEnquiries(data.enquiries);
    //         setTotalEnquiries(data.totalEnquiries);
    //         setIsSuccess({ success: true, successMessage: 'Enquiry deleted successfully' });
    //     } catch (error) {
    //         console.error(error);
    //         setIsError({ error: true, errorMessage: error instanceof Error ? error.message : 'An unexpected error occurred' });
    //     }
    //     setIsDeleteButtonLoading(false);
    // }

    if (enquiries === undefined) {
        return (
            <>
                <Table>
                    <TableHeader className=''>
                        <TableRow className='hover:bg-primary [&>*]:text-medium-gray [&>*]:font-semibold border-very-dark-gray w-full'>
                            <TableHead>Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead></TableHead>
                        </TableRow>
                    </TableHeader>
                </Table>
                <Skeleton className='h-12 w-[100%] bg-very-dark-gray'></Skeleton>
                <Skeleton className='h-12 w-[100%] bg-very-dark-gray'></Skeleton>
                <Skeleton className='h-12 w-[100%] bg-very-dark-gray'></Skeleton>
                <Skeleton className='h-12 w-[100%] bg-very-dark-gray'></Skeleton>
                <Skeleton className='h-12 w-[100%] bg-very-dark-gray'></Skeleton>
                <AdminPaginationEnquiries page={page} setPage={setPage} />
            </>
        )
    }

    if (enquiries.length > 0) {
        return (
            <div className="border border-very-dark-gray rounded-md p-4 lg:p-8 bg-black flex flex-col gap-y-8">
                <div>
                    <h1 className="text-secondary text-xl sm:text-xl md:text-2xl lg:text-2xl font-bold">Customer Enquiries</h1>
                    <p className="text-medium-gray text-sm pt-2 lg:pt-1">View and manage all customer messages in one place</p>
                </div>
                <div>
                    <Table>
                        <TableHeader>
                            <TableRow className='hover:bg-primary [&>*]:text-light-gray [&>*]:font-semibold border-very-dark-gray w-full'>
                                <TableHead>Name</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody className='w-full'>
                            {enquiries.map(e => {
                                return (
                                    <TableRow key={e._id} className='hover:bg-primary [&>*]:text-medium-gray [&>*]:py-4 border-very-dark-gray'>
                                        <TableCell>
                                            {e.name}
                                        </TableCell>
                                        <TableCell>
                                            {e.email}
                                        </TableCell>
                                        <TableCell>
                                            {new Date(e.createdAt).getDate()}/{new Date(e.createdAt).getMonth() + 1}/{new Date(e.createdAt).getFullYear()}
                                        </TableCell>
                                        <TableCell>
                                            <span className={`font-bold ${e.status === 'Pending' ? 'text-warning' : 'text-success'} text-xs px-2 py-1`}>
                                                {e.status}
                                            </span>
                                        </TableCell>
                                        <TableCell>
                                            <Popover>
                                                <PopoverTrigger><LuEllipsis /></PopoverTrigger>
                                                <PopoverContent className='w-30 flex flex-col p-1 [&>*]:p-2 [&>*]:text-sm bg-black text-medium-gray border-very-dark-gray [&>*]:hover:bg-primary mr-4 md:mr-0'>
                                                    <div className='font-semibold text-secondary'>Actions</div>
                                                    <Dialog>
                                                        <DialogTrigger>View Message</DialogTrigger>
                                                        <DialogContent className='bg-black border-very-dark-gray flex flex-col gap-y-8'>
                                                            <DialogHeader className='flex flex-col gap-y-4'>
                                                                <DialogTitle className='text-secondary text-start h-fit'>{e.name}</DialogTitle>
                                                                <DialogDescription className='text-medium-gray text-start'>
                                                                    {e.message}
                                                                </DialogDescription>
                                                            </DialogHeader>
                                                            <DialogFooter className='flex items-end'>
                                                                <DialogClose className='flex justify-end gap-x-4 w-[50%]'>
                                                                    {e.status === 'Completed' ? <div role="button" className='border border-dark-gray text-black text-sm px-2 py-1 bg-dark-gray rounded-sm font-semibold w-[50%] flex items-center justify-center'>Resolved</div> : <div role="button" onClick={!isResolveButtonLoading ? (e) => resolveEnquiry(e, setIsResolveButtonLoading, setIsSuccess, setIsError, setEnquiries, page, tablist, setTotalEnquiries) : undefined} id={`resolve-${e._id}`} className='border text-black text-sm px-2 py-1 bg-secondary rounded-sm font-semibold w-[50%] flex items-center justify-center'>{isResolveButtonLoading ? <BlackSpinner /> : 'Resolve'}</div>}
                                                                    <a href={`mailto:${e.email}?subject=${encodeURIComponent('Re: Your recent enquiry')}`} className='border text-black text-sm px-2 py-1 bg-secondary rounded-sm font-semibold w-[50%] flex items-center justify-center border'>Reply</a>
                                                                </DialogClose>
                                                            </DialogFooter>
                                                        </DialogContent>
                                                    </Dialog>
                                                    <button onClick={(e) => deleteEnquiry(e, setIsDeleteButtonLoading, setEnquiries, setIsSuccess, setIsError, page, tablist, setTotalEnquiries)} id={`delete-${e._id}`} className={`text-accent-color ${isDeleteButtonLoading ? 'flex items-center justify-center' : 'text-start'}`}>{isDeleteButtonLoading ? <Spinner /> : 'Delete'}</button>
                                                </PopoverContent>
                                            </Popover>
                                        </TableCell>
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                </div>
                <AdminPaginationEnquiries page={page} setPage={setPage} />
            </div>
        )
    }

    if (enquiries.length === 0) {
        if (tablist === 'Completed') {
            return <div className='text-medium-gray'>No resolved enquiries yet — once you’ve handled some, they’ll show up here.</div>
        } else return <div className='text-medium-gray'>No enquiries yet — you’ll see them here once people start reaching out.</div>
    }

}

export function AdminDashboardMain() {
    const [, setIsError] = useContext(AlertErrorContext);
    const [, setIsSuccess] = useContext(AlertSuccessContext);
    const [tCars, setTCars] = useState<null | number>(null);
    const [tSales, setTSales] = useState<null | number>(null);
    const [tEnquiries, setTEnquiries] = useState<null | number>(null);
    const [percentageChangeOfSales, setPercentageChangeOfSales] = useState<null | number>(null);
    const [percentageChangeOfCars, setPercentageChangeOfCars] = useState<null | number>(null);
    const [percentageChangeOfEnquiries, setPercentageChangeOfEnquiries] = useState<null | number>(null);
    const [chartData, setChartData] = useState<null | TChartData[]>(null);
    const [recentSales, setRecentSales] = useState<null | TRecentSales[]>(null);
    const [recentEnquiries, setRecentEnquiries] = useState<undefined | Enquiry[]>(undefined);

    console.log(recentEnquiries);

    useEffect(() => {
        getDashboardInfo({ setTCars, setTEnquiries, setIsError, setTSales, setPercentageChangeOfSales, setPercentageChangeOfCars, setPercentageChangeOfEnquiries, setChartData, setRecentSales, setRecentEnquiries });
    }, [])

    function RenderPercentageChangeOfSales({ percentageChangeOfSales }: { percentageChangeOfSales: null | number }) {
        if (percentageChangeOfSales === null) return <Skeleton className='h-4 w-8 bg-very-dark-gray rounded-sm'></Skeleton>
        if (percentageChangeOfSales > 0) return (
            <div className='w-fit flex items-center text-success text-[0.7rem]'>
                <IconContext.Provider value={{ className: '' }}>
                    <LuArrowUp />
                </IconContext.Provider>
                <span>{percentageChangeOfSales}%</span>
            </div>)
        if (percentageChangeOfSales < 0) return (
            <div className='w-fit flex items-center text-accent-color text-[0.7rem]'>
                <IconContext.Provider value={{ className: '' }}>
                    <LuArrowDown />
                </IconContext.Provider>
                <span>{percentageChangeOfSales}%</span>
            </div>
        )

        if (percentageChangeOfSales === 0) return (
            <div className='w-fit flex items-center text-medium-gray text-[0.7rem]'>
                <span>{percentageChangeOfSales}%</span>
            </div>
        )
    }

    function RenderPercentageChangeOfCars({ percentageChangeOfCars }: { percentageChangeOfCars: null | number }) {
        if (percentageChangeOfCars === null) return <Skeleton className='h-4 w-8 bg-very-dark-gray rounded-sm'></Skeleton>
        if (percentageChangeOfCars > 0) return (
            <div className='w-fit flex items-center text-success text-[0.7rem]'>
                <IconContext.Provider value={{ className: '' }}>
                    <LuArrowUp />
                </IconContext.Provider>
                <span>{percentageChangeOfCars}%</span>
            </div>)
        if (percentageChangeOfCars < 0) return (
            <div className='w-fit flex items-center text-accent-color text-[0.7rem]'>
                <IconContext.Provider value={{ className: '' }}>
                    <LuArrowDown />
                </IconContext.Provider>
                <span>{percentageChangeOfCars}%</span>
            </div>
        )

        if (percentageChangeOfCars === 0) return (
            <div className='w-fit flex items-center text-medium-gray text-[0.7rem]'>
                <span>{percentageChangeOfCars}%</span>
            </div>
        )
    }

    function RenderPercentageChangeOfEnquiries({ percentageChangeOfEnquiries }: { percentageChangeOfEnquiries: null | number }) {
        if (percentageChangeOfEnquiries === null) return <Skeleton className='h-4 w-8 bg-very-dark-gray rounded-sm'></Skeleton>
        if (percentageChangeOfEnquiries > 0) return (
            <div className='w-fit flex items-center text-success text-[0.7rem]'>
                <IconContext.Provider value={{ className: '' }}>
                    <LuArrowUp />
                </IconContext.Provider>
                <span>{percentageChangeOfEnquiries}%</span>
            </div>)
        if (percentageChangeOfEnquiries < 0) return (
            <div className='w-fit flex items-center text-accent-color text-[0.7rem]'>
                <IconContext.Provider value={{ className: '' }}>
                    <LuArrowDown />
                </IconContext.Provider>
                <span>{percentageChangeOfEnquiries}%</span>
            </div>
        )

        if (percentageChangeOfEnquiries === 0) return (
            <div className='w-fit flex items-center text-medium-gray text-[0.7rem]'>
                <span>{percentageChangeOfEnquiries}%</span>
            </div>
        )
    }

    function RenderRecentSalesTable() {
        if (recentSales === null) {
            return (
                <>
                    <Table>
                        <TableHeader className=''>
                            <TableRow className='hover:bg-primary [&>*]:text-medium-gray [&>*]:font-semibold border-very-dark-gray w-full'>
                                <TableHead>Name</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Price</TableHead>
                                <TableHead>Created at</TableHead>
                                <TableHead></TableHead>
                            </TableRow>
                        </TableHeader>
                    </Table>
                    <div className="flex flex-col gap-y-4">
                        <Skeleton className='h-12 w-[100%] bg-very-dark-gray'></Skeleton>
                        <Skeleton className='h-12 w-[100%] bg-very-dark-gray'></Skeleton>
                        <Skeleton className='h-12 w-[100%] bg-very-dark-gray'></Skeleton>
                        <Skeleton className='h-12 w-[100%] bg-very-dark-gray'></Skeleton>
                        <Skeleton className='h-12 w-[100%] bg-very-dark-gray'></Skeleton>
                    </div>
                </>
            )
        }

        if (recentSales.length > 0) {
            return (
                <Table className=''>
                    <TableHeader className=''>
                        <TableRow className='hover:bg-primary [&>*]:text-light-gray [&>*]:font-semibold border-very-dark-gray w-full'>
                            <TableHead>Name</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead>Mileage</TableHead>
                            <TableHead>Transmission</TableHead>
                            <TableHead>Fuel Type</TableHead>
                            <TableHead>Sold at</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody className='w-full'>
                        {recentSales.map(c => {
                            return (
                                <TableRow id={`car-${c._id}`} key={c._id} className='hover:bg-primary [&>*]:text-medium-gray [&>*]:py-4 border-very-dark-gray'>
                                    <TableCell className='flex items-center gap-x-4 min-w-60 sm:min-w-50' style={{ overflowX: 'auto', scrollbarWidth: 'none' }}>
                                        <img className='rounded-sm' width={64} height={64} src={c.images[0]} />
                                        <span className='font-bold text-secondary'>{c.make} {c.model} {c.year}</span>
                                    </TableCell>
                                    <TableCell>
                                        <span className='font-bold rounded-full border border-very-dark-gray text-xs px-2 py-1'>
                                            {c.status}
                                        </span>
                                    </TableCell>
                                    <TableCell>
                                        £{c.price}
                                    </TableCell>
                                    <TableCell>{c.mileage}</TableCell>
                                    <TableCell>{c.transmission}</TableCell>
                                    <TableCell>{c.fuelType}</TableCell>
                                    <TableCell>
                                        {new Date(c.soldAt).getDate()}/{new Date(c.soldAt).getMonth() + 1}/{new Date(c.soldAt).getFullYear()}
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            )
        }

        if (recentSales.length === 0) {
            return <div className='text-medium-gray'>No recent sales yet — new sales will appear here</div>
        }
    }

    function RenderRecentEnquiriesTable() {
        const [isDeleteButtonLoading, setIsDeleteButtonLoading] = useState(false);
        const [isResolveButtonLoading, setIsResolveButtonLoading] = useState(false);

        if (recentEnquiries === undefined) {
            return (
                <>
                    <Table>
                        <TableHeader className=''>
                            <TableRow className='hover:bg-primary [&>*]:text-medium-gray [&>*]:font-semibold border-very-dark-gray w-full'>
                                <TableHead>Name</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead></TableHead>
                            </TableRow>
                        </TableHeader>
                    </Table>
                    <div className="flex flex-col gap-y-4">
                        <Skeleton className='h-12 w-[100%] bg-very-dark-gray'></Skeleton>
                        <Skeleton className='h-12 w-[100%] bg-very-dark-gray'></Skeleton>
                        <Skeleton className='h-12 w-[100%] bg-very-dark-gray'></Skeleton>
                        <Skeleton className='h-12 w-[100%] bg-very-dark-gray'></Skeleton>
                        <Skeleton className='h-12 w-[100%] bg-very-dark-gray'></Skeleton>
                    </div>
                </>
            )
        }

        if (recentEnquiries.length > 0) {
            return (
                <Table>
                    <TableHeader>
                        <TableRow className='hover:bg-primary [&>*]:text-light-gray [&>*]:font-semibold border-very-dark-gray w-full'>
                            <TableHead>Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody className='w-full'>
                        {recentEnquiries.map(e => {
                            return (
                                <TableRow key={e._id} className='hover:bg-primary [&>*]:text-medium-gray [&>*]:py-4 border-very-dark-gray'>
                                    <TableCell>
                                        {e.name}
                                    </TableCell>
                                    <TableCell>
                                        {e.email}
                                    </TableCell>
                                    <TableCell>
                                        {new Date(e.createdAt).getDate()}/{new Date(e.createdAt).getMonth() + 1}/{new Date(e.createdAt).getFullYear()}
                                    </TableCell>
                                    <TableCell>
                                        <span className={`font-bold ${e.status === 'Pending' ? 'text-warning' : 'text-success'} text-xs px-2 py-1`}>
                                            {e.status}
                                        </span>
                                    </TableCell>
                                    <TableCell>
                                        <Popover>
                                            <PopoverTrigger><LuEllipsis /></PopoverTrigger>
                                            <PopoverContent className='w-30 flex flex-col p-1 [&>*]:p-2 [&>*]:text-sm bg-black text-medium-gray border-very-dark-gray [&>*]:hover:bg-primary mr-4 md:mr-0'>
                                                <div className='font-semibold text-secondary'>Actions</div>
                                                <Dialog>
                                                    <DialogTrigger>View Message</DialogTrigger>
                                                    <DialogContent className='bg-black border-very-dark-gray flex flex-col gap-y-8'>
                                                        <DialogHeader className='flex flex-col gap-y-4'>
                                                            <DialogTitle className='text-secondary text-start h-fit'>{e.name}</DialogTitle>
                                                            <DialogDescription className='text-medium-gray text-start'>
                                                                {e.message}
                                                            </DialogDescription>
                                                        </DialogHeader>
                                                        <DialogFooter className='flex items-end'>
                                                            <DialogClose className='flex justify-end gap-x-4 w-[50%]'>
                                                                {e.status === 'Completed' ? <div role="button" className='border border-dark-gray text-black text-sm px-2 py-1 bg-dark-gray rounded-sm font-semibold w-[50%] flex items-center justify-center'>Resolved</div> : <div role="button" onClick={!isResolveButtonLoading ? (e) => resolveEnquiry(e, setIsResolveButtonLoading, setIsSuccess, setIsError, setRecentEnquiries, 1, 'Pending') : undefined} id={`resolve-${e._id}`} className='border text-black text-sm px-2 py-1 bg-secondary rounded-sm font-semibold w-[50%] flex items-center justify-center'>{isResolveButtonLoading ? <BlackSpinner /> : 'Resolve'}</div>}
                                                                <a href={`mailto:${e.email}?subject=${encodeURIComponent('Re: Your recent enquiry')}`} className='border text-black text-sm px-2 py-1 bg-secondary rounded-sm font-semibold w-[50%] flex items-center justify-center border'>Reply</a>
                                                            </DialogClose>
                                                        </DialogFooter>
                                                    </DialogContent>
                                                </Dialog>
                                                <button onClick={(e) => deleteEnquiry(e, setIsDeleteButtonLoading, setRecentEnquiries, setIsSuccess, setIsError, 1, 'Pending')} id={`delete-${e._id}`} className={`text-accent-color ${isDeleteButtonLoading ? 'flex items-center justify-center' : 'text-start'}`}>{isDeleteButtonLoading ? <Spinner /> : 'Delete'}</button>
                                            </PopoverContent>
                                        </Popover>
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            )
        }

        if (recentEnquiries.length === 0) {
            return <div className='text-medium-gray'>No pending enquiries yet — you’ll see them here once people start reaching out.</div>
        }
    }

    return (
        <div className="lg:p-8 bg-primary flex flex-col gap-y-8">
            <div className='grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-x-4 gap-y-2 [&>*]:bg-black'>
                <div className='border border-very-dark-gray rounded-sm p-4 flex flex-col gap-y-4'>
                    <div className='flex justify-between items-center'>
                        <span className='text-medium-gray text-sm'>Total Cars</span>
                        <IconContext.Provider value={{ className: '' }}>
                            <LuArrowUpRight />
                        </IconContext.Provider>
                    </div>
                    {tCars !== null ? <div className='font-bold text-secondary text-2xl' style={{ overflowX: 'auto', scrollbarWidth: 'none' }}>{tCars}</div> : <Skeleton className='bg-very-dark-gray h-8 rounded-sm'></Skeleton>}
                    <div className='flex gap-x-2'>
                        <RenderPercentageChangeOfCars percentageChangeOfCars={percentageChangeOfCars} />
                        <span className='text-[0.7rem] text-medium-gray'>From last month</span>
                    </div>
                </div>
                <div className='border border-very-dark-gray rounded-sm p-4 flex flex-col gap-y-4'>
                    <div className='flex justify-between items-center'>
                        <span className='text-medium-gray text-sm'>Total Sales</span>
                        <IconContext.Provider value={{ className: '' }}>
                            <LuArrowUpRight />
                        </IconContext.Provider>
                    </div>
                    {tSales !== null ? <div className='font-bold text-secondary text-2xl' style={{ overflowX: 'auto', scrollbarWidth: 'none' }}>£{tSales}</div> : <Skeleton className='bg-very-dark-gray h-8 rounded-sm'></Skeleton>}
                    <div className='flex gap-x-2'>
                        <RenderPercentageChangeOfSales percentageChangeOfSales={percentageChangeOfSales} />
                        <span className='text-[0.7rem] text-medium-gray'>From last month</span>
                    </div>
                </div>
                <div className='border border-very-dark-gray rounded-sm p-4 flex flex-col gap-y-4'>
                    <div className='flex justify-between items-center'>
                        <span className='text-medium-gray text-sm'>Total Enquiries</span>
                        <IconContext.Provider value={{ className: '' }}>
                            <LuArrowUpRight />
                        </IconContext.Provider>
                    </div>
                    {tEnquiries !== null ? <div className='font-bold text-secondary text-2xl' style={{ overflowX: 'auto', scrollbarWidth: 'none' }}>{tEnquiries}</div> : <Skeleton className='bg-very-dark-gray h-8 rounded-sm'></Skeleton>}
                    <div className='flex gap-x-2'>
                        {<RenderPercentageChangeOfEnquiries percentageChangeOfEnquiries={percentageChangeOfEnquiries} />}
                        <span className='text-[0.7rem] text-medium-gray'>From last month</span>
                    </div>
                </div>
            </div>
            {chartData === null ? <Skeleton className='bg-very-dark-gray border border-very-dark-gray rounded-sm h-[200px] sm:h-[300px] lg:h-[500px] px-2 sm:p-4'></Skeleton> : <div className="chart-container bg-black border border-very-dark-gray rounded-sm h-[200px] sm:h-[300px] lg:h-[500px] px-2 sm:p-4">
                <ResponsiveContainer width={'100%'} height={'100%'}>
                    <AreaChart data={chartData}>
                        <Area name={'Total Sales'} type={'monotone'} stroke={'#920101'} strokeWidth={3} dataKey='amount' fill='#920101' fillOpacity={1} />
                        <XAxis tickMargin={16} dataKey={'date'} tick={{ fontSize: window.innerWidth >= 1024 ? '0.75rem' : '0.6rem', fill: 'white' }} />
                        <YAxis tickMargin={16} tick={{ fontSize: window.innerWidth >= 1024 ? '0.75rem' : '0.6rem', fill: 'white' }} />
                        <Tooltip />
                        <CartesianGrid strokeDasharray={''} stroke='gray' strokeWidth={'1'} vertical={false} strokeOpacity={0.2} />
                        <Legend verticalAlign='top' />
                    </AreaChart>
                </ResponsiveContainer>
            </div>}
            <div className='recent-container flex flex-col lg:flex-row lg:justify-between lg:gap-x-4 gap-y-4'>
                <div className='recent-sales-container bg-black border border-very-dark-gray rounded-sm p-4 md:p-8 lg:w-[50%]'>
                    <h1 className="text-secondary text-xl sm:text-xl md:text-2xl lg:text-2xl font-bold">Recent Sales</h1>
                    <div className='py-4'>
                        <RenderRecentSalesTable />
                    </div>
                </div>
                <div className='recent-enquiries-container bg-black border border-very-dark-gray rounded-sm p-4 md:p-8 lg:w-[50%]'>
                    <h1 className="text-secondary text-xl sm:text-xl md:text-2xl lg:text-2xl font-bold">Recent Enquiries</h1>
                    <div className='py-4'>
                        <RenderRecentEnquiriesTable />
                    </div>
                </div>
            </div>
        </div>
    )
}

export function AdminSettingsMain() {
    const [logo, setLogo] = useState<string>('');
    const [businessInfo, setBusinessInfo] = useState<TBusinessInfo | null>(null);
    const [isUploadButtonLoading, setisUploadButtonLoading] = useState(false);
    const [, setIsError] = useContext(AlertErrorContext);
    const [, setIsSuccess] = useContext(AlertSuccessContext);
    const [isEmailButtonLoading, setIsEmailButtonLoading] = useState(false);
    const [isPhoneButtonLoading, setIsPhoneButtonLoading] = useState(false);
    const [isInstagramLoading, setIsInstagramLoading] = useState(false);
    const [isFacebookLoading, setIsFacebookLoading] = useState(false);
    const [isTiktokLoading, setIsTiktokLoading] = useState(false);
    const [isCredentialsLoading, setIsCredentialsLoading] = useState(false);

    useEffect(() => {
        getBusinessInfo({ setLogo, setBusinessInfo, setIsError });
    }, [])

    function selectFile() {
        const logoInput = document.querySelector<HTMLInputElement>('.logo-input');
        logoInput && logoInput.click();
    }

    async function handleLogoUpload(e: ChangeEvent<HTMLInputElement>) {
        setisUploadButtonLoading(true);
        try {
            if (e.target.files && e.target.files.length > 0) {
                // Check size and mimetype
                const logoBlob = e.target.files[0];
                if (logoBlob.size > 10485760) {
                    throw new Error('File size is too large (maximum allowed size is 10 MB)');
                }
                if (!logoBlob.type.includes('image/')) {
                    throw new Error('Invalid file mimetype');
                }
                const formData = new FormData();
                formData.append('logo', logoBlob);
                const response = await fetch(getFetchUrl('api/logo'), {
                    method: 'POST',
                    credentials: 'include',
                    body: formData
                })
                const data = await response.json();
                if (!data.success) throw new Error(data.errorMessage);
                setLogo(data.url);
                setIsSuccess({ success: true, successMessage: 'Business logo has been updated' });
            }
        } catch (error) {
            console.error(error);
            setIsError({ error: true, errorMessage: error instanceof Error ? error.message : 'An unexpected error occurred' });
        }
        setisUploadButtonLoading(false);
    }

    async function updateBusinessEmail(e: MouseEvent) {
        e.preventDefault();
        setIsEmailButtonLoading(true);
        try {
            const email = document.querySelector<HTMLInputElement>('#business-email');
            if (!email || !email.value) throw new Error(email ? 'Please enter your email' : 'Email field not found');
            const response = await fetch(getFetchUrl('api/update/email'), {
                method: 'PATCH',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: email.value }),
                credentials: 'include'
            })
            const data = await response.json();
            if (!data.success) throw new Error(data.errorMessage);
            setIsSuccess({ success: true, successMessage: 'Business email has been updated successfully' });
        } catch (error) {
            console.error(error);
            setIsError({ error: true, errorMessage: error instanceof Error ? error.message : 'Failed to update business email' });
        }
        setIsEmailButtonLoading(false);
    }

    async function updateBusinessPhone(e: MouseEvent) {
        e.preventDefault();
        setIsPhoneButtonLoading(true);
        try {
            const phone = document.querySelector<HTMLInputElement>('#business-phone');
            if (!phone || !phone.value) throw new Error(phone ? 'Please enter your phone number' : 'Phone number field not found');
            const response = await fetch(getFetchUrl('api/update/phone'), {
                method: 'PATCH',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ phone: phone.value }),
                credentials: 'include'
            })
            const data = await response.json();
            if (!data.success) throw new Error(data.errorMessage);
            setIsSuccess({ success: true, successMessage: 'Business number has been updated successfully' });
        } catch (error) {
            console.error(error);
            setIsError({ error: true, errorMessage: error instanceof Error ? error.message : 'Failed to update business number' });
        }
        setIsPhoneButtonLoading(false);
    }

    async function updateInstagramProfileLink(e: MouseEvent) {
        e.preventDefault();
        setIsInstagramLoading(true);
        try {
            const instagram = document.querySelector<HTMLInputElement>('#business-instagram');
            if (!instagram || !instagram.value) throw new Error(instagram ? 'Please enter your instagram profile link' : 'Field not found');
            const response = await fetch(getFetchUrl('api/update/instagram'), {
                method: 'PATCH',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ instagramProfileLink: instagram.value }),
                credentials: 'include'
            })
            const data = await response.json();
            if (!data.success) throw new Error(data.errorMessage);
            setIsSuccess({ success: true, successMessage: 'Instagram profile link has been updated successfully' });
        } catch (error) {
            console.error(error);
            setIsError({ error: true, errorMessage: error instanceof Error ? error.message : 'Failed to update instagram profile link' });
        }
        setIsInstagramLoading(false);
    }

    async function updateFacebookProfileLink(e: MouseEvent) {
        e.preventDefault();
        setIsFacebookLoading(true);
        try {
            const facebook = document.querySelector<HTMLInputElement>('#business-facebook');
            if (!facebook || !facebook.value) throw new Error(facebook ? 'Please enter your facebook profile link' : 'Field not found');
            const response = await fetch(getFetchUrl('api/update/facebook'), {
                method: 'PATCH',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ facebookProfileLink: facebook.value }),
                credentials: 'include'
            })
            const data = await response.json();
            if (!data.success) throw new Error(data.errorMessage);
            setIsSuccess({ success: true, successMessage: 'Facebook profile link has been updated successfully' });
        } catch (error) {
            console.error(error);
            setIsError({ error: true, errorMessage: error instanceof Error ? error.message : 'Failed to update facebook profile link' });
        }
        setIsFacebookLoading(false);
    }

    async function updateTiktokProfileLink(e: MouseEvent) {
        e.preventDefault();
        setIsTiktokLoading(true);
        try {
            const tiktok = document.querySelector<HTMLInputElement>('#business-tiktok');
            if (!tiktok || !tiktok.value) throw new Error(tiktok ? 'Please enter your tiktok profile link' : 'Field not found');
            const response = await fetch(getFetchUrl('api/update/tiktok'), {
                method: 'PATCH',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ tiktokProfileLink: tiktok.value }),
                credentials: 'include'
            })
            const data = await response.json();
            if (!data.success) throw new Error(data.errorMessage);
            setIsSuccess({ success: true, successMessage: 'Tiktok profile link has been updated successfully' });
        } catch (error) {
            console.error(error);
            setIsError({ error: true, errorMessage: error instanceof Error ? error.message : 'Failed to update tiktok profile link' });
        }
        setIsTiktokLoading(false);
    }

    async function updateCredentials(e: MouseEvent) {
        e.preventDefault();
        setIsCredentialsLoading(true);
        try {
            const currentPassword = document.querySelector<HTMLInputElement>('#current-password');
            const newUsername = document.querySelector<HTMLInputElement>('#new-username');
            const newPassword = document.querySelector<HTMLInputElement>('#new-password');
            const confirmNewPassword = document.querySelector<HTMLInputElement>('#confirm-new-password');

            if (!currentPassword || !newUsername || !newPassword || !confirmNewPassword) throw new Error('Field not found');
            if (!currentPassword.value || !newUsername.value || !newPassword.value || !confirmNewPassword.value) throw new Error('Please fill all fields');

            const response = await fetch(getFetchUrl('api/update/credentials'), {
                method: 'PATCH',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    currentPassword: currentPassword.value,
                    newUsername: newUsername.value,
                    newPassword: newPassword.value,
                    confirmNewPassword: confirmNewPassword.value
                }),
                credentials: 'include'
            })
            const data = await response.json();
            if (!data.success) throw new Error(data.errorMessage);
            currentPassword.value = '';
            newUsername.value = '';
            newPassword.value = '';
            confirmNewPassword.value = '';
            setIsSuccess({ success: true, successMessage: 'Login credentials has been updated successfully' });
        } catch (error) {
            console.error(error);
            setIsError({ error: true, errorMessage: error instanceof Error ? error.message : 'Failed to update login credentials' });
        }
        setIsCredentialsLoading(false);
    }

    return (
        <div className="md:p-8 bg-black flex flex-col gap-y-8 py-8 px-4 md:px-6 bg-primary">
            <div className='p-4 bg-black border border-very-dark-gray rounded-sm w-full md:w-[50%]'>
                <h1 className="text-secondary text-xl sm:text-xl md:text-2xl lg:text-2xl font-bold">Business Logo</h1>
                <p className='text-medium-gray text-sm'>Update your business logo</p>
                <div className='py-4 flex items-center gap-x-4'>
                    {logo ? <div className='w-15 h-15 border border-very-dark-gray rounded-full flex items-center p-2'>
                        <img className='max-w-full' src={logo} />
                    </div> : <Skeleton className='w-15 h-15 border border-very-dark-gray bg-very-dark-gray rounded-full flex items-center p-2'></Skeleton>}
                    <input onChange={handleLogoUpload} className={'logo-input w-0 h-0 absolute visibility-hidden'} type="file" accept='image/*' name="logo" />
                    <button disabled={isUploadButtonLoading} onClick={selectFile} className='text-secondary font-semibold border border-very-dark-gray rounded-sm p-2 bg-accent-color text-sm flex justify-center items-center w-[35%] sm:w-[20%] md:w-[35%]'>
                        {isUploadButtonLoading ? <Spinner /> : <>                      <IconContext.Provider value={{ className: '' }}>
                            <LuUpload />
                        </IconContext.Provider>
                            <span className='pl-2'>Upload</span></>}
                    </button>
                </div>
            </div>
            <div className='flex flex-col lg:flex-row gap-y-8 lg:gap-x-8'>
                <div className='lg:w-[50%] p-4 bg-black border border-very-dark-gray rounded-sm'>
                    <h1 className="text-secondary text-xl sm:text-xl md:text-2xl lg:text-2xl font-bold">Business Info</h1>
                    <p className='text-medium-gray text-sm'>Update your business info</p>
                    {businessInfo !== null ?
                        <form className='flex flex-col gap-y-4 py-8'>
                            <div>
                                <div className="flex justify-between items-center border border-very-dark-gray rounded-sm py-2 px-2 gap-x-4">
                                    <div className="flex items-center gap-x-2 w-[75%]">
                                        <div className="icon-wrapper border border-very-dark-gray bg-primary rounded-sm p-2">
                                            <IconContext.Provider value={{ className: 'text-accent-color size-6' }}>
                                                <IoMdMail />
                                            </IconContext.Provider>
                                        </div>
                                        <input type="email" id={'business-email'} className="text-secondary font-semibold text-sm focus:outline-none w-full" defaultValue={businessInfo.email} placeholder='Email Address' />
                                    </div>
                                    <button disabled={isEmailButtonLoading} onClick={(e) => updateBusinessEmail(e)} className="text-secondary font-semibold border border-very-dark-gray rounded-sm p-2 bg-accent-color text-sm w-[25%] flex items-center justify-center">{isEmailButtonLoading ? <Spinner /> : 'Update'}</button>
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between items-center border border-very-dark-gray rounded-sm py-2 px-2 gap-x-4">
                                    <div className="flex items-center gap-x-2 w-[75%]">
                                        <div className="icon-wrapper border border-very-dark-gray bg-primary rounded-sm p-2">
                                            <IconContext.Provider value={{ className: 'text-accent-color size-6' }}>
                                                <MdLocalPhone />
                                            </IconContext.Provider>
                                        </div>
                                        <input type={"text"} id={'business-phone'} className="text-secondary font-semibold text-sm focus:outline-none w-full" defaultValue={businessInfo.phone} placeholder='Phone Number' />
                                    </div>
                                    <button disabled={isPhoneButtonLoading} onClick={(e) => updateBusinessPhone(e)} className="text-secondary font-semibold border border-very-dark-gray rounded-sm p-2 bg-accent-color text-sm w-[25%] flex items-center justify-center">{isPhoneButtonLoading ? <Spinner /> : 'Update'}</button>
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between items-center border border-very-dark-gray rounded-sm py-2 px-2 gap-x-4">
                                    <div className="flex items-center gap-x-2 w-[75%]">
                                        <div className="icon-wrapper border border-very-dark-gray bg-primary rounded-sm p-2">
                                            <IconContext.Provider value={{ className: 'text-accent-color size-6' }}>
                                                <RiInstagramFill />
                                            </IconContext.Provider>
                                        </div>
                                        <input type={"text"} id={'business-instagram'} className="text-secondary font-semibold text-sm focus:outline-none w-full" defaultValue={businessInfo.instagramProfileLink} placeholder='Instagram Profile Link' />
                                    </div>
                                    <button disabled={isInstagramLoading} onClick={(e) => updateInstagramProfileLink(e)} className="text-secondary font-semibold border border-very-dark-gray rounded-sm p-2 bg-accent-color text-sm w-[25%] flex items-center justify-center">{isInstagramLoading ? <Spinner /> : 'Update'}</button>
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between items-center border border-very-dark-gray rounded-sm py-2 px-2 gap-x-4">
                                    <div className="flex items-center gap-x-2 w-[75%]">
                                        <div className="icon-wrapper border border-very-dark-gray bg-primary rounded-sm p-2">
                                            <IconContext.Provider value={{ className: 'text-accent-color size-6' }}>
                                                <IoLogoFacebook />
                                            </IconContext.Provider>
                                        </div>
                                        <input type={"text"} id={'business-facebook'} className="text-secondary font-semibold text-sm focus:outline-none w-full" defaultValue={businessInfo.facebookProfileLink} placeholder='Facebook Profile Link' />
                                    </div>
                                    <button disabled={isFacebookLoading} onClick={(e) => updateFacebookProfileLink(e)} className="text-secondary font-semibold border border-very-dark-gray rounded-sm p-2 bg-accent-color text-sm w-[25%] flex items-center justify-center">{isFacebookLoading ? <Spinner /> : 'Update'}</button>
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between items-center border border-very-dark-gray rounded-sm py-2 px-2 gap-x-4">
                                    <div className="flex items-center gap-x-2 w-[75%]">
                                        <div className="icon-wrapper border border-very-dark-gray bg-primary rounded-sm p-2">
                                            <IconContext.Provider value={{ className: 'text-accent-color size-6' }}>
                                                <AiOutlineTikTok />
                                            </IconContext.Provider>
                                        </div>
                                        <input type={"text"} id={'business-tiktok'} className="text-secondary font-semibold text-sm focus:outline-none w-full" defaultValue={businessInfo.tiktokProfleLink} placeholder='Tiktok Profile Link' />
                                    </div>
                                    <button disabled={isTiktokLoading} onClick={(e) => updateTiktokProfileLink(e)} className="text-secondary font-semibold border border-very-dark-gray rounded-sm p-2 bg-accent-color text-sm w-[25%] flex items-center justify-center">{isTiktokLoading ? <Spinner /> : 'Update'}</button>
                                </div>
                            </div>
                        </form> :
                        <div className='py-8 flex flex-col gap-y-4'>
                            <Skeleton className='py-4 h-15 bg-very-dark-gray rounded-sm' />
                            <Skeleton className='py-4 h-15 bg-very-dark-gray rounded-sm' />
                            <Skeleton className='py-4 h-15 bg-very-dark-gray rounded-sm' />
                            <Skeleton className='py-4 h-15 bg-very-dark-gray rounded-sm' />
                            <Skeleton className='py-4 h-15 bg-very-dark-gray rounded-sm' />
                        </div>}
                </div>
                <div className='lg:w-[50%] p-4 bg-black border border-very-dark-gray rounded-sm'>
                    <h1 className="text-secondary text-xl sm:text-xl md:text-2xl lg:text-2xl font-bold">Admin Credentials</h1>
                    <p className='text-medium-gray text-sm'>Update your login credentials</p>
                    <form className='flex flex-col gap-y-4 [&>div>div]:focus-within:border-accent-color py-8'>
                        <div className="flex flex-col gap-y-2">
                            <label htmlFor="current-password" className="text-medium-gray text-sm font-semibold">Current Password</label>
                            <div className="flex items-center border border-primary rounded-sm bg-primary p-3 md:p-4">
                                <IconContext.Provider value={{ className: 'text-dark-gray text-xl' }}><LuLock /></IconContext.Provider>
                                <input id="current-password" type="password" placeholder="Current Password" className="pl-2 sm:pl-4 w-full outline-none text-secondary focus:border-accent-color placeholder:text-dark-gray" />
                            </div>
                        </div>
                        <div className="flex flex-col gap-y-2">
                            <label htmlFor="new-username" className="text-medium-gray text-sm font-semibold">New Username</label>
                            <div className="flex items-center border border-primary rounded-sm bg-primary p-3 md:p-4">
                                <IconContext.Provider value={{ className: 'text-dark-gray text-xl' }}><LuUser /></IconContext.Provider>
                                <input id="new-username" type="text" placeholder="New Username" className="pl-2 sm:pl-4 w-full outline-none text-secondary focus:border-accent-color placeholder:text-dark-gray" />
                            </div>
                        </div>
                        <div className="flex flex-col gap-y-2">
                            <label htmlFor="new-password" className="text-medium-gray text-sm font-semibold">New Password</label>
                            <div className="flex items-center border border-primary rounded-sm bg-primary p-3 md:p-4">
                                <IconContext.Provider value={{ className: 'text-dark-gray text-xl' }}><LuLock /></IconContext.Provider>
                                <input id="new-password" type="password" placeholder="New Password" className="pl-2 sm:pl-4 w-full outline-none text-secondary focus:border-accent-color placeholder:text-dark-gray" />
                            </div>
                        </div>
                        <div className="flex flex-col gap-y-2">
                            <label htmlFor="confirm-new-password" className="text-medium-gray text-sm font-semibold">Confirm New Password</label>
                            <div className="flex items-center border border-primary rounded-sm bg-primary p-3 md:p-4">
                                <IconContext.Provider value={{ className: 'text-dark-gray text-xl' }}><LuLock /></IconContext.Provider>
                                <input id="confirm-new-password" type="password" placeholder="Confirm New Password" className="pl-2 sm:pl-4 w-full outline-none text-secondary focus:border-accent-color placeholder:text-dark-gray" />
                            </div>
                        </div>
                        <div>
                            <button disabled={isCredentialsLoading} onClick={(e) => updateCredentials(e)} id={'credentials-update-btn'} type='submit' className="w-full bg-accent-color p-3 md:p-4 rounded-sm border border-primary text-secondary font-semibold flex items-center justify-center">{isCredentialsLoading ? <Spinner /> : 'Update'}</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}