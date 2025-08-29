import { AiOutlineQuestion, AiOutlineTikTok } from "react-icons/ai";
import { CurveDividerFaq } from "./divider";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./accordion";
import { CarsCarousel } from "./carousel";
import { IoMdMail } from "react-icons/io";
import { MdLocalPhone } from "react-icons/md";
import { RiInstagramFill } from "react-icons/ri";
import { IoLogoFacebook } from "react-icons/io";
import { IconContext } from "react-icons";
import { animateFaqText } from "@/lib/animations";
import { useInView } from "motion/react";
import { useRef, useEffect } from 'react';

const faqs = [
    {
        key: '1',
        heading: 'What time does RM Car Sales open and close?',
        content: 'RM Car Sales is open Monday to Friday from 9:00 AM to 8:00 PM, Saturday from 9:00 AM to 6:00 PM, and Sunday from 10:30 AM to 4:00 PM.'
    },
    {
        key: '2',
        heading: 'Where can I find RM Car Sales?',
        content: 'Based in Merseyside, RM Car Sales is located at Triumph Way, Liverpool, L24 9GQ. View directions below.'
    },
    {
        key: '3',
        heading: 'What services can I get from RM Car Sales?',
        content: 'RM Car Sales offers car buying, home delivery, and contactless transactions. For tailored enquiries, feel free to get in touch with us for specific questions.'
    },
    {
        key: '4',
        heading: 'Do you buy cars as well as sell them',
        content: 'Yes. At RM Car Sales, we buy cars directly from customers, either as part-exchange when you purchase a new vehicle or as an outright sale. Our team offers fair valuations to make the process quick and straightforward.'
    }
]

export default function Faqs() {
    const textRef = useRef(null);
    const isFaqTextInView = useInView(textRef);

    useEffect(() => {
        isFaqTextInView && animateFaqText();
    }, [isFaqTextInView]);

    return (
        <div className="relative px-4 py-30 md:px-6 md:py-45 lg:px-10 lg:py-45 bg-primary">
            <CurveDividerFaq />
            <div className="lg:flex lg:gap-x-16">
                <div className="lg:w-[50%]">
                    <div ref={textRef} className="text-start pb-8 sm:pb-12 overflow-hidden flex flex-col gap-y-1 sm:gap-y-6">
                        <div className="faq-text-animate text-accent-color flex items-center border border-black rounded-full px-4 py-1 w-[fit-content] bg-accent-dark translate-y-16 opacity-0">
                            <div className='animate-pulse'><AiOutlineQuestion /></div>
                            <div className="text-sm pl-2">Questions & Answers</div>
                        </div>
                        <h1 className="faq-text-animate text-secondary text-2xl/15 sm:text-2xl md:text-4xl/15 lg:text-4xl/15 font-bold translate-y-16 opacity-0">Frequently Asked Questions</h1>
                        <p className="faq-text-animate text-medium-gray text-md md:text-md lg:text-lg translate-y-16 opacity-0">We’ve gathered the most frequent questions to make your car buying easier</p>
                    </div>
                    <CarsCarousel />
                </div>
                <div className="lg:w-[50%]">
                    <div
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-y-8 sm:gap-x-8 lg:gap-x-4">
                        {faqs.map(f => {
                            return (
                                <Accordion className="" key={f.key} type="single" collapsible>
                                    <AccordionItem value={f.key} className="">
                                        <AccordionTrigger className="text-very-light-gray text-base px-4 border border-very-dark-gray">{f.heading}</AccordionTrigger>
                                        <AccordionContent className="text-medium-gray text-base p-4 border border-very-dark-gray border-t-0">
                                            {f.content}
                                        </AccordionContent>
                                    </AccordionItem>
                                </Accordion>
                            )
                        })}
                    </div>
                    <div className="bg-black rounded-md flex flex-col gap-y-4 sm:gap-y-8 p-8 sm:p-12 mt-8">
                        <h1 className="text-secondary text-center text-xl sm:text-xl md:text-2xl lg:text-2xl font-bold">Still Got Questions?</h1>
                        <p className="text-medium-gray text-center text-md">Reach out for support, questions, or partnership opportunities—we’ll be glad to help!</p>
                        <div className="flex justify-center items-center gap-x-4 sm:gap-12">
                            <a href="mailto:rmcarsales2005@gmail.com">
                                <IconContext.Provider value={{ className: 'size-7 text-accent-color' }}>
                                    <IoMdMail />
                                </IconContext.Provider>
                            </a>
                            <a href="tel:+44 151 382 9243">
                                <IconContext.Provider value={{ className: 'size-7 text-accent-color' }}>
                                    <MdLocalPhone />
                                </IconContext.Provider>
                            </a>
                            <a href="https://www.instagram.com/rmcarsales2005?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==">
                                <IconContext.Provider value={{ className: 'size-7 text-accent-color' }}>
                                    <RiInstagramFill />
                                </IconContext.Provider>
                            </a>
                            <a href="https://l.instagram.com/?u=https%3A%2F%2Fwww.facebook.com%2Fshare%2F166J4m29ay%2F%3Fmibextid%3DwwXIfr&e=AT2s0b4FwvrA-eRS6DFtAn1TNWf_T3bPunvHNXF2lQPOob0G9qMDdbkuX6o5Hz-5cEt1a0KzAVgleByRSB80iD1rQ8gcfu2WvxMvfs0">
                                <IconContext.Provider value={{ className: 'size-7 text-accent-color' }}>
                                    <IoLogoFacebook />
                                </IconContext.Provider>
                            </a>
                            <a href="https://l.facebook.com/l.php?u=https%3A%2F%2Ftiktok.com%2F%40rm.car.sales&h=AT2gdRonEzYWhC6ZtOfKwHLLndDREQLcrD6WINL8i72oIGJnil81UL0yzOkRwdHbBTEINENq3QdLO6ICwChMJZgSRG9ZWGJjjyg8krR341r1RLwZpNqVc4gCsVsK_3iNIz6lmt9cXVaWLV5pfK8rRl-xe_s">
                                <IconContext.Provider value={{ className: 'size-7 text-accent-color ' }}>
                                    <AiOutlineTikTok />
                                </IconContext.Provider>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}