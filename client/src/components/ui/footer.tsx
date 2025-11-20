import { useRef, useState, useContext, useEffect } from "react";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from './accordion';
import { IconContext } from "react-icons";
import { IoMdMail, IoLogoFacebook } from "react-icons/io";
import { MdLocalPhone } from "react-icons/md";
import { RiInstagramFill } from "react-icons/ri";
import { AiOutlineTikTok } from "react-icons/ai";
import { Link } from "react-router";
import Spinner from "./spinner";
import { getFetchUrl } from "@/lib/utils";
import { AlertError, AlertSuccess } from "./alert";
import AlertErrorContext from "@/contexts/alert-error";
import AlertSuccessContext from "@/contexts/alert-success";
import { AnimatePresence } from "motion/react";
import type { MouseEvent } from "react";
import BusinessInfoContext from "@/contexts/business-info";
import type { TBusinessInfo } from "@/lib/types";
import fallbackBusinessInfo from "@/data/business-info";

export default function Footer() {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useContext(AlertErrorContext);
    const [isSuccess, setIsSuccess] = useContext(AlertSuccessContext);
    const errorId = useRef<NodeJS.Timeout | undefined>(undefined);
    const successId = useRef<NodeJS.Timeout | undefined>(undefined);
    const businessInfo = useContext(BusinessInfoContext) as TBusinessInfo | null;

    useEffect(() => {
        // Disables error alert after 5 seconds
        if (isError.error) {
            errorId.current = setTimeout(() => setIsError({ error: false, errorMessage: '' }), 5000);
        }

        return () => clearTimeout(errorId.current);
    }, [isError.error])

    useEffect(() => {
        // Disables success alert after 5 seconds
        if (isSuccess.success) {
            successId.current = setTimeout(() => setIsSuccess({ success: false, successMessage: '' }), 5000);
        }

        return () => clearTimeout(successId.current);
    }, [isSuccess.success])

    async function saveEmail(e: MouseEvent) {
        e.preventDefault();
        setIsLoading(true);
        try {
            if(!email) throw new Error('Please add your email');
            const response = await fetch(getFetchUrl('api/email'), {
                credentials: 'include',
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email })
            });
            const data = await response.json();
            if(!data.success) throw new Error(data.errorMessage);
            setIsSuccess({ success: true, successMessage: data.exists ? 'You’re already on our newsletter list' : 'Thanks! You’re now on our newsletter list' });
        } catch (error) {
            console.error(error);
            setIsError({ error: true, errorMessage: error instanceof Error ? error.message : 'Failed to complete operation' });
        }
        setIsLoading(false);
    }

    const textRef = useRef(null);
    return (
        <>
            <div className="relative px-4 pt-30 md:px-6 md:pt-45 lg:px-10 lg:pt-45 bg-black">
                <div ref={textRef} className="text-start pb-8 sm:pb-12 overflow-hidden flex flex-col gap-y-1 sm:gap-y-6">
                    <h2 className="text-secondary text-2xl/15 sm:text-2xl md:text-4xl/15 lg:text-4xl/15 font-bold ">RM Car Sales</h2>
                    <p className="text-medium-gray text-md md:text-md lg:text-lg">Quality cars, fair prices and exceptional service every time.</p>
                </div>
                <div className="md:hidden">
                    <Accordion type="single" collapsible>
                        <AccordionItem value="Explore">
                            <AccordionTrigger className="text-secondary font-semibold">Explore</AccordionTrigger>
                            <AccordionContent className="text-medium-gray">
                                <ul className="flex flex-col gap-y-4">
                                    <li><a href={'/'}>Home</a></li>
                                    <li><Link to={'/listings'}>Listings</Link></li>
                                    <li><a href={'#faqs'}>FAQ</a></li>
                                </ul>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                    <Accordion type="single" collapsible>
                        <AccordionItem value="Company">
                            <AccordionTrigger className="text-secondary font-semibold">Company</AccordionTrigger>
                            <AccordionContent className="text-medium-gray">
                                <ul className="flex flex-col gap-y-4">
                                    <li><a href={'/about'}>About Us</a></li>
                                    <li><a href={'/contact'}>Contact Us</a></li>
                                    <li><a href={'/privacy'}>Privacy Policy</a></li>
                                </ul>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                    <Accordion type="single" collapsible defaultValue="Newsletter-form">
                        <AccordionItem value="Newsletter-form">
                            <AccordionTrigger className="text-secondary font-semibold">Newsletter</AccordionTrigger>
                            <AccordionContent className="text-medium-gray">
                                <p>Stay on top of the latest car trends, tips and tricks for selling your car.</p>
                                <form className="newsletter-form py-8 flex flex-col gap-y-4">
                                    <input onChange={(e) => setEmail(e.target.value)} id={'email-mobile'} type="email" className="w-full outline-none bg-primary p-4 rounded-sm border border-primary text-secondary focus:border-accent-color" placeholder="Your email address" />
                                    <button disabled={isLoading} onClick={(e) => saveEmail(e)} type="submit" className="w-full bg-accent-color p-4 rounded-sm border border-primary text-secondary font-semibold flex items-center justify-center">
                                        {isLoading ? <Spinner /> : 'Submit'}
                                    </button>
                                </form>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </div>
                <div className="hidden md:flex justify-between">
                    <div>
                        <h5 className="text-secondary font-semibold">Explore</h5>
                        <div className="text-medium-gray py-4">
                            <ul className="flex flex-col gap-y-4 text-sm">
                                <li>Home</li>
                                <li>Listings</li>
                                <li>FAQ</li>
                            </ul>
                        </div>
                    </div>
                    <div>
                        <h5 className="text-secondary font-semibold">Company</h5>
                        <div className="text-medium-gray py-4">
                            <ul className="flex flex-col gap-y-4 text-sm">
                                <li>About Us</li>
                                <li>Contact Us</li>
                                <li>Privacy Policy</li>
                            </ul>
                        </div>
                    </div>
                    <div className="w-[50%]">
                        <h5 className="text-secondary font-semibold">Newsletter</h5>
                        <div className="text-medium-gray py-4">
                            <p>Stay on top of the latest car trends, tips and tricks for selling your car.</p>
                            <form className="newsletter-form py-8 flex flex-col gap-y-4">
                                <input onChange={(e) => setEmail(e.target.value)} type="email" id={'email'} className="w-full outline-none bg-primary p-4 rounded-sm border border-primary text-secondary focus:border-accent-color" placeholder="Your email address" />
                                <button disabled={isLoading} onClick={(e) => saveEmail(e)} type="submit" className="w-full bg-accent-color p-4 rounded-sm border border-primary text-secondary font-semibold flex items-center justify-center">
                                    {isLoading ? <Spinner /> : 'Submit'}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="py-8 flex flex-col gap-y-4 sm:gap-y-8 justify-center items-center">
                    <p className="text-medium-gray text-xs">© {new Date().getFullYear()} RM Car Sales. All rights reserved</p>
                    <div className="flex justify-start items-center gap-x-4 sm:gap-12">
                        <a target="_blank" href={`mailto:${businessInfo === null ? fallbackBusinessInfo.email : businessInfo.email}`}>
                            <IconContext.Provider value={{ className: 'size-6 text-secondary' }}>
                                <IoMdMail />
                            </IconContext.Provider>
                        </a>
                        <a target="_blank" href={`tel:${businessInfo === null ? fallbackBusinessInfo.phone : businessInfo.phone}`}>
                            <IconContext.Provider value={{ className: 'size-6 text-secondary' }}>
                                <MdLocalPhone />
                            </IconContext.Provider>
                        </a>
                        <a target="_blank" href={businessInfo === null ? fallbackBusinessInfo.instagramProfileLink : businessInfo.instagramProfileLink}>
                            <IconContext.Provider value={{ className: 'size-6 text-secondary' }}>
                                <RiInstagramFill />
                            </IconContext.Provider>
                        </a>
                        <a target="_blank" href={businessInfo === null ? fallbackBusinessInfo.facebookProfileLink : businessInfo.facebookProfileLink}>
                            <IconContext.Provider value={{ className: 'size-6 text-secondary' }}>
                                <IoLogoFacebook />
                            </IconContext.Provider>
                        </a>
                        <a target="_blank" href={businessInfo === null ? fallbackBusinessInfo.tiktokProfileLink : businessInfo.tiktokProfleLink}>
                            <IconContext.Provider value={{ className: 'size-6 text-secondary' }}>
                                <AiOutlineTikTok />
                            </IconContext.Provider>
                        </a>
                    </div>
                </div>
            </div>
            <AnimatePresence>
                {isError.error && <AlertError errorMessage={isError.errorMessage} />}
                {isSuccess.success && <AlertSuccess successMessage={isSuccess.successMessage} />}
            </AnimatePresence>
        </>
    )
}