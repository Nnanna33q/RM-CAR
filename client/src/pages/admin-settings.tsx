import SideBarDashboard from "@/components/ui/side-dashboard";
import NavDashboard from "@/components/ui/nav-dashboard";
import { AdminSettingsMain } from "@/components/ui/admin-main";
import { useState } from "react";
import Backdrop from "@/components/ui/backdrop";
import { AnimatePresence } from "motion/react";
import { AdminSidebar } from "@/components/ui/navbar";

export default function AdminSettings() {

    const [isAdminNavbarEnabled, setIsAdminNavbarEnabled] = useState<boolean>(false);

    return (
        <>
            <div className="md:hidden"><NavDashboard pageName={'Settings'} setIsAdminNavbarEnabled={setIsAdminNavbarEnabled} /></div>
            <div className="relative md:flex">
                <SideBarDashboard currentPage={'Settings'} />
                <div className="w-full flex flex-col gap-y-4 bg-primary" style={{ height: '100vh', overflowY: 'auto', scrollbarWidth: 'none' }}>
                    <div className="hidden md:block"><NavDashboard pageName={'Enquiries'} setIsAdminNavbarEnabled={setIsAdminNavbarEnabled} /></div>
                    <AdminSettingsMain />
                </div>
            </div>
            <AnimatePresence>
                {isAdminNavbarEnabled && <AdminSidebar currentPage="Settings" setIsAdminNavbarEnabled={setIsAdminNavbarEnabled} />}
                {isAdminNavbarEnabled && <Backdrop />}
            </AnimatePresence>
        </>
    )
}