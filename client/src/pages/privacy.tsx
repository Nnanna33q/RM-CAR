import Privacy from "@/components/ui/privacy-policy";
import Footer from "@/components/ui/footer";
import { useEffect } from "react";

export default function PrivacyPolicy() {
    useEffect(() => {
        document.title = 'Privacy';
    }, []);

    return (
        <div>
            <Privacy />
            <Footer />
        </div>
    )
}