import SideBarDashboard from "@/components/ui/side-dashboard";
import NavDashboard from "@/components/ui/nav-dashboard";
import { TabListEnquiries } from "@/components/ui/tablist-dashboard";
import { AdminSidebar } from "@/components/ui/navbar";
import { AdminEnquiriesMain } from "@/components/ui/admin-main";
import { useContext, useState, useRef } from 'react';
import { AnimatePresence } from "motion/react";
import Backdrop from "@/components/ui/backdrop";
import { useEffect } from "react";
import EnquiriesContext from "@/contexts/enquiries";
import type { Enquiry } from "@/lib/types";
import PageContext from "@/contexts/page";
import TotalEnquiriesContext from "@/contexts/totalEnquiries";
import TablistEnquiriesContext from "@/contexts/tablist-enquiries";
import AlertErrorContext from "@/contexts/alert-error";
import AlertSuccessContext from "@/contexts/alert-success";
import { AlertError, AlertSuccess } from "@/components/ui/alert";

export default function AdminEnquiries() {
    const [isAdminNavbarEnabled, setIsAdminNavbarEnabled] = useState<boolean>(false);
    const [enquiries, setEnquiries] = useState<Enquiry[]>();
    const [totalEnquiries, setTotalEnquiries] = useState(0);
    const [page, setPage] = useState(1);
    const [tablist, setTablist] = useState<"All" | "Pending" | "Completed">('All');
    const [isError, setIsError] = useContext(AlertErrorContext);
    const [isSuccess, setIsSuccess] = useContext(AlertSuccessContext);
    const errorId = useRef<NodeJS.Timeout | undefined>(undefined);
    const successId = useRef<NodeJS.Timeout | undefined>(undefined);

    useEffect(() => {
        document.title = 'Enquiries';
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
        <EnquiriesContext.Provider value={{ enquiries, setEnquiries }}>
            <PageContext.Provider value={{ page, setPage }}>
                <TotalEnquiriesContext.Provider value={{ totalEnquiries, setTotalEnquiries }}>
                    <TablistEnquiriesContext.Provider value={{ tablist, setTablist }}>
                        <div className="md:hidden"><NavDashboard pageName={'Enquiries'} setIsAdminNavbarEnabled={setIsAdminNavbarEnabled} /></div>
                        <div className="flex relative">
                            <SideBarDashboard currentPage={'Enquiries'} />
                            <div className="w-full py-4 px-4 md:px-6 flex flex-col gap-y-4" style={{ height: '100vh', overflowY: 'auto', scrollbarWidth: 'none' }}>
                                <div className="hidden md:block"><NavDashboard pageName={'Enquiries'} setIsAdminNavbarEnabled={setIsAdminNavbarEnabled} /></div>
                                <TabListEnquiries />
                                <AdminEnquiriesMain />
                            </div>
                        </div>
                        <AnimatePresence>
                            {isError.error && <AlertError errorMessage={isError.errorMessage}/>}
                            {isSuccess.success && <AlertSuccess successMessage={isSuccess.successMessage}/>}
                            {isAdminNavbarEnabled && <AdminSidebar key={'1'} currentPage="Enquiries" setIsAdminNavbarEnabled={setIsAdminNavbarEnabled} />}
                            {isAdminNavbarEnabled && <Backdrop key={'2'} />}
                        </AnimatePresence>
                    </TablistEnquiriesContext.Provider>
                </TotalEnquiriesContext.Provider>
            </PageContext.Provider>
        </EnquiriesContext.Provider>
    )
}