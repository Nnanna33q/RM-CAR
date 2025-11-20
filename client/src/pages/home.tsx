import Hero from "@/components/ui/hero";
import ChooseUs from "@/components/ui/choose-us";
import Testimonials from "@/components/ui/testimonials";
import Faqs from "@/components/ui/faq";
import Location from "@/components/ui/location";
import Featured from "@/components/ui/featured";
import Footer from "@/components/ui/footer";
import Preloader from "@/components/ui/preloader";
import { useEffect, useState } from "react";
import type { TBusinessInfo } from "@/lib/types";
import BusinessInfoContext from "@/contexts/business-info";
import { getFetchUrl } from "@/lib/utils";

export default function Home() {
    const [businessInfo, setBusinessInfo] = useState<undefined | TBusinessInfo | null>(undefined);

    useEffect(() => {
        document.title = 'Home';
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

    if(businessInfo === undefined) return <Preloader />

    return (
        <BusinessInfoContext.Provider value={businessInfo}>
            <div>
                <Hero />
                <ChooseUs />
                <Testimonials backgroundColor={'#000000'} />
                <Faqs />
                <Location />
                <Featured />
                <Footer />
            </div>
        </BusinessInfoContext.Provider>
    )
}