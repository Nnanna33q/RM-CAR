import { useRef } from "react";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from './accordion';
import { IconContext } from "react-icons";
import { IoMdMail, IoLogoFacebook } from "react-icons/io";
import { MdLocalPhone } from "react-icons/md";
import { RiInstagramFill } from "react-icons/ri";
import { AiOutlineTikTok } from "react-icons/ai";
import { Link } from "react-router";

export default function Footer() {
    const textRef = useRef(null);
    return (
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
                                <input type="email" className="w-full outline-none bg-primary p-4 rounded-sm border border-primary text-secondary focus:border-accent-color" placeholder="Your email address" />
                                <input type="submit" className="w-full bg-accent-color p-4 rounded-sm border border-primary text-secondary font-semibold" />
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
                            <input type="email" className="w-full outline-none bg-primary p-4 rounded-sm border border-primary text-secondary focus:border-accent-color" placeholder="Your email address" />
                            <input type="submit" className="w-full bg-accent-color p-4 rounded-sm border border-primary text-secondary font-semibold" />
                        </form>
                    </div>
                </div>
            </div>
            <div className="py-8 flex flex-col gap-y-4 sm:gap-y-8 justify-center items-center">
                <p className="text-medium-gray text-xs">© {new Date().getFullYear()} RM Car Sales. All rights reserved</p>
                <div className="flex justify-start items-center gap-x-4 sm:gap-12">
                    <a target="_blank" href="mailto:rmcarsales2005@gmail.com">
                        <IconContext.Provider value={{ className: 'size-6 text-secondary' }}>
                            <IoMdMail />
                        </IconContext.Provider>
                    </a>
                    <a target="_blank" href="tel:+44 151 382 9243">
                        <IconContext.Provider value={{ className: 'size-6 text-secondary' }}>
                            <MdLocalPhone />
                        </IconContext.Provider>
                    </a>
                    <a target="_blank" href="https://www.instagram.com/rmcarsales2005?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==">
                        <IconContext.Provider value={{ className: 'size-6 text-secondary' }}>
                            <RiInstagramFill />
                        </IconContext.Provider>
                    </a>
                    <a target="_blank" href="https://l.instagram.com/?u=https%3A%2F%2Fwww.facebook.com%2Fshare%2F166J4m29ay%2F%3Fmibextid%3DwwXIfr&e=AT2s0b4FwvrA-eRS6DFtAn1TNWf_T3bPunvHNXF2lQPOob0G9qMDdbkuX6o5Hz-5cEt1a0KzAVgleByRSB80iD1rQ8gcfu2WvxMvfs0">
                        <IconContext.Provider value={{ className: 'size-6 text-secondary' }}>
                            <IoLogoFacebook />
                        </IconContext.Provider>
                    </a>
                    <a target="_blank" href="https://l.facebook.com/l.php?u=https%3A%2F%2Ftiktok.com%2F%40rm.car.sales&h=AT2gdRonEzYWhC6ZtOfKwHLLndDREQLcrD6WINL8i72oIGJnil81UL0yzOkRwdHbBTEINENq3QdLO6ICwChMJZgSRG9ZWGJjjyg8krR341r1RLwZpNqVc4gCsVsK_3iNIz6lmt9cXVaWLV5pfK8rRl-xe_s">
                        <IconContext.Provider value={{ className: 'size-6 text-secondary' }}>
                            <AiOutlineTikTok />
                        </IconContext.Provider>
                    </a>
                </div>
            </div>
        </div>
    )
}