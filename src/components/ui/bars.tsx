import { animateBars, resetBars } from "@/lib/animations";
import { useState, useRef } from "react";
import type { BarsProp } from "@/lib/types";

export default function Bars({ isMobileNavBarEnabled, setIsMobileNavBarEnabled }: BarsProp) {
    const [isMobileNavBarOpen, setIsMobileNavBarOpen] = useState<boolean>(false);
    const barsRef = useRef<HTMLDivElement>(null);

    function setBars() {
        setIsMobileNavBarEnabled(!isMobileNavBarEnabled);

        if (isMobileNavBarOpen) {
            setIsMobileNavBarOpen(false);
            resetBars();
            document.body.classList.remove('overflow-hidden');
        } else {
            setIsMobileNavBarOpen(true);
            animateBars();
            document.body.classList.add('overflow-hidden');
        }
    }

    return (
        <>
            <div ref={barsRef} className="bars-container w-full flex flex-col gap-y-2 items-end" onClick={setBars}>
                <div className="bar-1 w-[25px] h-[3px] bg-secondary rounded-full relative z-1"></div>
                <div className="bar-2 w-[15px] h-[3px] bg-accent-color rounded-full relative z-0"></div>
            </div>
        </>
    )
}