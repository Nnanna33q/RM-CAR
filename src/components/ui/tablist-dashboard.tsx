import { LuFile } from "react-icons/lu";
import { IconContext } from "react-icons";
import { GoPlusCircle } from "react-icons/go";

export default function TabList() {
    return (
        <div className="flex justify-between items-center md:pt-6 md:pb-2">
            <div className="tablist-container bg-black rounded-sm flex text-medium-gray text-sm p-1 [&>*]:rounded-sm [&>*]:px-4 [&>*]:py-1">
                <div className="active [.active]:bg-primary">All</div>
                <div className="[.active]:bg-primary">Available</div>
                <div className="[.active]:bg-primary">Sold</div>
            </div>
            <div className="car-actions flex gap-x-2">
                <button className="flex items-center gap-x-1 bg-secondary text-black text-sm p-2 md:py-1 md:px-2 rounded-sm font-bold border border-medium-gray">
                    <IconContext.Provider value={{ className: '' }}>
                        <LuFile />
                    </IconContext.Provider>
                    <span className="hidden sm:block">Export</span>
                </button>
                <button className="flex items-center gap-x-1 bg-accent-color text-secondary text-sm p-2 md:py-1 md:px-4 rounded-sm font-bold border border-accent-color">
                    <IconContext.Provider value={{ className: '' }}>
                        <GoPlusCircle />
                    </IconContext.Provider>
                    <span className="hidden sm:block">Add Car</span>
                </button>
            </div>
        </div>
    )
}