import { PiUsersThreeFill } from "react-icons/pi";
import { StickyNavBar, MobileNavBar } from "./navbar";
import { useState, useLayoutEffect, useEffect, useRef } from "react";
import Backdrop from "./backdrop";
import { AnimatePresence, useInView } from "motion/react";
import aboutUsCar from '../../assets/about-us-car-2.jpg';
import { animateAboutUsText } from "@/lib/animations";

export default function AboutUs() {
    const [isMobileNavBarEnabled, setIsMobileNavBarEnabled] = useState<boolean>(false);
    const [navHeight, setNavHeight] = useState<number>(0);

    const textRef = useRef(null);
    const isAboutUsInView = useInView(textRef);

    useEffect(() => {
        isAboutUsInView && animateAboutUsText();
    }, [isAboutUsInView])

    useLayoutEffect(() => {
        const nav = document.querySelector('.nav');
        typeof nav?.clientHeight === 'number' && setNavHeight(nav.clientHeight);
    }, [])

    return (
        <div>
            <StickyNavBar isMobileNavBarEnabled={isMobileNavBarEnabled} setIsMobileNavBarEnabled={setIsMobileNavBarEnabled} />
            <div className="relative px-4 py-30 md:px-6 md:py-45 lg:px-10 lg:py-45 bg-black lg:flex lg:items-center lg:gap-x-12">
                <div ref={textRef} className="text-start pb-8 sm:pb-12 overflow-hidden flex flex-col gap-y-1 sm:gap-y-6 lg:w-[50%]">
                    <div className="about-us-text-animate text-accent-color flex items-center border border-black rounded-full px-4 py-1 w-[fit-content] bg-accent-dark translate-y-16 opacity-0">
                        <div className='animate-pulse'><PiUsersThreeFill /></div>
                        <div className="text-sm pl-2">About Us</div>
                    </div>
                    <h1 className="about-us-text-animate text-secondary text-2xl/15 sm:text-2xl md:text-4xl/15 lg:text-4xl/15 font-bold translate-y-16 opacity-0">About RM Car Sales</h1>
                    <p className="about-us-text-animate text-medium-gray text-md md:text-md lg:text-lg translate-y-16 opacity-0">
                        At RM Car Sales, we are more than a used car dealership. We are your trusted partner in finding the right vehicle. With over 20 years of experience, we focus on honesty, quality, and customer satisfaction. Our family-run business offers a wide range of carefully inspected, competitively priced cars from all major brands. Whether you are buying your first car, upgrading, or looking for a budget-friendly option, our team is here to make the process simple and stress free. Visit us today to see why so many drivers choose RM Car Sales.
                    </p>
                </div>
                <div className="lg:w-[50%] about-us-text-animate translate-y-16 opacity-0">
                    <img className="w-full rounded-sm" src={aboutUsCar} />
                </div>
            </div>
            <AnimatePresence>
                {isMobileNavBarEnabled && <MobileNavBar key={'1'} />}
                {isMobileNavBarEnabled && <Backdrop navHeight={navHeight} key={'2'} />}
            </AnimatePresence>
        </div>
    )
}