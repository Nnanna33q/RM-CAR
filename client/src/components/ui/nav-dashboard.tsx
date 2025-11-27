import { LuUser } from "react-icons/lu";
import { IconContext } from "react-icons";
import { BsLayoutSidebarInset } from "react-icons/bs"
import type { Dispatch } from "react";
import type { SetStateAction } from "react";
import { Popover, PopoverTrigger, PopoverContent } from "./popover";
import { useNavigate } from "react-router";
import { useContext } from "react";
import AuthContext from "@/contexts/auth";

export default function NavDashboard({ pageName, setIsAdminNavbarEnabled }: { pageName: string, setIsAdminNavbarEnabled: Dispatch<SetStateAction<boolean>> }) {
    const navigate = useNavigate();
    const { setIsAuthenticated } = useContext(AuthContext);

    function logOut() {
        localStorage.removeItem('accessToken');
        setIsAuthenticated(false);
        navigate('/admin/login', { replace: true });

    }
    return (
        <nav className="flex justify-between items-center w-full gap-x-4 py-4 px-4 md:px-6 sticky bg-primary top-0 z-100">
            <div className="hidden md:block text-medium-gray font-bold">{pageName}</div>
            <div className="hidden md:flex justify-end items-center w-[40%] gap-x-6">
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
                        <a href='/admin/settings' className="border-b border-very-dark-gray">Settings</a>
                        <div className='text-accent-color' onClick={logOut}>Log out</div>
                    </PopoverContent>
                </Popover>
            </div>
            <div className="md:hidden border border-very-dark-gray bg-primary p-2 w-fit rounded-sm text-medium-gray" onClick={() => setIsAdminNavbarEnabled(true)}>
                <IconContext.Provider value={{ className: 'size-5' }}>
                    <BsLayoutSidebarInset />
                </IconContext.Provider>
            </div>
            <div className="md:hidden text-medium-gray font-bold">{pageName}</div>
            <div className="md:hidden">
                <Popover>
                    <PopoverTrigger>
                        <div className="border border-very-dark-gray bg-primary p-2 w-fit rounded-full text-medium-gray">
                            <IconContext.Provider value={{ className: 'size-5' }}>
                                <LuUser />
                            </IconContext.Provider>
                        </div>
                    </PopoverTrigger>
                    <PopoverContent className='w-30 flex flex-col p-1 [&>*]:p-2 [&>*]:text-sm bg-black text-medium-gray border-very-dark-gray [&>*]:hover:bg-primary mr-4 relative z-101'>
                        <div className='font-semibold text-secondary border-b border-very-dark-gray'>Account</div>
                        <a href='/admin/settings' className="border-b border-very-dark-gray">Settings</a>
                        <div className='text-accent-color' onClick={logOut}>Log out</div>
                    </PopoverContent>
                </Popover>
            </div>
        </nav>
    )
}