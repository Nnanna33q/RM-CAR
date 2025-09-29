import ContactUs from "@/components/ui/contact-us";
import Faqs from "@/components/ui/faq";
import Footer from "@/components/ui/footer";
import { useEffect } from "react";

export default function Contact() {
    useEffect(() => {
        document.title = 'Contact';
    }, [])

    return (
        <div>
            <ContactUs />
            <Faqs />
            <Footer />
        </div>
    )
}