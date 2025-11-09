import { RxCaretLeft } from "react-icons/rx";
import { RxCaretRight } from "react-icons/rx";
import { Skeleton } from "./skeleton";
import { useContext } from "react";
import TotalCarsContext from "@/contexts/totalCars";
import TotalEnquiriesContext from "@/contexts/totalEnquiries";
import type { TotalCarsContextProp, TotalEnquiriesContextProp } from "@/lib/types";
import CarsContext from "@/contexts/cars";
import EnquiriesContext from "@/contexts/enquiries";

function PaginationSkeleton() {
    return (
        <Skeleton className="w-4 h-4 bg-very-dark-gray rounded-sm"></Skeleton>
    )
}

export function AdminPaginationInventory({ page, setPage }: { page: number, setPage: React.Dispatch<React.SetStateAction<number>> }) {
    const { totalCars } = useContext(TotalCarsContext) as TotalCarsContextProp;
    const cars = useContext(CarsContext)?.cars
    function next() {
        const lastPage = Math.ceil(totalCars / 5);
        if(lastPage > page) {
            setPage(page + 1);
        }
    }

    function prev() {
        if(page > 1) {
            setPage(page - 1);
        }
    }

    return (
        <div className="flex items-center justify-between">
            <div className="text-medium-gray text-xs flex gap-x-1.5">
                <span>Showing</span><span className="font-bold text-secondary text-xs">{cars === undefined ? <PaginationSkeleton /> : (page - 1) * 5 + 1} {cars !== undefined && `- ${page * 5}`}</span><span>of</span><span className="font-bold text-secondary text-xs">{cars === undefined ? <PaginationSkeleton /> : totalCars}</span><span>cars</span>
            </div>
            <div className="flex items-center gap-x-8">
                <button disabled={page === 1} className={`flex items-center gap-x-1 ${page === 1 ? 'text-muted-foreground' : 'text-secondary'}`} onClick={prev}>
                    <RxCaretLeft />
                    <span className="text-sm">Prev</span>
                </button>
                <button disabled={page >= Math.ceil(totalCars / 5)} className={`flex items-center gap-x-1 ${page >= Math.ceil(totalCars / 5) ? 'text-muted-foreground' : 'text-secondary' }`} onClick={next}>
                    <span className="text-sm">Next</span>
                    <RxCaretRight />
                </button>
            </div>
        </div>
    )
}

export function AdminPaginationEnquiries({ page, setPage }: { page: number, setPage: React.Dispatch<React.SetStateAction<number>> }) {
    const { totalEnquiries } = useContext(TotalEnquiriesContext) as TotalEnquiriesContextProp;
    const enquiries = useContext(EnquiriesContext)?.enquiries
    function next() {
        const lastPage = Math.ceil(totalEnquiries / 5);
        if(lastPage > page) {
            setPage(page + 1);
        }
    }

    function prev() {
        if(page > 1) {
            setPage(page - 1);
        }
    }

    return (
        <div className="flex items-center justify-between">
            <div className="text-medium-gray text-xs flex gap-x-1.5">
                <span>Showing</span><span className="font-bold text-secondary text-xs">{enquiries === undefined ? <PaginationSkeleton /> : (page - 1) * 5 + 1} {enquiries !== undefined && `- ${page * 5}`}</span><span>of</span><span className="font-bold text-secondary text-xs">{enquiries === undefined ? <PaginationSkeleton /> : totalEnquiries}</span><span>enquiries</span>
            </div>
            <div className="flex items-center gap-x-8">
                <button disabled={page === 1} className={`flex items-center gap-x-1 ${page === 1 ? 'text-muted-foreground' : 'text-secondary'}`} onClick={prev}>
                    <RxCaretLeft />
                    <span className="text-sm">Prev</span>
                </button>
                <button disabled={page >= Math.ceil(totalEnquiries / 5)} className={`flex items-center gap-x-1 ${page >= Math.ceil(totalEnquiries / 5) ? 'text-muted-foreground' : 'text-secondary' }`} onClick={next}>
                    <span className="text-sm">Next</span>
                    <RxCaretRight />
                </button>
            </div>
        </div>
    )
}