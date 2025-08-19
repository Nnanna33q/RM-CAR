import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import Hero from "@/components/ui/hero";
import ChooseUs from "@/components/ui/choose-us";

export default function Home() {
    return (
        <div>
            <Hero />
            <ChooseUs />
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