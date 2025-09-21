import { LuFile } from "react-icons/lu";
import { IconContext } from "react-icons";
import { GoPlusCircle } from "react-icons/go";

export default function TabList() {
    return (
        <div className="flex justify-between items-center pt-6 pb-2">
            <div className="tablist-container bg-very-dark-gray rounded-sm flex text-medium-gray text-sm">
                <div className="py-2 px-4">All</div>
                <div className="py-2 px-4">Available</div>
                <div className="py-2 px-4">Sold</div>
            </div>
            <div className="car-actions flex gap-x-2">
                <button className="flex items-center gap-x-1 bg-secondary text-black text-sm py-1 px-2 rounded-sm font-bold border border-medium-gray">
                    <IconContext.Provider value={{ className: '' }}>
                        <LuFile />
                    </IconContext.Provider>
                    <span>Export</span>
                </button>
                <button className="flex items-center gap-x-1 bg-accent-color text-secondary text-sm py-1 px-4 rounded-sm font-bold border border-accent-color">
                    <IconContext.Provider value={{ className: '' }}>
                        <GoPlusCircle />
                    </IconContext.Provider>
                    <span>Add Car</span>
                </button>
            </div>
        </div>
    )
}