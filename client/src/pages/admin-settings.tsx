import SideBarDashboard from "@/components/ui/side-dashboard";
import NavDashboard from "@/components/ui/nav-dashboard";
import { AdminSettingsMain } from "@/components/ui/admin-main";
import { useState, useEffect, useContext, useRef } from "react";
import Backdrop from "@/components/ui/backdrop";
import { AnimatePresence } from "motion/react";
import { AdminSidebar } from "@/components/ui/navbar";
import { AlertError, AlertSuccess } from "@/components/ui/alert";
import AlertErrorContext from "@/contexts/alert-error";
import AlertSuccessContext from "@/contexts/alert-success";

export default function AdminSettings() {
    const [isAdminNavbarEnabled, setIsAdminNavbarEnabled] = useState<boolean>(false);
    const [isError, setIsError] = useContext(AlertErrorContext);
    const [isSuccess, setIsSuccess] = useContext(AlertSuccessContext);
    const errorId = useRef<NodeJS.Timeout | undefined>(undefined);
    const successId = useRef<NodeJS.Timeout | undefined>(undefined);

    useEffect(() => {
        document.title = 'Settings';
    }, []);

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
            <div className="md:hidden"><NavDashboard pageName={'Settings'} setIsAdminNavbarEnabled={setIsAdminNavbarEnabled} /></div>
            <div className="relative md:flex">
                <SideBarDashboard currentPage={'Settings'} />
                <div className="w-full flex flex-col gap-y-4 bg-primary" style={{ height: '100vh', overflowY: 'auto', scrollbarWidth: 'none' }}>
                    <div className="hidden md:block"><NavDashboard pageName={'Enquiries'} setIsAdminNavbarEnabled={setIsAdminNavbarEnabled} /></div>
                    <AdminSettingsMain />
                </div>
            </div>
            <AnimatePresence>
                {isError.error && <AlertError errorMessage={isError.errorMessage} />}
                {isSuccess.success && <AlertSuccess successMessage={isSuccess.successMessage} />}
                {isAdminNavbarEnabled && <AdminSidebar currentPage="Settings" setIsAdminNavbarEnabled={setIsAdminNavbarEnabled} />}
                {isAdminNavbarEnabled && <Backdrop />}
            </AnimatePresence>
        </>
    )
}