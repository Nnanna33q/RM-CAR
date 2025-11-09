import SideBarDashboard from "@/components/ui/side-dashboard";
import NavDashboard from "@/components/ui/nav-dashboard";
import { AdminSidebar } from "@/components/ui/navbar";
import { useState } from 'react';
import { AnimatePresence } from "motion/react";
import Backdrop from "@/components/ui/backdrop";
import { AdminDashboardMain } from "@/components/ui/admin-main";
import { useEffect, useRef, useContext } from "react";
import AlertErrorContext from "@/contexts/alert-error";
import AlertSuccessContext from "@/contexts/alert-success";
import { AlertSuccess, AlertError } from "@/components/ui/alert";

export default function AdminDashboard() {
    const [isAdminNavbarEnabled, setIsAdminNavbarEnabled] = useState<boolean>(false);
    const [isError, setIsError] = useContext(AlertErrorContext);
    const [isSuccess, setIsSuccess] = useContext(AlertSuccessContext);
    const errorId = useRef<NodeJS.Timeout | undefined>(undefined);
    const successId = useRef<NodeJS.Timeout | undefined>(undefined);

    useEffect(() => {
        document.title = 'Dashboard';
    }, [])

    useEffect(() => {
        // Disables error alert after 5 seconds
        if (isError.error) {
            errorId.current = setTimeout(() => setIsError({ error: false, errorMessage: '' }), 5000);
        }

        return () => clearTimeout(errorId.current);
    }, [isError.error])

    useEffect(() => {
        // Disables success alert after 5 seconds
        if (isSuccess.success) {
            successId.current = setTimeout(() => setIsSuccess({ success: false, successMessage: '' }), 5000);
        }

        return () => clearTimeout(successId.current);
    }, [isSuccess.success])

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
                {isAdminNavbarEnabled && <AdminSidebar key={'1'} currentPage="Dashboard" setIsAdminNavbarEnabled={setIsAdminNavbarEnabled} />}
                {isAdminNavbarEnabled && <Backdrop key={'2'} />}
                {isError.error && <AlertError errorMessage={isError.errorMessage} />}
                {isSuccess.success && <AlertSuccess successMessage={isSuccess.successMessage} />}
            </AnimatePresence>
        </>
    )
}