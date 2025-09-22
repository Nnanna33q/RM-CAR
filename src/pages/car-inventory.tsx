import SideBarDashboard from "@/components/ui/side-dashboard";
import NavDashboard from "@/components/ui/nav-dashboard";
import TabList from "@/components/ui/tablist-dashboard";
import AdminMain from "@/components/ui/admin-main";
import { AdminSidebar } from "@/components/ui/navbar";
import { useState } from 'react';
import { AnimatePresence } from "motion/react";
import Backdrop from "@/components/ui/backdrop";

export default function Inventory() {
    const [isAdminNavbarEnabled, setIsAdminNavbarEnabled] = useState<boolean>(false);

    return (
        <>
            <div className="flex relative">
                <SideBarDashboard currentPage={'Inventory'} />
                <div className="w-full py-4 px-4 md:px-6 flex flex-col gap-y-4" style={{ height: '100vh', overflowY: 'auto', scrollbarWidth: 'none' }}>
                    <NavDashboard pageName={'Inventory'} setIsAdminNavbarEnabled={setIsAdminNavbarEnabled} />
                    <TabList />
                    <AdminMain />
                </div>
            </div>
            <AnimatePresence>
                {isAdminNavbarEnabled && <AdminSidebar currentPage="Inventory" setIsAdminNavbarEnabled={setIsAdminNavbarEnabled} />}
                {isAdminNavbarEnabled && <Backdrop />}
            </AnimatePresence>
        </>
    )
}