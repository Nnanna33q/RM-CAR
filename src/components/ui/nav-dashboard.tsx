import { LuUser } from "react-icons/lu";
import { CiSearch } from "react-icons/ci";
import { IconContext } from "react-icons";

export default function NavDashboard({ pageName }: { pageName: string }) {
    return (
        <nav className="flex justify-between items-center w-full">
            <div className="text-medium-gray font-bold">{pageName}</div>
            <div className="flex justify-between items-center w-[40%] gap-x-6">
                <div className="flex items-center text-medium-gray border border-very-dark-gray rounded-sm p-2 w-full focus-within:border-accent-color">
                    <IconContext.Provider value={{ className: 'size-5' }}>
                        <CiSearch />
                    </IconContext.Provider>
                    <input type="text" className="border-none outline-none pl-2" placeholder={'Search...'} />
                </div>
                <div className="border border-very-dark-gray bg-primary p-1.5 w-fit rounded-full text-medium-gray">
                    <IconContext.Provider value={{ className: 'size-6' }}>
                        <LuUser />
                    </IconContext.Provider>
                </div>
            </div>
        </nav>
    )
}