import ListingsComponent from "@/components/ui/listings"
import Footer from "@/components/ui/footer";
import { useEffect, useRef, useContext, useState } from "react";
import AlertErrorContext from "@/contexts/alert-error";
import AlertSuccessContext from "@/contexts/alert-success";
import PageContext from "@/contexts/page";
import { AlertError, AlertSuccess } from "@/components/ui/alert";
import { AnimatePresence } from "motion/react";
import type { TBusinessInfo } from "@/lib/types";
import { getFetchUrl } from "@/lib/utils";
import Preloader from "@/components/ui/preloader";
import BusinessInfoContext from "@/contexts/business-info";

export default function Listings() {
    const [isError, setIsError] = useContext(AlertErrorContext);
    const [isSuccess, setIsSuccess] = useContext(AlertSuccessContext);
    const errorId = useRef<NodeJS.Timeout | undefined>(undefined);
    const successId = useRef<NodeJS.Timeout | undefined>(undefined);
    const [page, setPage] = useState(1);
    const [businessInfo, setBusinessInfo] = useState<undefined | TBusinessInfo | null>(undefined);

    useEffect(() => {
        document.title = 'Listings';
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

    useEffect(() => {
        async function getBInfo() {
            try {
                const response = await fetch(getFetchUrl('api/business-info'), {
                    method: 'GET',
                    credentials: 'include'
                })
                const data = await response.json();
                if (!data.success) throw new Error('Live business data is currently unavailable. Fallback data is being used');
                setBusinessInfo({
                    name: data.businessInfo.name,
                    email: data.businessInfo.email,
                    phone: data.businessInfo.phone,
                    instagramProfileLink: data.businessInfo.instagramProfileLink,
                    facebookProfileLink: data.businessInfo.facebookProfileLink,
                    tiktokProfleLink: data.businessInfo.tiktokProfileLink,
                    logo: data.businessInfo.logo
                });
            } catch (error) {
                console.error(error instanceof Error ? error.message : 'Failed to retrieve business data');
                console.warn('Live business data is currently unavailable. Fallback data is being used');
                setBusinessInfo(null);
            }
        }
        getBInfo();
    }, []);

    if (businessInfo === undefined) return <Preloader />

    return (
        <BusinessInfoContext.Provider value={businessInfo}>
            <PageContext.Provider value={{ page, setPage }}>
                <div>
                    <ListingsComponent />
                    <Footer />
                    <AnimatePresence>
                        {isError.error && <AlertError errorMessage={isError.errorMessage} />}
                        {isSuccess.success && <AlertSuccess successMessage={isSuccess.successMessage} />}
                    </AnimatePresence>
                </div>
            </PageContext.Provider>
        </BusinessInfoContext.Provider>
    )
}