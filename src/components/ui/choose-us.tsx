import { CurveDivider } from "./divider";
import { Card, CardDescription } from './card';
import { TrustedIcon, CompetitiveIcon, CertifiedIcon, SupportIcon } from "@/assets/icons";
import { useState, useRef, useEffect } from "react";
import { useInView } from "motion/react";
import { animateChooseUsText, animateChooseUsCard, reverseChooseUsCardAnimation, animateTrustedIcon, reverseTrustedIcon, animateCompetitiveIcon, animateCertifiedIcon, animateExceptionalIcon } from "@/lib/animations";
import type { IsCardInView } from "@/lib/types";
import type { AnimationPlaybackControlsWithThen } from "motion/react";

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
    const textRef = useRef(null);
    const isTextInView = useInView(textRef, { once: true });
    const [cardMap, setCardMap] = useState<Map<string, IsCardInView>>(new Map());
    const animationPlayControls = useRef<AnimationPlaybackControlsWithThen>(null);

    useEffect(() => {
        if (isTextInView) {
            animateChooseUsText();
        }
    }, [isTextInView]);

    useEffect(() => {
        const cards = document.querySelectorAll('.choose-us-card');
        const observers = Array.from(cards).map(card => {
            const observer = new IntersectionObserver((entries) => {
                cardMap.set(card.id, { isInView: entries[0].isIntersecting, id: card.id });
                setCardMap(new Map(cardMap));
            }, { threshold: 1 })
            observer.observe(card);
            return observer;
        })

        return () => observers.forEach(observer => {
            observer.disconnect();
        })
    }, [])

    useEffect(() => {
        Array.from(cardMap.entries()).forEach(c => {
            const card = document.getElementById(c[1].id);
            if (card) {
                c[1].isInView ? animateChooseUsCard(card) : reverseChooseUsCardAnimation(card);
            }
        })
    }, [cardMap])


    useEffect(() => {
        // Animates ChooseUs Icons when inView
        const randomNumber = Math.floor(Math.random() * 6);

        if(cardMap.get('choose-us-card-1')?.isInView) {
            setTimeout(() => {
                animationPlayControls.current =  animateTrustedIcon();
            }, randomNumber * 1000)
        } else {
            animationPlayControls.current?.finished.then(reverseTrustedIcon);
        };

        if(cardMap.get('choose-us-card-2')?.isInView) {
            animateCompetitiveIcon();
        }

        if(cardMap.get('choose-us-card-3')?.isInView) {
            animateCertifiedIcon();
        }

        if(cardMap.get('choose-us-card-4')?.isInView) {
            animateExceptionalIcon();
        }

    }, [cardMap])

    function getCurveDividerHeight() {
        if (window.innerWidth >= 768 && window.innerWidth < 1024) {
            return 100;
        } else if (window.innerWidth >= 1024) {
            return 150;
        } else {
            return 75;
        }
    }

    return (
        <div className="relative px-4 py-30 md:px-6 md:py-45 lg:px-10 lg:py-45">
            <CurveDivider height={getCurveDividerHeight()} />
            <div ref={textRef} className="text-start pb-8 sm:pb-12 overflow-hidden flex flex-col gap-y-1 sm:gap-y-6">
                <div className="choose-us-animate text-accent-color flex items-center border border-primary rounded-full px-4 py-1 w-[fit-content] bg-accent-dark translate-y-16 opacity-0">
                    <div className="relative size-2 md:size-3 rounded-full bg-accent-color">
                        <div className="absolute animate-ping size-2 md:size-3 rounded-full bg-accent-color"></div>
                    </div>
                    <div className="text-sm pl-2">Why Choose Us</div>
                </div>
                <h1 className="choose-us-animate text-secondary text-2xl/15 sm:text-2xl md:text-4xl/15 lg:text-4xl/15 font-bold translate-y-16 opacity-0">Why Choose Us</h1>
                <p className="choose-us-animate text-medium-gray text-md md:text-md lg:text-lg translate-y-16 opacity-0">Built on decades of experience, we deliver cars you can count on and service you can trust</p>
            </div>
            <div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-8 sm:gap-x-8 lg:gap-x-4">
                {cardItems.map(i => {
                    return (
                        <Card key={i.key} id={`choose-us-card-${i.key}`} className="choose-us-card border px-6 border-very-dark-gray">
                            <i.Icon />
                            <p className="text-secondary font-semibold text-xl">{i.headline}</p>
                            <CardDescription className="text-medium-gray px-0 text-md">{i.subtext}</CardDescription>
                        </Card>
                    )
                })}
            </div>
        </div>
    )
}