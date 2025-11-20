import { LuHouse } from "react-icons/lu";
import { LuCarFront } from "react-icons/lu";
import { LuUsers } from "react-icons/lu";
import { LuSettings } from "react-icons/lu";
import { IconContext } from "react-icons";

export default function SideBarDashboard({ currentPage }: { currentPage: 'Dashboard' | 'Inventory' | 'Enquiries' | 'Settings' }) {
    return (
        <nav className="flex flex-col justify-between h-[100vh] bg-black text-medium-gray py-8 px-4 hidden md:flex">
            <div className="flex flex-col gap-y-8">
                <a href="/admin/dashboard">
                    <IconContext.Provider value={{ className: `size-6 ${currentPage === 'Dashboard' && 'text-accent-color'}` }}>
                        <LuHouse />
                    </IconContext.Provider>
                </a>
                <a href="/admin/inventory">
                    <IconContext.Provider value={{ className: `size-6 ${currentPage === 'Inventory' && 'text-accent-color'}` }}>
                        <LuCarFront />
                    </IconContext.Provider>
                </a>
                <a href="/admin/enquiries">
                    <IconContext.Provider value={{ className: `size-6 ${currentPage === 'Enquiries' && 'text-accent-color'}` }}>
                        <LuUsers />
                    </IconContext.Provider>
                </a>
            </div>
            <div>
                <a href="/admin/settings">
                    <IconContext.Provider value={{ className: `size-6 ${currentPage === 'Settings' && 'text-accent-color'}` }}>
                        <LuSettings />
                    </IconContext.Provider>
                </a>
            </div>
        </nav>
    )
}