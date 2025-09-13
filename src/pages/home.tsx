import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import Hero from "@/components/ui/hero";
import ChooseUs from "@/components/ui/choose-us";
import Testimonials from "@/components/ui/testimonials";
import Faqs from "@/components/ui/faq";
import Location from "@/components/ui/location";
import Featured from "@/components/ui/featured";
import Footer from "@/components/ui/footer";

export default function Home() {
    return (
        <div>
            <Hero />
            <ChooseUs />
            <Testimonials />
            <Faqs />
            <Location />
            <Featured />
            <Footer />
        </div>
    )
}

const domNode = document.querySelector('#root');

if (domNode) {
    createRoot(domNode).render(
        <StrictMode>
            <Home />
        </StrictMode>
    );
} else {
    console.error('No root found');
}