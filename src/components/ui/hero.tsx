import NavBar from "./navbar";
import { Button } from "./button";
import { PiCar } from "react-icons/pi";
import { CiSearch } from "react-icons/ci";
import { BsAward } from "react-icons/bs";
import { FaRegClock } from "react-icons/fa6";
import { MdOutlineLocalPhone } from "react-icons/md";
import { IconContext } from "react-icons";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from "swiper/modules";
import 'swiper/swiper-bundle.css';
import { MobileNavBar } from "./navbar";
import { useState, useLayoutEffect } from "react";
import Backdrop from "./backdrop";
import type { BarsProp } from "@/lib/types";
import { AnimatePresence } from "motion/react";
import { CarsCarousel } from "./carousel";

export function Hero1({ isMobileNavBarEnabled, setIsMobileNavBarEnabled }: BarsProp) {
    return (
        <div className="swiper-slide hero-container flex flex-col">
            <div className="absolute w-[100vw] h-[100vh] backdrop-blur-xs"></div>
            <div className="w-[100vw] lg:h-[100vh] relative">
                <NavBar isMobileNavBarEnabled={isMobileNavBarEnabled} setIsMobileNavBarEnabled={setIsMobileNavBarEnabled} />
                <div className=".hero-main flex-grow text-very-light-gray flex items-center px-4 py-30 md:px-6 md:py-45 lg:px-10">
                    <div className={`flex flex-col gap-y-8`}>
                        <h1 className="text-white text-5xl/15 md:text-6xl/15 lg:text-6xl/15 font-bold">Find
                            Your Next Ride
                        </h1>
                        <div className="flex items-center gap-x-4 md:gap-x-6 lg:gap-x-8 text-medium-gray">
                            <div className="flex items-center">
                                <IconContext.Provider value={{ className: 'size-5 md:size-7 lg:size-5' }}>
                                    <PiCar />
                                </IconContext.Provider>
                                <span className="pl-2 text-xs md:text-lg lg:text-xs font-semibold">Used Cars</span>
                            </div>
                            <div className="flex items-center">
                                <IconContext.Provider value={{ className: 'size-5 md:size-7 lg:size-5' }}>
                                    <BsAward />
                                </IconContext.Provider>
                                <span className="pl-2 text-xs md:text-lg lg:text-xs font-semibold">Award winning</span>
                            </div>
                            <div className="flex items-center">
                                <IconContext.Provider value={{ className: 'size-5 md:size-7 lg:size-5' }}>
                                    <FaRegClock />
                                </IconContext.Provider>
                                <span className="pl-2 text-xs md:text-lg lg:text-xs font-semibold">Since 2005</span>
                            </div>
                        </div>
                        <div className="flex gap-x-4">
                            <Button className="hero1-btn-browse bg-accent-color border border-accent-color text-white font-semibold text-md lg:text-lg py-6 lg:w-[35%] group rounded-sm hover:bg-white hover:text-accent-color hover:border-white">
                                <IconContext.Provider value={{ className: 'hero1-icon-search size-6 group-hover:scale-125 transition duration-500 group-hover:transition group-hover:duration-500' }}>
                                    <CiSearch />
                                </IconContext.Provider>
                                <span>Browse Cars</span>
                            </Button>
                            <Button className="hero1-btn-contact bg-transparent text-medium-gray border border-medium-gray font-semibold text-md lg:text-lg py-6 lg:w-[35%] group rounded-sm">
                                <IconContext.Provider value={{ className: 'hero1-icon-phone text-medium-gray size-6 group-hover:scale-125 transition duration-500 group-hover:transition group-hover:duration-500' }}>
                                    <MdOutlineLocalPhone />
                                </IconContext.Provider>
                                <span>Contact Us</span>
                            </Button>
                        </div>
                    </div>
                </div>
                <CarsCarousel />
            </div>
        </div>
    )
}

export function Hero2({ isMobileNavBarEnabled, setIsMobileNavBarEnabled }: BarsProp) {

    function handleMouseEnter() {
        const browseBtn = document.querySelector('.hero1-btn-browse');

        browseBtn?.classList.remove('bg-accent-color');
        browseBtn?.classList.remove('text-white');
        browseBtn?.classList.remove('border-accent-color');

        browseBtn?.classList.add('bg-white');
        browseBtn?.classList.add('text-accent-color');
        browseBtn?.classList.add('border-white');

        const searchIcon = document.querySelector('.hero1-icon-search');
        searchIcon?.classList.remove('scale-100');
        searchIcon?.classList.add('scale-125');
    }

    function handleMouseLeave() {
        const browseBtn = document.querySelector('.hero1-btn-browse');

        browseBtn?.classList.remove('bg-white');
        browseBtn?.classList.remove('text-accent-color');
        browseBtn?.classList.remove('border-white');

        browseBtn?.classList.add('bg-accent-color');
        browseBtn?.classList.add('text-white');
        browseBtn?.classList.add('border-accent-color');

        const searchIcon = document.querySelector('.hero1-icon-search');
        searchIcon?.classList.remove('scale-125');
        searchIcon?.classList.add('scale-100');
    }

    function handleContactBtnEnter() {
        const phoneIcon = document.querySelector('.hero1-icon-phone');
        phoneIcon?.classList.remove('scale-100');
        phoneIcon?.classList.add('scale-125');
    }

    function handleContactBtnLeave() {
        const phoneIcon = document.querySelector('.hero1-icon-phone');
        phoneIcon?.classList.remove('scale-125');
        phoneIcon?.classList.add('scale-100');
    }

    return (
        <div className="swiper-slide hero-container hero-second flex flex-col">
            <div className="absolute w-[100vw] h-[100vh] backdrop-blur-sm"></div>
            <div className="w-[100vw] lg:h-[100vh] relative">
                <NavBar isMobileNavBarEnabled={isMobileNavBarEnabled} setIsMobileNavBarEnabled={setIsMobileNavBarEnabled} />
                <div className=".hero-main flex-grow text-very-light-gray flex items-center px-4 py-30 md:px-6 md:py-45 lg:px-10">
                    <div className="flex flex-col gap-y-8">
                        <h1 className="text-white text-5xl/15 md:text-6xl/15 lg:text-6xl/15 font-bold">Find
                            Your Next Ride
                        </h1>
                        <div className="flex items-center gap-x-4 md:gap-x-6 lg:gap-x-8 text-medium-gray">
                            <div className="flex items-center">
                                <IconContext.Provider value={{ className: 'size-5 md:size-7 lg:size-5' }}>
                                    <PiCar />
                                </IconContext.Provider>
                                <span className="pl-2 text-xs md:text-lg lg:text-xs font-semibold">Used Cars</span>
                            </div>
                            <div className="flex items-center">
                                <IconContext.Provider value={{ className: 'size-5 md:size-7 lg:size-5' }}>
                                    <BsAward />
                                </IconContext.Provider>
                                <span className="pl-2 text-xs md:text-lg lg:text-xs font-semibold">Award winning</span>
                            </div>
                            <div className="flex items-center">
                                <IconContext.Provider value={{ className: 'size-5 md:size-7 lg:size-5' }}>
                                    <FaRegClock />
                                </IconContext.Provider>
                                <span className="pl-2 text-xs md:text-lg lg:text-xs font-semibold">Since 2005</span>
                            </div>
                        </div>
                        <div className="flex gap-x-4">
                            <Button onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className="hero2-btn-browse bg-accent-color border border-accent-color text-white font-semibold text-md lg:text-lg py-6 lg:w-[35%] group rounded-sm hover:bg-white hover:text-accent-color hover:border-white">
                                <IconContext.Provider value={{ className: 'size-6 group-hover:scale-125 transition duration-500 group-hover:transition group-hover:duration-500' }}>
                                    <CiSearch />
                                </IconContext.Provider>
                                <span>Browse Cars</span>
                            </Button>
                            <Button onMouseEnter={handleContactBtnEnter} onMouseLeave={handleContactBtnLeave} className="hero2-btn-contact bg-transparent text-medium-gray border border-medium-gray font-semibold text-md lg:text-lg py-6 lg:w-[35%] group rounded-sm">
                                <IconContext.Provider value={{ className: 'text-medium-gray size-6 group-hover:scale-125 transition duration-500 group-hover:transition group-hover:duration-500' }}>
                                    <MdOutlineLocalPhone />
                                </IconContext.Provider>
                                <span>Contact Us</span>
                            </Button>
                        </div>
                    </div>
                </div>
                <CarsCarousel />
            </div>
        </div>
    )
}

export default function Hero() {
    const [isMobileNavBarEnabled, setIsMobileNavBarEnabled] = useState<boolean>(false);
    const [navHeight, setNavHeight] = useState<number>(0);

    useLayoutEffect(() => {
        const nav = document.querySelector('.nav');
        typeof nav?.clientHeight === 'number' && setNavHeight(nav.clientHeight);
    }, [])
    return (
        <div className="overflow-x-hidden">
            <Swiper
            slidesPerView={1}
            autoplay={{ delay: 8000 }}
            effect="fade"
            fadeEffect={{ crossFade: true }}
            speed={1000}
            modules={[Autoplay, EffectFade]}
            preventClicks={false}
            >
                <SwiperSlide>
                    <Hero1 isMobileNavBarEnabled={isMobileNavBarEnabled} setIsMobileNavBarEnabled={setIsMobileNavBarEnabled} />
                </SwiperSlide>
                <SwiperSlide>
                    <Hero2 isMobileNavBarEnabled={isMobileNavBarEnabled} setIsMobileNavBarEnabled={setIsMobileNavBarEnabled} />
                </SwiperSlide>
            </Swiper>
            <AnimatePresence>
                {isMobileNavBarEnabled && <MobileNavBar key={'1'} />}
                {isMobileNavBarEnabled && <Backdrop navHeight={navHeight} key={'2'} />}
            </AnimatePresence>
        </div>
    )
}