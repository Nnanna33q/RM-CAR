import { useRef } from 'react';
import { HiUsers } from "react-icons/hi";
import { CurveDivider } from "./divider";
import { getCurveDividerHeight } from '@/lib/utils';

export default function () {
    const textRef = useRef(null);

    return (
        <div className="relative px-4 py-30 md:px-6 md:py-45 lg:px-10 lg:py-45">
            <CurveDivider height={getCurveDividerHeight()} />
            <div ref={textRef} className="text-start pb-8 sm:pb-12 overflow-hidden flex flex-col gap-y-1 sm:gap-y-6">
                <div className="choose-us-animate text-accent-color flex items-center border border-primary rounded-full px-4 py-1 w-[fit-content] bg-accent-dark">
                    <div className='animate-pulse'><HiUsers /></div>
                    <div className="text-sm pl-2">About Us</div>
                </div>
                <h1 className="choose-us-animate text-secondary text-2xl/15 sm:text-2xl md:text-4xl/15 lg:text-4xl/15 font-bold">Who We Are</h1>
                <p className="choose-us-animate text-medium-gray text-md md:text-md lg:text-lg">
                    At RM Car Sales, we’re more than just a used car dealership — we’re your trusted partner on the road to finding the perfect vehicle. With years of experience and a commitment to transparency, quality, and customer satisfaction, we make it easy for you to drive away with confidence. We offer a selection of thoroughly inspected, competitively priced pre-owned vehicles from all major brands. Whether you’re shopping for your first car, upgrading your car, or buying on a budget, our knowledgeable team is here to help you every step of the way. What sets us apart is our focus on honesty, integrity, and hassle-free service. Every vehicle on our car lot is hand-picked and backed by a transparent history, so you know exactly what you’re getting. We are a family run business that’s been operating for 20 plus years and so our best to support our local community. Come visit us today and experience why so many customers choose RM Car Sales for their next vehicle.
                </p>
            </div>
        </div>
    )
}