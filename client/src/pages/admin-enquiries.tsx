import SideBarDashboard from "@/components/ui/side-dashboard";
import NavDashboard from "@/components/ui/nav-dashboard";
import TabList from "@/components/ui/tablist-dashboard";
import { AdminSidebar } from "@/components/ui/navbar";
import { AdminEnquiriesMain } from "@/components/ui/admin-main";
import { useState } from 'react';
import { AnimatePresence } from "motion/react";
import Backdrop from "@/components/ui/backdrop";

export default function AdminEnquiries() {
    const [isAdminNavbarEnabled, setIsAdminNavbarEnabled] = useState<boolean>(false);

    return (
        <>
            <div className="md:hidden"><NavDashboard pageName={'Enquiries'} setIsAdminNavbarEnabled={setIsAdminNavbarEnabled} /></div>
            <div className="flex relative">
                <SideBarDashboard currentPage={'Enquiries'} />
                <div className="w-full py-4 px-4 md:px-6 flex flex-col gap-y-4" style={{ height: '100vh', overflowY: 'auto', scrollbarWidth: 'none' }}>
                    <div className="hidden md:block"><NavDashboard pageName={'Enquiries'} setIsAdminNavbarEnabled={setIsAdminNavbarEnabled} /></div>
                    <TabList currentPage="Enquiries" />
                    <AdminEnquiriesMain />
                </div>
            </div>
            <AnimatePresence>
                {isAdminNavbarEnabled && <AdminSidebar currentPage="Enquiries" setIsAdminNavbarEnabled={setIsAdminNavbarEnabled} />}
                {isAdminNavbarEnabled && <Backdrop />}
            </AnimatePresence>
        </>
    )
}