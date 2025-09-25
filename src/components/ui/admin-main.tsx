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
                        <TableRow className='hover:bg-primary [&>*]:text-medium-gray [&>*]:px-4 [&>*]:py-4 border-very-dark-gray'>
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
                        <TableRow className='hover:bg-primary [&>*]:text-medium-gray [&>*]:px-4 [&>*]:py-4 border-very-dark-gray'>
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
                        <TableRow className='hover:bg-primary [&>*]:text-medium-gray [&>*]:px-4 [&>*]:py-4 border-very-dark-gray'>
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
                        <TableRow className='hover:bg-primary [&>*]:text-medium-gray [&>*]:px-4 [&>*]:py-4 border-very-dark-gray'>
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
                        <TableRow className='hover:bg-primary [&>*]:text-medium-gray [&>*]:px-4 [&>*]:py-4 border-very-dark-gray'>
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
                                <TableRow className='hover:bg-primary [&>*]:text-medium-gray [&>*]:px-4 [&>*]:py-4 border-very-dark-gray'>
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
                                <TableRow className='hover:bg-primary [&>*]:text-medium-gray [&>*]:px-4 [&>*]:py-4 border-very-dark-gray'>
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
                                <TableRow className='hover:bg-primary [&>*]:text-medium-gray [&>*]:px-4 [&>*]:py-4 border-very-dark-gray'>
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
                                <TableRow className='hover:bg-primary [&>*]:text-medium-gray [&>*]:px-4 [&>*]:py-4 border-very-dark-gray'>
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
                                <TableRow className='hover:bg-primary [&>*]:text-medium-gray [&>*]:px-4 [&>*]:py-4 border-very-dark-gray'>
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
                                <TableRow className='hover:bg-primary [&>*]:text-medium-gray [&>*]:px-4 [&>*]:py-4 border-very-dark-gray'>
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