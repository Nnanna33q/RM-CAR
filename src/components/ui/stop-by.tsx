import { CurveDividerFaq } from "./divider";
import { FaMapPin } from "react-icons/fa";
import { Card, CardContent, CardHeader } from './card';
import { animateSwingByText } from "@/lib/animations";
import { useRef, useEffect } from 'react';
import { useInView } from "motion/react";

export default function StopBy() {
    const textRef = useRef(null);
    const isSwingByInView = useInView(textRef);

    useEffect(() => {
        isSwingByInView && animateSwingByText();
    }, [isSwingByInView])

    return (
        <div className="relative px-4 py-30 md:px-6 md:py-45 lg:px-10 lg:py-45 bg-primary">
            <CurveDividerFaq />
            <div ref={textRef} className="text-start pb-8 sm:pb-12 overflow-hidden flex flex-col gap-y-1 sm:gap-y-6">
                <div className="swing-by-text-animate text-accent-color flex items-center border border-black rounded-full px-4 py-1 w-[fit-content] bg-accent-dark translate-y-16 opacity-0">
                    <div className='animate-pulse'><FaMapPin /></div>
                    <div className="text-sm pl-2">Swing By</div>
                </div>
                <h1 className="swing-by-text-animate text-secondary text-2xl/15 sm:text-2xl md:text-4xl/15 lg:text-4xl/15 font-bold translate-y-16 opacity-0">Swing by and say hello!</h1>
                <p className="swing-by-text-animate text-medium-gray text-md md:text-md lg:text-lg translate-y-16 opacity-0">Swing by anytime. We’re happy to chat, show you around and help you find the car that feels right for you.</p>
            </div>
            <Card className="border border-very-dark-gray bg-black w-full lg:w-[50%]">
                <CardHeader className="text-secondary">Business Hours</CardHeader>
                <CardContent className="text-medium-gray">
                    <ul className="flex flex-col gap-y-2">
                        <li className="flex justify-between"><span>Sunday:</span> <span>10:30 - 16:00</span></li>
                        <li className="flex justify-between"><span>Monday:</span> <span>09:00 - 20:00</span></li>
                        <li className="flex justify-between"><span>Tuesday:</span> <span>09:00 - 20:00</span></li>
                        <li className="flex justify-between"><span>Wednesday:</span> <span>09:00 - 20:00</span></li>
                        <li className="flex justify-between"><span>Thursday:</span> <span>09:00 - 20:00</span></li>
                        <li className="flex justify-between"><span>Friday:</span> <span>09:00 - 20:00</span></li>
                        <li className="flex justify-between"><span>Saturday:</span> <span>09:00 - 18:00</span></li>
                    </ul>
                </CardContent>
            </Card>
        </div>
    )
}