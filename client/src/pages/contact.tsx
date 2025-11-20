import ContactUs from "@/components/ui/contact-us";
import Faqs from "@/components/ui/faq";
import Footer from "@/components/ui/footer";
import { useEffect, useContext, useRef, useState } from "react";
import AlertErrorContext from "@/contexts/alert-error";
import { AlertError, AlertSuccess } from "@/components/ui/alert";
import { AnimatePresence } from "motion/react";
import AlertSuccessContext from "@/contexts/alert-success";
import type { TBusinessInfo } from "@/lib/types";
import { getFetchUrl } from "@/lib/utils";
import BusinessInfoContext from "@/contexts/business-info";
import Preloader from "@/components/ui/preloader";

export default function Contact() {
    const [alertError, setIsError] = useContext(AlertErrorContext);
    const [alertSuccess, setIsSuccess] = useContext(AlertSuccessContext);
    const errorId = useRef<NodeJS.Timeout | undefined>(undefined);
    const successId = useRef<NodeJS.Timeout | undefined>(undefined);
    const [businessInfo, setBusinessInfo] = useState<undefined | TBusinessInfo | null>(undefined);

    useEffect(() => {
        document.title = 'Contact';
    }, [])

    useEffect(() => {
        // Disables error alert after 5 seconds
        if (alertError.error) {
            errorId.current = setTimeout(() => setIsError({ error: false, errorMessage: '' }), 5000);
        }

        return () => clearTimeout(errorId.current);
    }, [alertError.error])

    useEffect(() => {
        // Disables success alert after 5 seconds
        if (alertSuccess.success) {
            successId.current = setTimeout(() => setIsSuccess({ success: false, successMessage: '' }), 5000);
        }

        return () => clearTimeout(successId.current);
    }, [alertSuccess.success])

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
            <div>
                <ContactUs />
                <Faqs />
                <Footer />
                <AnimatePresence>
                    {alertError.error && <AlertError errorMessage={alertError.errorMessage} />}
                    {alertSuccess.success && <AlertSuccess successMessage={alertSuccess.successMessage} />}
                </AnimatePresence>
            </div>
        </BusinessInfoContext.Provider>
    )
}