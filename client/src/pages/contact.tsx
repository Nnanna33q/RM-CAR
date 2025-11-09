import ContactUs from "@/components/ui/contact-us";
import Faqs from "@/components/ui/faq";
import Footer from "@/components/ui/footer";
import { useEffect, useContext, useRef } from "react";
import AlertErrorContext from "@/contexts/alert-error";
import { AlertError, AlertSuccess } from "@/components/ui/alert";
import { AnimatePresence } from "motion/react";
import AlertSuccessContext from "@/contexts/alert-success";

export default function Contact() {
    const [alertError, setIsError] = useContext(AlertErrorContext);
    const [alertSuccess, setIsSuccess] = useContext(AlertSuccessContext);
    const errorId = useRef<NodeJS.Timeout | undefined>(undefined);
    const successId = useRef<NodeJS.Timeout | undefined>(undefined);

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

    return (
        <div>
            <ContactUs />
            <Faqs />
            <Footer />
            <AnimatePresence>
                {alertError.error && <AlertError errorMessage={alertError.errorMessage} />}
                {alertSuccess.success && <AlertSuccess successMessage={alertSuccess.successMessage} />}
            </AnimatePresence>
        </div>
    )
}