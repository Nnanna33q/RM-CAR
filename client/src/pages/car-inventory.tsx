import SideBarDashboard from "@/components/ui/side-dashboard";
import NavDashboard from "@/components/ui/nav-dashboard";
import TabList from "@/components/ui/tablist-dashboard";
import { AdminInventoryMain } from "@/components/ui/admin-main";
import { AdminSidebar } from "@/components/ui/navbar";
import { useState, useEffect, useContext } from 'react';
import { AnimatePresence } from "motion/react";
import Backdrop from "@/components/ui/backdrop";
import { AlertError } from "@/components/ui/alert";
import { AlertSuccess } from "@/components/ui/alert";
import AlertErrorContext from "@/contexts/alert-error";
import AlertSuccessContext from "@/contexts/alert-success";
import CarsContext from "@/contexts/cars";
import TotalCarsContext from "@/contexts/totalCars";
import TablistContext from "@/contexts/tablist-context";
import type { Car } from "@/lib/types";
import PageContext from "@/contexts/page";

export default function Inventory() {
    const [isAdminNavbarEnabled, setIsAdminNavbarEnabled] = useState<boolean>(false);
    const alertErrorData = useContext(AlertErrorContext);
    const alertSuccessData = useContext(AlertSuccessContext);
    const [cars, setCars] = useState<Car[]>();
    const [totalCars, setTotalCars] = useState<number>(0);
    const [tablist, setTablist] = useState<'All' | 'Available' | 'Sold'>('All');
    const [page, setPage] = useState(1);

    useEffect(() => {
        document.title = 'Inventory';
    }, [])

    return (
        <CarsContext.Provider value={{ cars, setCars }}>
            <TotalCarsContext.Provider value={{ totalCars, setTotalCars }}>
                <TablistContext.Provider value={{ tablist, setTablist }}>
                    <PageContext.Provider value={{ page, setPage }}>
                        {alertErrorData[0].error && <AnimatePresence key={1}><AlertError errorMessage={alertErrorData[0].errorMessage} /></AnimatePresence>}
                        {alertSuccessData[0].success && <AnimatePresence key={2}><AlertSuccess successMessage={alertSuccessData[0].successMessage} /></AnimatePresence>}
                        <div className="md:hidden"><NavDashboard pageName={'Inventory'} setIsAdminNavbarEnabled={setIsAdminNavbarEnabled} /></div>
                        <div className="flex relative">
                            <SideBarDashboard currentPage={'Inventory'} />
                            <div className="w-full py-4 px-4 md:px-6 flex flex-col gap-y-4" style={{ height: '100vh', overflowY: 'auto', scrollbarWidth: 'none' }}>
                                <div className="hidden md:block"><NavDashboard pageName={'Enquiries'} setIsAdminNavbarEnabled={setIsAdminNavbarEnabled} /></div>
                                <TabList currentPage="Inventory" />
                                <AdminInventoryMain />
                            </div>
                        </div>
                        <AnimatePresence>
                            {isAdminNavbarEnabled && <AdminSidebar key={'1'} currentPage="Inventory" setIsAdminNavbarEnabled={setIsAdminNavbarEnabled} />}
                            {isAdminNavbarEnabled && <Backdrop key={'2'} />}
                        </AnimatePresence>
                    </PageContext.Provider>
                </TablistContext.Provider>
            </TotalCarsContext.Provider>
        </CarsContext.Provider>
    )
}