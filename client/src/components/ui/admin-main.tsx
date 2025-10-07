import renaultClio from '../../assets/featured-car-1-1.jpg';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import { LuEllipsis } from "react-icons/lu";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import AdminPagination from './admin-pagination';
import { LuArrowUpRight } from "react-icons/lu";
import { LuArrowUp } from "react-icons/lu";
import { IconContext } from 'react-icons';
import { XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend, Bar, BarChart } from 'recharts';
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
import businessLogo from "../../assets/logo-light.png";
import { LuUpload } from "react-icons/lu";
import { LuUser } from 'react-icons/lu';
import { LuLock } from 'react-icons/lu';

const chartData = [
    {
        date: 'S',
        amount: 41295
    },
    {
        date: 'M',
        amount: 59276
    },
    {
        date: 'T',
        amount: 35835
    },
    {
        date: 'W',
        amount: 40105
    },
    {
        date: 'T',
        amount: 60995
    },
    {
        date: 'F',
        amount: 28905
    },
    {
        date: 'S',
        amount: 61925
    }
]

export function AdminInventoryMain() {
    return (
        <div className="border border-very-dark-gray rounded-md p-4 lg:p-8 bg-black flex flex-col gap-y-8">
            <div>
                <h1 className="text-secondary text-xl sm:text-xl md:text-2xl lg:text-2xl font-bold">Car Inventory</h1>
                <p className="text-medium-gray text-sm pt-2 lg:pt-1">Organize your vehicles and monitor how your listings are doing.</p>
            </div>
            <div>
                <Table className=''>
                    <TableHeader className=''>
                        <TableRow className='hover:bg-primary [&>*]:text-medium-gray [&>*]:font-semibold border-very-dark-gray w-full'>
                            <TableHead>Name</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead>Total Sales</TableHead>
                            <TableHead>Created at</TableHead>
                            <TableHead></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody className='w-full'>
                        <TableRow className='hover:bg-primary [&>*]:text-medium-gray [&>*]:py-4 border-very-dark-gray'>
                            <TableCell className='flex items-center gap-x-4 min-w-50'>
                                <img className='rounded-sm' width={64} height={64} src={renaultClio} />
                                <span className='font-bold text-secondary'>Renault Clio</span>
                            </TableCell>
                            <TableCell>
                                <span className='font-bold text-secondary border rounded-full border-very-dark-gray text-xs px-2 py-1'>
                                    Active
                                </span>
                            </TableCell>
                            <TableCell>
                                £4,295
                            </TableCell>
                            <TableCell>
                                1,000
                            </TableCell>
                            <TableCell>
                                6/10/2025
                            </TableCell>
                            <TableCell>
                                <Popover>
                                    <PopoverTrigger><LuEllipsis /></PopoverTrigger>
                                    <PopoverContent className='w-30 flex flex-col p-1 [&>*]:p-2 [&>*]:text-sm bg-black text-medium-gray border-very-dark-gray [&>*]:hover:bg-primary'>
                                        <div className='font-semibold text-secondary'>Actions</div>
                                        <div>Edit</div>
                                        <div className='text-accent-color'>Delete</div>
                                    </PopoverContent>
                                </Popover>
                            </TableCell>
                        </TableRow>
                        <TableRow className='hover:bg-primary [&>*]:text-medium-gray [&>*]:py-4 border-very-dark-gray'>
                            <TableCell className='flex items-center gap-x-4 min-w-50'>
                                <img className='rounded-sm' width={64} height={64} src={renaultClio} />
                                <span className='font-bold text-secondary'>Renault Clio</span>
                            </TableCell>
                            <TableCell>
                                <span className='font-bold text-secondary border border-very-dark-gray rounded-full text-xs px-2 py-1'>
                                    Active
                                </span>
                            </TableCell>
                            <TableCell>
                                £4,295
                            </TableCell>
                            <TableCell>
                                1,000
                            </TableCell>
                            <TableCell>
                                6/10/2025
                            </TableCell>
                            <TableCell>
                                <Popover>
                                    <PopoverTrigger><LuEllipsis /></PopoverTrigger>
                                    <PopoverContent className='w-30 flex flex-col p-1 [&>*]:p-2 [&>*]:text-sm bg-black text-medium-gray border-very-dark-gray [&>*]:hover:bg-primary'>
                                        <div className='font-semibold text-secondary'>Actions</div>
                                        <div>Edit</div>
                                        <div className='text-accent-color'>Delete</div>
                                    </PopoverContent>
                                </Popover>
                            </TableCell>
                        </TableRow>
                        <TableRow className='hover:bg-primary [&>*]:text-medium-gray [&>*]:py-4 border-very-dark-gray'>
                            <TableCell className='flex items-center gap-x-4 min-w-50'>
                                <img className='rounded-sm' width={64} height={64} src={renaultClio} />
                                <span className='font-bold text-secondary'>Renault Clio</span>
                            </TableCell>
                            <TableCell>
                                <span className='font-bold text-secondary border border-very-dark-gray rounded-full text-xs px-2 py-1'>
                                    Active
                                </span>
                            </TableCell>
                            <TableCell>
                                £4,295
                            </TableCell>
                            <TableCell>
                                1,000
                            </TableCell>
                            <TableCell>
                                6/10/2025
                            </TableCell>
                            <TableCell>
                                <Popover>
                                    <PopoverTrigger><LuEllipsis /></PopoverTrigger>
                                    <PopoverContent className='w-30 flex flex-col p-1 [&>*]:p-2 [&>*]:text-sm bg-black text-medium-gray border-very-dark-gray [&>*]:hover:bg-primary'>
                                        <div className='font-semibold text-secondary'>Actions</div>
                                        <div>Edit</div>
                                        <div className='text-accent-color'>Delete</div>
                                    </PopoverContent>
                                </Popover>
                            </TableCell>
                        </TableRow>
                        <TableRow className='hover:bg-primary [&>*]:text-medium-gray [&>*]:py-4 border-very-dark-gray'>
                            <TableCell className='flex items-center gap-x-4 min-w-50'>
                                <img className='rounded-sm' width={64} height={64} src={renaultClio} />
                                <span className='font-bold text-secondary'>Renault Clio</span>
                            </TableCell>
                            <TableCell>
                                <span className='font-bold text-secondary border border-very-dark-gray rounded-full text-xs px-2 py-1'>
                                    Active
                                </span>
                            </TableCell>
                            <TableCell>
                                £4,295
                            </TableCell>
                            <TableCell>
                                1,000
                            </TableCell>
                            <TableCell>
                                6/10/2025
                            </TableCell>
                            <TableCell>
                                <Popover>
                                    <PopoverTrigger><LuEllipsis /></PopoverTrigger>
                                    <PopoverContent className='w-30 flex flex-col p-1 [&>*]:p-2 [&>*]:text-sm bg-black text-medium-gray border-very-dark-gray [&>*]:hover:bg-primary'>
                                        <div className='font-semibold text-secondary'>Actions</div>
                                        <div>Edit</div>
                                        <div className='text-accent-color'>Delete</div>
                                    </PopoverContent>
                                </Popover>
                            </TableCell>
                        </TableRow>
                        <TableRow className='hover:bg-primary [&>*]:text-medium-gray [&>*]:py-4 border-very-dark-gray'>
                            <TableCell className='flex items-center gap-x-4 min-w-50'>
                                <img className='rounded-sm' width={64} height={64} src={renaultClio} />
                                <span className='font-bold text-secondary'>Renault Clio</span>
                            </TableCell>
                            <TableCell>
                                <span className='font-bold text-secondary border border-very-dark-gray rounded-full text-xs px-2 py-1'>
                                    Active
                                </span>
                            </TableCell>
                            <TableCell>
                                £4,295
                            </TableCell>
                            <TableCell>
                                1,000
                            </TableCell>
                            <TableCell>
                                6/10/2025
                            </TableCell>
                            <TableCell>
                                <Popover>
                                    <PopoverTrigger><LuEllipsis /></PopoverTrigger>
                                    <PopoverContent className='w-30 flex flex-col p-1 [&>*]:p-2 [&>*]:text-sm bg-black text-medium-gray border-very-dark-gray [&>*]:hover:bg-primary'>
                                        <div className='font-semibold text-secondary'>Actions</div>
                                        <div>Edit</div>
                                        <div className='text-accent-color'>Delete</div>
                                    </PopoverContent>
                                </Popover>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
            <AdminPagination />
        </div>
    )
}

export function AdminDashboardMain() {
    function getBarSize() {
        if (window.innerWidth >= 1024) {
            return 75;
        } else if (window.innerWidth < 1024 && window.innerWidth > 640) {
            return 50;
        } else {
            return 25;
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
                    <div className='font-bold text-secondary text-2xl'>120</div>
                    <div className='flex gap-x-2'>
                        <div className='w-fit flex items-center text-success text-[0.7rem]'>
                            <IconContext.Provider value={{ className: '' }}>
                                <LuArrowUp />
                            </IconContext.Provider>
                            <span>5%</span>
                        </div>
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
                    <div className='font-bold text-secondary text-2xl'>£4,295</div>
                    <div className='flex gap-x-2'>
                        <div className='w-fit flex items-center text-success text-[0.7rem]'>
                            <IconContext.Provider value={{ className: '' }}>
                                <LuArrowUp />
                            </IconContext.Provider>
                            <span>12%</span>
                        </div>
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
                    <div className='font-bold text-secondary text-2xl'>30</div>
                    <div className='flex gap-x-2'>
                        <div className='w-fit flex items-center text-success text-[0.7rem]'>
                            <IconContext.Provider value={{ className: '' }}>
                                <LuArrowUp />
                            </IconContext.Provider>
                            <span>20%</span>
                        </div>
                        <span className='text-[0.7rem] text-medium-gray'>From last month</span>
                    </div>
                </div>
            </div>
            <div className="chart-container bg-black border border-very-dark-gray rounded-sm h-[200px] sm:h-[300px] lg:h-[500px] px-2 sm:p-4">
                <ResponsiveContainer width={'100%'} height={'100%'}>
                    <BarChart data={chartData}>
                        <Bar name={'Total Sales'} type={'monotone'} stroke={'#920101'} strokeWidth={3} dataKey='amount' fill='#920101' fillOpacity={1} barSize={getBarSize()} />
                        <XAxis tickMargin={16} dataKey={'date'} tick={{ fontSize: window.innerWidth >= 1024 ? '0.75rem' : '0.6rem', fill: 'white' }} />
                        <YAxis tickMargin={16} tick={{ fontSize: window.innerWidth >= 1024 ? '0.75rem' : '0.6rem', fill: 'white' }} />
                        <Tooltip />
                        <CartesianGrid strokeDasharray={''} stroke='gray' strokeWidth={'1'} vertical={false} strokeOpacity={0.2} />
                        <Legend verticalAlign='top' />
                    </BarChart>
                </ResponsiveContainer>
            </div>
            <div className='recent-container flex flex-col lg:flex-row lg:justify-between lg:gap-x-4 gap-y-4'>
                <div className='recent-sales-container bg-black border border-very-dark-gray rounded-sm p-4 md:p-8 lg:w-[50%]'>
                    <h1 className="text-secondary text-xl sm:text-xl md:text-2xl lg:text-2xl font-bold">Recent Sales</h1>
                    <div className='py-4'>
                        <Table className=''>
                            <TableHeader className=''>
                                <TableRow className='hover:bg-primary [&>*]:text-medium-gray [&>*]:font-semibold border-very-dark-gray w-full'>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Price</TableHead>
                                    <TableHead>Sold at</TableHead>
                                    <TableHead>Status</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody className='w-full'>
                                <TableRow className='hover:bg-primary [&>*]:text-medium-gray [&>*]:py-4 border-very-dark-gray'>
                                    <TableCell className='flex items-center gap-x-4 min-w-50'>
                                        <img className='rounded-sm' width={64} height={64} src={renaultClio} />
                                        <span className='font-bold text-secondary'>Renault Clio</span>
                                    </TableCell>
                                    <TableCell>
                                        £4,295
                                    </TableCell>
                                    <TableCell>
                                        6/10/2025
                                    </TableCell>
                                    <TableCell>
                                        <span className='font-bold text-success text-xs px-2 py-1'>
                                            Sold
                                        </span>
                                    </TableCell>
                                </TableRow>
                                <TableRow className='hover:bg-primary [&>*]:text-medium-gray [&>*]:py-4 border-very-dark-gray'>
                                    <TableCell className='flex items-center gap-x-4 min-w-50'>
                                        <img className='rounded-sm' width={64} height={64} src={renaultClio} />
                                        <span className='font-bold text-secondary'>Renault Clio</span>
                                    </TableCell>
                                    <TableCell>
                                        £4,295
                                    </TableCell>
                                    <TableCell>
                                        6/10/2025
                                    </TableCell>
                                    <TableCell>
                                        <span className='font-bold text-success text-xs px-2 py-1'>
                                            Sold
                                        </span>
                                    </TableCell>
                                </TableRow>
                                <TableRow className='hover:bg-primary [&>*]:text-medium-gray [&>*]:py-4 border-very-dark-gray'>
                                    <TableCell className='flex items-center gap-x-4 min-w-50'>
                                        <img className='rounded-sm' width={64} height={64} src={renaultClio} />
                                        <span className='font-bold text-secondary'>Renault Clio</span>
                                    </TableCell>
                                    <TableCell>
                                        £4,295
                                    </TableCell>
                                    <TableCell>
                                        6/10/2025
                                    </TableCell>
                                    <TableCell>
                                        <span className='font-bold text-success text-xs px-2 py-1'>
                                            Sold
                                        </span>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </div>
                </div>
                <div className='recent-enquiries-container bg-black border border-very-dark-gray rounded-sm p-4 md:p-8 lg:w-[50%]'>
                    <h1 className="text-secondary text-xl sm:text-xl md:text-2xl lg:text-2xl font-bold">Recent Enquiries</h1>
                    <div className='py-4'>
                        <Table className=''>
                            <TableHeader className=''>
                                <TableRow className='hover:bg-primary [&>*]:text-medium-gray [&>*]:font-semibold border-very-dark-gray w-full'>
                                    <TableHead>Customer Name</TableHead>
                                    <TableHead>Preferred Car</TableHead>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Contact Status</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody className='w-full'>
                                <TableRow className='hover:bg-primary [&>*]:text-medium-gray [&>*]:py-4 border-very-dark-gray'>
                                    <TableCell>
                                        Sarah K.
                                    </TableCell>
                                    <TableCell>
                                        Renault Clio
                                    </TableCell>
                                    <TableCell>
                                        6/10/2025
                                    </TableCell>
                                    <TableCell>
                                        <span className='font-bold text-success text-xs px-2 py-1'>
                                            Completed
                                        </span>
                                    </TableCell>
                                </TableRow>
                                <TableRow className='hover:bg-primary [&>*]:text-medium-gray [&>*]:py-4 border-very-dark-gray'>
                                    <TableCell>
                                        John Omello
                                    </TableCell>
                                    <TableCell>
                                        Ford Focus
                                    </TableCell>
                                    <TableCell>
                                        17/3/2025
                                    </TableCell>
                                    <TableCell>
                                        <span className='font-bold text-success text-xs px-2 py-1'>
                                            Completed
                                        </span>
                                    </TableCell>
                                </TableRow>
                                <TableRow className='hover:bg-primary [&>*]:text-medium-gray [&>*]:py-4 border-very-dark-gray'>
                                    <TableCell>
                                        Camillus Codes
                                    </TableCell>
                                    <TableCell>
                                        Ford EcoSports
                                    </TableCell>
                                    <TableCell>
                                        08/09/2025
                                    </TableCell>
                                    <TableCell>
                                        <span className='font-bold text-success text-xs px-2 py-1'>
                                            Completed
                                        </span>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </div>
        </div>
    )
}
export function AdminEnquiriesMain() {
    return (
        <div className="border border-very-dark-gray rounded-md p-4 lg:p-8 bg-black flex flex-col gap-y-8">
            <div>
                <h1 className="text-secondary text-xl sm:text-xl md:text-2xl lg:text-2xl font-bold">Customer Enquiries</h1>
                <p className="text-medium-gray text-sm pt-2 lg:pt-1">View and manage all customer messages in one place</p>
            </div>
            <div>
                <Table className=''>
                    <TableHeader className=''>
                        <TableRow className='hover:bg-primary [&>*]:text-medium-gray [&>*]:font-semibold border-very-dark-gray w-full'>
                            <TableHead>Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody className='w-full'>
                        <TableRow className='hover:bg-primary [&>*]:text-medium-gray [&>*]:py-4 border-very-dark-gray'>
                            <TableCell>
                                Sarah K.
                            </TableCell>
                            <TableCell>
                                Renault Clio
                            </TableCell>
                            <TableCell>
                                6/10/2025
                            </TableCell>
                            <TableCell>
                                <span className='font-bold text-success text-xs px-2 py-1'>
                                    Completed
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
                                                    <DialogTitle className='text-secondary text-start h-fit'>Sarah K.</DialogTitle>
                                                    <DialogDescription className='text-medium-gray text-start'>
                                                        “Hello, I’m interested in the 2021 Toyota Corolla listed on your website. Could you please provide more details about its mileage, service history, and available financing options? Thank you.”
                                                    </DialogDescription>
                                                </DialogHeader>
                                                <DialogFooter>
                                                    <DialogClose className='flex justify-end gap-x-4'>
                                                        <div role='button' className='border text-black text-sm px-2 py-1 bg-secondary rounded-sm font-semibold'>Resolve</div>
                                                        <div role="button" className='border text-black text-sm px-2 py-1 bg-secondary rounded-sm font-semibold'>Reply</div>
                                                    </DialogClose>
                                                </DialogFooter>
                                            </DialogContent>
                                        </Dialog>
                                        <div className='text-accent-color'>Delete</div>
                                    </PopoverContent>
                                </Popover>
                            </TableCell>
                        </TableRow>
                        <TableRow className='hover:bg-primary [&>*]:text-medium-gray [&>*]:py-4 border-very-dark-gray'>
                            <TableCell>
                                John Omello
                            </TableCell>
                            <TableCell>
                                Ford Focus
                            </TableCell>
                            <TableCell>
                                17/3/2025
                            </TableCell>
                            <TableCell>
                                <span className='font-bold text-success text-xs px-2 py-1'>
                                    Completed
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
                                                    <DialogTitle className='text-secondary text-start h-fit'>Sarah K.</DialogTitle>
                                                    <DialogDescription className='text-medium-gray text-start'>
                                                        “Hello, I’m interested in the 2021 Toyota Corolla listed on your website. Could you please provide more details about its mileage, service history, and available financing options? Thank you.”
                                                    </DialogDescription>
                                                </DialogHeader>
                                                <DialogFooter>
                                                    <DialogClose className='flex justify-end gap-x-4'>
                                                        <div role='button' className='border text-black text-sm px-2 py-1 bg-secondary rounded-sm font-semibold'>Resolve</div>
                                                        <div role="button" className='border text-black text-sm px-2 py-1 bg-secondary rounded-sm font-semibold'>Reply</div>
                                                    </DialogClose>
                                                </DialogFooter>
                                            </DialogContent>
                                        </Dialog>
                                        <div className='text-accent-color'>Delete</div>
                                    </PopoverContent>
                                </Popover>
                            </TableCell>
                        </TableRow>
                        <TableRow className='hover:bg-primary [&>*]:text-medium-gray [&>*]:py-4 border-very-dark-gray'>
                            <TableCell>
                                Camillus Codes
                            </TableCell>
                            <TableCell>
                                Ford EcoSports
                            </TableCell>
                            <TableCell>
                                08/09/2025
                            </TableCell>
                            <TableCell>
                                <span className='font-bold text-success text-xs px-2 py-1'>
                                    Completed
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
                                                    <DialogTitle className='text-secondary text-start h-fit'>Sarah K.</DialogTitle>
                                                    <DialogDescription className='text-medium-gray text-start'>
                                                        “Hello, I’m interested in the 2021 Toyota Corolla listed on your website. Could you please provide more details about its mileage, service history, and available financing options? Thank you.”
                                                    </DialogDescription>
                                                </DialogHeader>
                                                <DialogFooter>
                                                    <DialogClose className='flex justify-end gap-x-4'>
                                                        <div role='button' className='border text-black text-sm px-2 py-1 bg-secondary rounded-sm font-semibold'>Resolve</div>
                                                        <div role="button" className='border text-black text-sm px-2 py-1 bg-secondary rounded-sm font-semibold'>Reply</div>
                                                    </DialogClose>
                                                </DialogFooter>
                                            </DialogContent>
                                        </Dialog>
                                        <div className='text-accent-color'>Delete</div>
                                    </PopoverContent>
                                </Popover>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
            <AdminPagination />
        </div>
    )
}

export function AdminSettingsMain() {
    return (
        <div className="md:p-8 bg-black flex flex-col gap-y-8 py-8 px-4 md:px-6 bg-primary">
            <div className='p-4 bg-black border border-very-dark-gray rounded-sm'>
                <h1 className="text-secondary text-xl sm:text-xl md:text-2xl lg:text-2xl font-bold">Business Logo</h1>
                <p className='text-medium-gray text-sm'>Update your business logo</p>
                <div className='py-4 flex items-center gap-x-4'>
                    <div className='w-15 h-15 border border-very-dark-gray rounded-full flex items-center p-2'>
                        <img className='max-w-full' src={businessLogo} />
                    </div>
                    <button className='text-secondary font-semibold border border-very-dark-gray rounded-sm p-2 bg-accent-color text-sm flex items-center'>
                        <IconContext.Provider value={{ className: '' }}>
                            <LuUpload />
                        </IconContext.Provider>
                        <span className='pl-2'>Upload</span>
                    </button>
                </div>
            </div>
            <div className='flex flex-col lg:flew-row gap-y-8 lg:gap-x-16'>
                <div className='lg:w-[50%] p-4 bg-black border border-very-dark-gray rounded-sm'>
                    <h1 className="text-secondary text-xl sm:text-xl md:text-2xl lg:text-2xl font-bold">Business Info</h1>
                    <p className='text-medium-gray text-sm'>Update your business info</p>
                    <form className='flex flex-col gap-y-4 py-8'>
                        <div>
                            <div className="flex justify-between items-center border border-very-dark-gray rounded-sm py-2 px-2">
                                <div className="flex items-center gap-x-2 w-[75%]">
                                    <div className="icon-wrapper border border-very-dark-gray bg-primary rounded-sm p-2">
                                        <IconContext.Provider value={{ className: 'text-accent-color size-6' }}>
                                            <IoMdMail />
                                        </IconContext.Provider>
                                    </div>
                                    <input type="email" className="text-secondary font-semibold text-sm focus:outline-none w-full" defaultValue={"rmcarsales2005@gmail.com"} />
                                </div>
                                <button className="text-secondary font-semibold border border-very-dark-gray rounded-sm p-2 bg-accent-color text-sm w-[25%]">Update</button>
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between items-center border border-very-dark-gray rounded-sm py-2 px-2">
                                <div className="flex items-center gap-x-2 w-[75%]">
                                    <div className="icon-wrapper border border-very-dark-gray bg-primary rounded-sm p-2">
                                        <IconContext.Provider value={{ className: 'text-accent-color size-6' }}>
                                            <MdLocalPhone />
                                        </IconContext.Provider>
                                    </div>
                                    <input type={"text"} className="text-secondary font-semibold text-sm focus:outline-none w-full" defaultValue={"+44 151 382 9243"} />
                                </div>
                                <button className="text-secondary font-semibold border border-very-dark-gray rounded-sm p-2 bg-accent-color text-sm w-[25%]">Update</button>
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between items-center border border-very-dark-gray rounded-sm py-2 px-2">
                                <div className="flex items-center gap-x-2 w-[75%]">
                                    <div className="icon-wrapper border border-very-dark-gray bg-primary rounded-sm p-2">
                                        <IconContext.Provider value={{ className: 'text-accent-color size-6' }}>
                                            <RiInstagramFill />
                                        </IconContext.Provider>
                                    </div>
                                    <input type={"text"} className="text-secondary font-semibold text-sm focus:outline-none w-full" defaultValue={"@rmcarsales2005"} />
                                </div>
                                <button className="text-secondary font-semibold border border-very-dark-gray rounded-sm p-2 bg-accent-color text-sm w-[25%]">Update</button>
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between items-center border border-very-dark-gray rounded-sm py-2 px-2">
                                <div className="flex items-center gap-x-2 w-[75%]">
                                    <div className="icon-wrapper border border-very-dark-gray bg-primary rounded-sm p-2">
                                        <IconContext.Provider value={{ className: 'text-accent-color size-6' }}>
                                            <IoLogoFacebook />
                                        </IconContext.Provider>
                                    </div>
                                    <input type={"text"} className="text-secondary font-semibold text-sm focus:outline-none w-full" defaultValue={"@rmcarsales2005"} />
                                </div>
                                <button className="text-secondary font-semibold border border-very-dark-gray rounded-sm p-2 bg-accent-color text-sm w-[25%]">Update</button>
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between items-center border border-very-dark-gray rounded-sm py-2 px-2">
                                <div className="flex items-center gap-x-2 w-[75%]">
                                    <div className="icon-wrapper border border-very-dark-gray bg-primary rounded-sm p-2">
                                        <IconContext.Provider value={{ className: 'text-accent-color size-6' }}>
                                            <AiOutlineTikTok />
                                        </IconContext.Provider>
                                    </div>
                                    <input type={"text"} className="text-secondary font-semibold text-sm focus:outline-none w-full" defaultValue={"@rmcarsales2005"} />
                                </div>
                                <button className="text-secondary font-semibold border border-very-dark-gray rounded-sm p-2 bg-accent-color text-sm w-[25%]">Update</button>
                            </div>
                        </div>
                    </form>
                </div>
                <div className='lg:w-[50%] p-4 bg-black border border-very-dark-gray rounded-sm'>
                    <h1 className="text-secondary text-xl sm:text-xl md:text-2xl lg:text-2xl font-bold">Admin Credentials</h1>
                    <p className='text-medium-gray text-sm'>Update your login credentials</p>
                    <form className='flex flex-col gap-y-4 [&>div>div]:focus-within:border-accent-color py-8'>
                        <div className="flex flex-col gap-y-2">
                            <label htmlFor="admin-username" className="text-medium-gray text-sm font-semibold">Username</label>
                            <div className="flex items-center border border-primary rounded-sm bg-primary p-3 md:p-4">
                                <IconContext.Provider value={{ className: 'text-dark-gray text-xl' }}><LuUser /></IconContext.Provider>
                                <input id="admin-username" type="text" placeholder="Username" className="pl-2 sm:pl-4 w-full outline-none text-secondary focus:border-accent-color placeholder:text-dark-gray" />
                            </div>
                        </div>
                        <div className="flex flex-col gap-y-2">
                            <label htmlFor="password" className="text-medium-gray text-sm font-semibold">Password</label>
                            <div className="flex items-center border border-primary rounded-sm bg-primary p-3 md:p-4">
                                <IconContext.Provider value={{ className: 'text-dark-gray text-xl' }}><LuLock /></IconContext.Provider>
                                <input id="password" type="password" placeholder="Password" className="pl-2 sm:pl-4 w-full outline-none text-secondary focus:border-accent-color placeholder:text-dark-gray" />
                            </div>
                        </div>
                        <div className="flex flex-col gap-y-2">
                            <label htmlFor="confirm-password" className="text-medium-gray text-sm font-semibold">Password</label>
                            <div className="flex items-center border border-primary rounded-sm bg-primary p-3 md:p-4">
                                <IconContext.Provider value={{ className: 'text-dark-gray text-xl' }}><LuLock /></IconContext.Provider>
                                <input id="confirm-password" type="password" placeholder="Confirm Password" className="pl-2 sm:pl-4 w-full outline-none text-secondary focus:border-accent-color placeholder:text-dark-gray" />
                            </div>
                        </div>
                        <div>
                            <button type='submit' className="w-full bg-accent-color p-3 md:p-4 rounded-sm border border-primary text-secondary font-semibold">Update</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}