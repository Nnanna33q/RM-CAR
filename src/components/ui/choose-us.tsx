import { CurveDivider } from "./divider";
import { Card, CardDescription } from './card';
import { TrustedIcon, CompetitiveIcon, CertifiedIcon, SupportIcon } from "@/assets/icons";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from "swiper/modules";

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
    return (
        <div className="relative px-4 py-30 md:px-6 md:py-45 lg:px-10 lg:py-30">
            <CurveDivider height={75} />
            <h1 className="text-center text-secondary text-xl/15 md:text-4xl/15 lg:text-4xl/15 font-bold">Why Choose Us</h1>
            <div
                className="flex flex-col gap-y-8">
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