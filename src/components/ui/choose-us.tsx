import { CurveDivider } from "./divider";
import { Card, CardDescription } from './card';
import { TrustedIcon, CompetitiveIcon, CertifiedIcon, SupportIcon } from "@/assets/icons";
import { useRef, useEffect } from "react";
import { useInView } from "motion/react";
import { animateChooseUsText } from "@/lib/animations";

const cardItems = [
    {
        key: '1',
        headline: 'Established Trust',
        subtext: `Over ${new Date().getFullYear() - 2005} years of helping drivers find the right car with confidence.`,
        Icon: TrustedIcon
    },
    {
        key: '2',
        headline: 'Competitive Pricing',
        subtext: `We offer clear pricing with no hidden fees, ensuring you get the best possible value.`,
        Icon: CompetitiveIcon
    },
    {
        key: '3',
        headline: 'Certified Quality',
        subtext: `Each vehicle undergoes a thorough inspection and certification to ensure lasting performance.`,
        Icon: CertifiedIcon
    },
    {
        key: '4',
        headline: 'Exceptional Support',
        subtext: `We are here to guide you before, during, and after your purchase with unmatched customer care.`,
        Icon: SupportIcon
    }
]

export default function ChooseUs() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    useEffect(() => {
        if(isInView) {
            animateChooseUsText();
        } 
    }, [isInView]);

    return (
        <div className="relative px-4 py-30 md:px-6 md:py-45 lg:px-10 lg:py-45">
            <CurveDivider height={75} />
            <div ref={ref} className="text-start pb-8 sm:pb-12 overflow-hidden">
                <h1 className="choose-us-animate text-secondary text-2xl/15 sm:text-2xl md:text-4xl/15 lg:text-4xl/15 font-bold translate-y-16 opacity-0">Why Choose Us</h1>
                <p className="choose-us-animate text-medium-gray text-sm md:text-md lg:text-lg lg:pt-4 translate-y-16 opacity-0">Built on decades of experience, we deliver cars you can count on and service you can trust</p>
            </div>
            <div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-8 sm:gap-x-8 lg:gap-x-4">
                {cardItems.map(i => {
                    return (
                        <Card key={i.key} className="border px-6 border-very-dark-gray bg-linear-to-br from-primary from-10% via-black to-primary shadow ">
                            <i.Icon />
                            <p className="text-secondary font-semibold text-xl">{i.headline}</p>
                            <CardDescription className="text-medium-gray px-0">{i.subtext}</CardDescription>
                        </Card>
                    )
                })}
            </div>
        </div>
    )
}