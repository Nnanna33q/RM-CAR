import { RxCaretLeft } from "react-icons/rx";
import { RxCaretRight } from "react-icons/rx";

export default function AdminPagination() {
    return (
        <div className="flex items-center justify-between">
            <div className="text-medium-gray text-xs flex gap-x-1.5">
                <span>Showing</span><span className="font-bold text-secondary text-xs">1 - 5</span><span>of</span><span className="font-bold text-secondary text-xs">10</span><span>cars</span>
            </div>
            <div className="flex items-center gap-x-8">
                <button className="flex items-center gap-x-1 text-muted-foreground">
                    <RxCaretLeft />
                    <span className="text-sm">Prev</span>
                </button>
                <button className="flex items-center gap-x-1 text-secondary">
                    <span className="text-sm">Next</span>
                    <RxCaretRight />
                </button>
            </div>
        </div>
    )
}