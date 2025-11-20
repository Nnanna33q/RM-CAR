import Privacy from "@/components/ui/privacy-policy";
import Footer from "@/components/ui/footer";
import { useEffect, useState } from "react";
import { getFetchUrl } from "@/lib/utils";
import BusinessInfoContext from "@/contexts/business-info";
import type { TBusinessInfo } from "@/lib/types";
import Preloader from "@/components/ui/preloader";

export default function PrivacyPolicy() {
    const [businessInfo, setBusinessInfo] = useState<undefined | TBusinessInfo | null>(undefined);

    useEffect(() => {
        document.title = 'Privacy';
    }, []);

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
    }, [])

    if (businessInfo === undefined) return <Preloader />

    return (
        <BusinessInfoContext.Provider value={businessInfo}>
            <div>
                <Privacy />
                <Footer />
            </div>
        </BusinessInfoContext.Provider>
    )
}