import SideBarDashboard from "@/components/ui/side-dashboard";
import NavDashboard from "@/components/ui/nav-dashboard";
import { AdminSidebar } from "@/components/ui/navbar";
import { useState } from 'react';
import { AnimatePresence } from "motion/react";
import Backdrop from "@/components/ui/backdrop";
import { AdminDashboardMain } from "@/components/ui/admin-main";

export default function AdminDashboard() {
    const [isAdminNavbarEnabled, setIsAdminNavbarEnabled] = useState<boolean>(false);

    return (
        <>
            <div className="md:hidden"><NavDashboard pageName={'Dashboard'} setIsAdminNavbarEnabled={setIsAdminNavbarEnabled} /></div>
            <div className="flex relative">
                <SideBarDashboard currentPage={'Dashboard'} />
                <div className="w-full py-4 px-4 md:px-6 flex flex-col gap-y-4" style={{ height: '100vh', overflowY: 'auto', scrollbarWidth: 'none' }}>
                    <div className="hidden md:block"><NavDashboard pageName={'Enquiries'} setIsAdminNavbarEnabled={setIsAdminNavbarEnabled} /></div>
                    <AdminDashboardMain />
                </div>
            </div>
            <AnimatePresence>
                {isAdminNavbarEnabled && <AdminSidebar currentPage="Dashboard" setIsAdminNavbarEnabled={setIsAdminNavbarEnabled} />}
                {isAdminNavbarEnabled && <Backdrop />}
            </AnimatePresence>
        </>
    )
}