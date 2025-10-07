import SideBarDashboard from "@/components/ui/side-dashboard";
import NavDashboard from "@/components/ui/nav-dashboard";
import TabList from "@/components/ui/tablist-dashboard";
import { AdminInventoryMain } from "@/components/ui/admin-main";
import { AdminSidebar } from "@/components/ui/navbar";
import { useState, useEffect, useContext } from 'react';
import { AnimatePresence } from "motion/react";
import Backdrop from "@/components/ui/backdrop";
import { AlertError } from "@/components/ui/alert";
import AlertErrorContext from "@/contexts/alert-error";

export default function Inventory() {
    const [isAdminNavbarEnabled, setIsAdminNavbarEnabled] = useState<boolean>(false);
    const alertErrorData = useContext(AlertErrorContext);

    useEffect(() => {
        document.title = 'Inventory';
    }, [])

    useEffect(() => {
        if(alertErrorData[0].error) {
            setTimeout(() => alertErrorData[1]({ error: false, errorMessage: '' }), 5000)
        }
    }, [alertErrorData[0].error])

    return (
        <>
            {alertErrorData[0].error && <AnimatePresence><AlertError errorMessage={alertErrorData[0].errorMessage} /></AnimatePresence>}
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
        </>
    )
}