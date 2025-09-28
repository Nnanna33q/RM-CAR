import { LuUser } from "react-icons/lu";
import { CiSearch } from "react-icons/ci";
import { IconContext } from "react-icons";
import { BsLayoutSidebarInset } from "react-icons/bs"
import type { Dispatch } from "react";
import type { SetStateAction } from "react";
import { Popover, PopoverTrigger, PopoverContent } from "./popover";

export default function NavDashboard({ pageName, setIsAdminNavbarEnabled }: { pageName: string, setIsAdminNavbarEnabled: Dispatch<SetStateAction<boolean>> }) {
    return (
        <nav className="flex justify-between items-center w-full gap-x-4">
            <div className="hidden md:block text-medium-gray font-bold">{pageName}</div>
            <div className="hidden md:flex justify-between items-center w-[40%] gap-x-6">
                <div className="flex items-center text-medium-gray border border-very-dark-gray rounded-sm p-2 w-full focus-within:border-accent-color">
                    <IconContext.Provider value={{ className: 'size-5' }}>
                        <CiSearch />
                    </IconContext.Provider>
                    <input type="text" className="border-none outline-none pl-2" placeholder={'Search...'} />
                </div>
                <Popover>
                    <PopoverTrigger>
                        <div className="border border-very-dark-gray bg-primary p-1.5 w-fit rounded-full text-medium-gray">
                            <IconContext.Provider value={{ className: 'size-6' }}>
                                <LuUser />
                            </IconContext.Provider>
                        </div>
                    </PopoverTrigger>
                    <PopoverContent className='w-30 flex flex-col p-1 [&>*]:p-2 [&>*]:text-sm bg-black text-medium-gray border-very-dark-gray [&>*]:hover:bg-primary mr-6'>
                        <div className='font-semibold text-secondary border-b border-very-dark-gray'>Account</div>
                        <div className="border-b border-very-dark-gray">Settings</div>
                        <div className='text-accent-color'>Log out</div>
                    </PopoverContent>
                </Popover>
            </div>
            <div className="md:hidden border border-very-dark-gray bg-primary p-2 w-fit rounded-sm text-medium-gray" onClick={() => setIsAdminNavbarEnabled(true)}>
                <IconContext.Provider value={{ className: 'size-5' }}>
                    <BsLayoutSidebarInset />
                </IconContext.Provider>
            </div>
            <div className="md:hidden flex items-center text-medium-gray border border-very-dark-gray rounded-sm p-2 w-full focus-within:border-accent-color">
                <IconContext.Provider value={{ className: 'size-5' }}>
                    <CiSearch />
                </IconContext.Provider>
                <input type="text" className="border-none outline-none pl-2" placeholder={'Search...'} />
            </div>
            <div className="md:hidden">
                <Popover>
                    <PopoverTrigger>
                        <div className="border border-very-dark-gray bg-primary p-2 w-fit rounded-full text-medium-gray">
                            <IconContext.Provider value={{ className: 'size-5' }}>
                                <LuUser />
                            </IconContext.Provider>
                        </div>
                    </PopoverTrigger>
                    <PopoverContent className='w-30 flex flex-col p-1 [&>*]:p-2 [&>*]:text-sm bg-black text-medium-gray border-very-dark-gray [&>*]:hover:bg-primary mr-4'>
                        <div className='font-semibold text-secondary border-b border-very-dark-gray'>Account</div>
                        <div className="border-b border-very-dark-gray">Settings</div>
                        <div className='text-accent-color'>Log out</div>
                    </PopoverContent>
                </Popover>
            </div>
        </nav>
    )
}