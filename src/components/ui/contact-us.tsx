import { StickyNavBar, MobileNavBar } from "./navbar";
import { useState, useLayoutEffect, useRef, useEffect } from 'react';
import { AnimatePresence, useInView } from "motion/react";
import Backdrop from "./backdrop";
import { IoIosChatbubbles } from "react-icons/io";
import { IoMdMail } from "react-icons/io";
import { IconContext } from "react-icons";
import { MdLocalPhone } from "react-icons/md";
import { RiInstagramFill } from "react-icons/ri";
import { animateContactUsText } from "@/lib/animations";

export default function ContactUs() {
    const [isMobileNavBarEnabled, setIsMobileNavBarEnabled] = useState<boolean>(false);
    const [navHeight, setNavHeight] = useState<number>(0);
    const textRef = useRef(null);
    const isContactUsInView = useInView(textRef);

    useLayoutEffect(() => {
        const nav = document.querySelector('.nav');
        typeof nav?.clientHeight === 'number' && setNavHeight(nav.clientHeight);
    }, []);

    useEffect(() => {
        isContactUsInView && animateContactUsText();
    }, [isContactUsInView])

    return (
        <div>
            <StickyNavBar isMobileNavBarEnabled={isMobileNavBarEnabled} setIsMobileNavBarEnabled={setIsMobileNavBarEnabled} />
            <div className="relative px-4 py-30 md:px-6 md:py-45 lg:px-10 lg:py-45 bg-black">
                <div className="pb-6">
                    <div className="contact-us-text-animate hidden md:flex text-accent-color flex items-center border border-black rounded-full px-4 py-1 w-[fit-content] bg-accent-dark translate-y-16 opacity-0">
                        <div className='animate-pulse'><IoIosChatbubbles /></div>
                        <div className="text-sm pl-2">Contact Us</div>
                    </div>
                </div>
                <div className="flex flex-col md:flex-row gap-y-16 md:gap-x-8">
                    <div ref={textRef} className="text-start overflow-hidden flex flex-col gap-y-3 sm:gap-y-6">
                        <div className="contact-us-text-animate md:hidden text-accent-color flex items-center border border-black rounded-full px-4 py-1 w-[fit-content] bg-accent-dark translate-y-16 opacity-0">
                            <div className='animate-pulse'><IoIosChatbubbles /></div>
                            <div className="text-sm pl-2">Contact Us</div>
                        </div>
                        <h1 className="contact-us-text-animate text-secondary text-2xl sm:text-2xl md:text-4xl lg:text-4xl font-bold translate-y-16 opacity-0">Get In Touch With Us</h1>
                        <p className="contact-us-text-animate text-medium-gray text-md md:text-md lg:text-lg translate-y-16 opacity-0">
                            Have a question or need assistance? Contact us today and we’ll be glad to help.
                        </p>
                        <div className="contact-us-text-animate flex flex-col gap-y-4 translate-y-16 opacity-0">
                            <div className="flex justify-between items-center border border-very-dark-gray rounded-sm py-2 px-2">
                                <div className="flex items-center gap-x-2">
                                    <div className="icon-wrapper border border-very-dark-gray bg-primary rounded-sm p-2">
                                        <IconContext.Provider value={{ className: 'text-accent-color size-6' }}>
                                            <IoMdMail />
                                        </IconContext.Provider>
                                    </div>
                                    <div className="text-secondary font-semibold text-sm">rmcarsales2005@gmail.com</div>
                                </div>
                                <button className="text-secondary font-semibold border border-very-dark-gray rounded-sm p-2 bg-accent-color text-sm w-[25%]"><a target="_blank" href="mailto:rmcarsales2005@gmail.com">Email</a></button>
                            </div>
                            <div className="flex justify-between items-center border border-very-dark-gray rounded-sm py-2 px-2">
                                <div className="flex items-center gap-x-2">
                                    <div className="icon-wrapper border border-very-dark-gray bg-primary rounded-sm p-2">
                                        <IconContext.Provider value={{ className: 'text-accent-color size-6' }}>
                                            <MdLocalPhone />
                                        </IconContext.Provider>
                                    </div>
                                    <div className="text-secondary font-semibold text-sm">+44 151 382 9243</div>
                                </div>
                                <button className="text-secondary font-semibold border border-very-dark-gray rounded-sm p-2 bg-accent-color text-sm w-[25%]"><a target="_blank" href="tel:+44 151 382 9243">Call Now</a></button>
                            </div>
                            <div className="flex justify-between items-center border border-very-dark-gray rounded-sm py-2 px-2">
                                <div className="flex items-center gap-x-2">
                                    <div className="icon-wrapper border border-very-dark-gray bg-primary rounded-sm p-2">
                                        <IconContext.Provider value={{ className: 'text-accent-color size-6' }}>
                                            <RiInstagramFill />
                                        </IconContext.Provider>
                                    </div>
                                    <div className="text-secondary font-semibold text-sm">@rmcarsales2005</div>
                                </div>
                                <button className="text-secondary font-semibold border border-very-dark-gray rounded-sm p-2 bg-accent-color text-sm w-[25%]"><a href="https://www.instagram.com/rmcarsales2005?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank">Message</a></button>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-y-3 sm:gap-y-6">
                        <h1 className="contact-us-text-animate text-secondary text-2xl sm:text-2xl md:text-4xl lg:text-4xl font-bold translate-y-16 opacity-0">Send Us a Message</h1>
                        <p className="contact-us-text-animate text-medium-gray text-md md:text-md lg:text-lg translate-y-16 opacity-0">
                            Fill out our contact form to send us your questions, feedback, or requests to work with us.
                        </p>
                        <form className="contact-us-text-animate flex flex-col gap-y-4 translate-y-16 opacity-0">
                            <input type="text" className="w-full outline-none bg-primary p-3 rounded-sm border border-primary text-secondary focus:border-accent-color" placeholder="Name" />
                            <input type="email" className="w-full outline-none bg-primary p-3 rounded-sm border border-primary text-secondary focus:border-accent-color" placeholder="Email" />
                            <textarea className="w-full outline-none bg-primary p-2 rounded-sm border border-primary text-secondary focus:border-accent-color" placeholder="Message" />
                            <input type="submit" className="w-full bg-accent-color p-3 rounded-sm border border-primary text-secondary font-semibold" />
                        </form>
                    </div>
                </div>
            </div>
            <AnimatePresence>
                {isMobileNavBarEnabled && <MobileNavBar key={'1'} />}
                {isMobileNavBarEnabled && <Backdrop navHeight={navHeight} key={'2'} />}
            </AnimatePresence>
        </div>
    )
}