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

export default function AdminMain() {
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