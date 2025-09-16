import { useState, useRef, useEffect, useLayoutEffect } from 'react';
import { MdPrivacyTip } from "react-icons/md";
import { animatePrivacyText } from '@/lib/animations';
import { AnimatePresence, useInView } from 'motion/react';
import { StickyNavBar, MobileNavBar } from './navbar';
import Backdrop from './backdrop';

export default function Privacy() {
    const textRef = useRef(null);
    const [isMobileNavBarEnabled, setIsMobileNavBarEnabled] = useState<boolean>(false);
    const [navHeight, setNavHeight] = useState<number>(0);

    const isLocationInView = useInView(textRef);

    useEffect(() => {
        isLocationInView && animatePrivacyText();
    }, [isLocationInView]);

    useLayoutEffect(() => {
        const nav = document.querySelector('.nav');
        typeof nav?.clientHeight === 'number' && setNavHeight(nav.clientHeight);
    }, [])

    return (
        <div>
            <StickyNavBar isMobileNavBarEnabled={isMobileNavBarEnabled} setIsMobileNavBarEnabled={setIsMobileNavBarEnabled} />
            <div ref={textRef} className="relative px-4 py-30 md:px-6 md:py-45 lg:px-10 lg:py-45 bg-primary flex flex-col gap-y-12">
                <div className="text-start overflow-hidden flex flex-col gap-y-1 sm:gap-y-6">
                    <div className="privacy-text-animate text-accent-color flex items-center border border-black rounded-full px-4 py-1 w-[fit-content] bg-accent-dark translate-y-16 opacity-0">
                        <div className='animate-pulse'><MdPrivacyTip /></div>
                        <div className="text-sm pl-2">Privacy Policy</div>
                    </div>
                    <h1 className="privacy-text-animate text-secondary text-2xl/15 sm:text-2xl md:text-4xl/15 lg:text-4xl/15 font-bold translate-y-16 opacity-0">Privacy & Data Protection</h1>
                    <p className="privacy-text-animate text-medium-gray text-md md:text-md lg:text-lg translate-y-16 opacity-0">We value your trust and take your privacy seriously. Our policy explains how we collect, use and protect your information to ensure a safe and transparent experience with us</p>
                </div>
                <div className='flex flex-col gap-y-12 privacy-text-animate translate-y-16 opacity-0'>
                    <div>
                        <h5 className='text-secondary font-semibold'>1. Introduction</h5>
                        <p className='text-medium-gray text-sm py-2'>
                            Welcome to RM Car Sales ("we," "our," or "us"). We are committed to protecting your personal information and your right to privacy. This Privacy Policy explains what information we collect, how we use it, and what rights you have concerning it.By using our website and services, you agree to the collection and use of information in accordance with this policy.
                        </p>
                    </div>
                    <div>
                        <h5 className='text-secondary font-semibold'>2. Information We Collect</h5>
                        <p className='text-medium-gray text-sm py-2'>
                            We collect different types of information to provide and improve our services. This may include:
                        </p>
                        <ul className='text-medium-gray px-4 text-sm list-disc flex flex-col gap-y-4'>
                            <li>
                                <span className='font-semibold text-very-light-gray'>Personal Information</span>: Name, email address, phone number, and other contact details you provide when contacting us or subscribing to our services.
                            </li>
                            <li>
                                <span className='font-semibold text-very-light-gray'>Usage Date</span>: Information on how you interact with our website, such as IP address, browser type, operating system, and pages viewed.
                            </li>
                            <li>
                                <span className='font-semibold text-very-light-gray'>Cookies & Tracking Data</span>: We use cookies to track activity on our website and hold certain information to improve user experience.
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h5 className='text-secondary font-semibold'>3. How We Use Your Information</h5>
                        <p className='text-medium-gray text-sm py-2'>
                            We may use your information for the following purposes:
                        </p>
                        <ul className='text-medium-gray px-4 text-sm list-disc flex flex-col gap-y-4'>
                            <li>
                                To provide and maintain our services
                            </li>
                            <li>
                                To improve and personalize your experience on our website
                            </li>
                            <li>
                                To communicate with you about updates, promotions, or services
                            </li>
                            <li>
                                To comply with legal obligations
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h5 className='text-secondary font-semibold'>4. Sharing of Information</h5>
                        <p className='text-medium-gray text-sm py-2'>
                            We do not share your personal information with third parties, except in the following circumstances:
                        </p>
                        <ul className='text-medium-gray px-4 text-sm list-disc flex flex-col gap-y-4'>
                            <li>
                                When required by law, such as responding to a legal request or regulatory obligation
                            </li>
                            <li>
                                With third-party service providers who assist in delivering our services (e.g., hosting, analytics) under strict confidentiality agreements
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h5 className='text-secondary font-semibold'>5. Your Data Protection Rights</h5>
                        <p className='text-medium-gray text-sm py-2'>
                            Depending on your location, you may have the following rights regarding your personal data:
                        </p>
                        <ul className='text-medium-gray px-4 text-sm list-disc flex flex-col gap-y-4'>
                            <li>
                                <span className='font-semibold text-very-light-gray'>The right to access</span>: You can request copies of your personal data.
                            </li>
                            <li>
                                <span className='font-semibold text-very-light-gray'>The right to rectification</span>: You can request corrections to inaccurate or incomplete data.
                            </li>
                            <li>
                                <span className='font-semibold text-very-light-gray'>The right to erasure</span>: You can request the deletion of your personal data, under certain conditions.
                            </li>
                            <li>
                                <span className='font-semibold text-very-light-gray'>The right to restrict processing</span>: You can request that we limit the processing of your data, under certain conditions.
                            </li>
                            <li>
                                <span className='font-semibold text-very-light-gray'>The right to data portability</span>: You can request that we transfer your data to another organization or directly to you.
                            </li>
                        </ul>
                        <p className='text-medium-gray text-sm py-2'>If you wish to exercise any of these rights, please contact us at <a href={'mailto:rmcarsales2005@gmail.com'} className='text-secondary font-semibold'>rmcarsales2005@gmail.com</a>.</p>
                    </div>
                    <div>
                        <h5 className='text-secondary font-semibold'>6. Security of Your Data</h5>
                        <p className='text-medium-gray text-sm py-2'>
                            We value your trust in providing us your personal information. Excludia takes reasonable steps to protect your data from unauthorized access or disclosure. However, please remember that no method of transmission over the internet or method of electronic storage is 100% secure.
                        </p>
                    </div>
                    <div>
                        <h5 className='text-secondary font-semibold'>7. Links to Other Websites</h5>
                        <p className='text-medium-gray text-sm py-2'>
                            Our website may contain links to third-party websites. We are not responsible for the content or privacy practices of such external sites. We encourage you to review the privacy policies of those websites.
                        </p>
                    </div>
                    <div>
                        <h5 className='text-secondary font-semibold'>8. Changes to This Privacy Policy</h5>
                        <p className='text-medium-gray text-sm py-2'>
                            We may update our Privacy Policy from time to time. Any changes will be posted on this page with an updated "Effective Date."
                        </p>
                    </div>
                    <div>
                        <h5 className='text-secondary font-semibold'>9. Contact Us</h5>
                        <p className='text-medium-gray text-sm py-2'>
                            If you have any questions or concerns about our Privacy Policy or the handling of your personal information, please contact us at <a href={'mailto:rmcarsales2005@gmail.com'} className='text-secondary font-semibold'>rmcarsales2005@gmail.com</a>.
                        </p>
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