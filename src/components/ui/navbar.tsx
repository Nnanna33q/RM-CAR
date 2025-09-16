import { NavigationMenu, NavigationMenuList, NavigationMenuItem } from "@radix-ui/react-navigation-menu"
import logo from '../../assets/logo-light.png';
import Bars from "./bars";
import { Button } from "./button";
import { IconContext } from "react-icons";
import { CiSearch } from "react-icons/ci";
import type { BarsProp } from "@/lib/types";
import { motion } from "motion/react";
import { useState, useLayoutEffect } from 'react';
import { Link } from "react-router";

const variants = {
    initial: {
        x: '-100vw'
    },
    animate: {
        x: 0
    },
    exit: {
        x: '-100vw'
    }
}

export default function NavBar({ isMobileNavBarEnabled, setIsMobileNavBarEnabled }: BarsProp) {
    const [translate, setTranslate] = useState(0);

    useLayoutEffect(() => {
        const nav = document.querySelector('.nav');
        nav && setTranslate((window.innerWidth - nav.clientWidth) / 2);
    }, [translate]);

    return (
        <div className={`opacity-0 poiter-events-none w-[100%] md:w-[90%] flex justify-center`} style={{ transform: window.innerWidth >= 768 ? `translateX(${translate}px)` : '' }}>
            <NavigationMenu className="nav w-full bg-black rounded-sm text-very-light-gray px-4 md:px-6 py-4 md:py-2 font-manrope backdrop-blur-xs border-b md:border border-very-dark-gray">
                <NavigationMenuList className="flex justify-between items-center w-full">
                    <div className="w-[75%]">
                        <NavigationMenuItem className="max-w-15 md:max-w-18 lg:max-w-20">
                            <Link to={'/'}>
                                <img src={logo} />
                            </Link>
                        </NavigationMenuItem>
                    </div>
                    <div className="hidden md:inline-flex md:w-[50%] lg:w-[25%] flex justify-between font-bold text-md">
                        <NavigationMenuItem>
                            <Link to={'/listings'}>Listings</Link>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <Link to={'/about'}>About Us</Link>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <Link to={'/contact'}>Contact</Link>
                        </NavigationMenuItem>
                    </div>
                    <div className="md:hidden">
                        <Bars isMobileNavBarEnabled={isMobileNavBarEnabled} setIsMobileNavBarEnabled={setIsMobileNavBarEnabled} />
                    </div>
                </NavigationMenuList>
            </NavigationMenu>
        </div>
    )
}

export function StickyNavBar({ isMobileNavBarEnabled, setIsMobileNavBarEnabled }: BarsProp) {
    const [translate, setTranslate] = useState(0);

    useLayoutEffect(() => {
        const nav = document.querySelector('.sticky-nav');
        nav && setTranslate((window.innerWidth - nav.clientWidth) / 2);
    }, [translate]);

    return (
        <div className={`sticky-nav-parent w-[100%] md:w-[90%] flex justify-center fixed top-0 md:top-8 z-200`} style={{ transform: window.innerWidth >= 768 ? `translateX(${translate}px)` : '' }}>
            <NavigationMenu className="sticky-nav w-full bg-black md:rounded-sm text-very-light-gray px-4 md:px-6 py-4 md:py-2 font-manrope backdrop-blur-xs border-b md:border border-black">
                <NavigationMenuList className="flex justify-between items-center w-full">
                    <div className="w-[75%]">
                        <NavigationMenuItem className="max-w-15 md:max-w-18 lg:max-w-20">
                            <Link to={'/'}>
                                <img src={logo} />
                            </Link>
                        </NavigationMenuItem>
                    </div>
                    <div className="hidden md:inline-flex md:w-[50%] lg:w-[25%] flex justify-between font-bold text-md">
                        <NavigationMenuItem>
                            <Link to={'/listings'}>Listings</Link>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <Link to={'/about'}>About Us</Link>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <Link to={'/contact'}>Contact</Link>
                        </NavigationMenuItem>
                    </div>
                    <div className="md:hidden">
                        <Bars isMobileNavBarEnabled={isMobileNavBarEnabled} setIsMobileNavBarEnabled={setIsMobileNavBarEnabled} />
                    </div>
                </NavigationMenuList>
            </NavigationMenu>
        </div>
    )
}

export function MobileNavBar() {
    return (
        <motion.div
            variants={variants}
            initial={'initial'}
            animate={'animate'}
            exit={'exit'}
            transition={{
                duration: 0.3,
                bounce: 0
            }}
            className={`mobile-navbar-container w-[75%] sm:w-[50%] h-[100vh] bg-black fixed top-0 left-0 z-150 text-very-light-gray font-manrope border-r-very-dark-gray`}>
            <div>
                <div className="border-b border-very-dark-gray px-4 py-4">
                    <div className="max-w-15 lg:max-w-20">
                        <img src={logo} />
                    </div>
                </div>
                <div className="flex flex-col gap-y-15 px-4 sm:px-8 py-12 font-bold">
                    <Link to={'/'} className="text-accent-color">Home</Link>
                    <Link to={'/listings'}>Listings</Link>
                    <Link to={'/about'}>About Us</Link>
                    <Link to={'/contact'}>Contact</Link>
                </div>
                <div className="px-4 sm:px-6">
                    <Button className="bg-accent-color border border-accent-color text-white font-semibold text-md lg:text-lg py-6 lg:w-[35%] group rounded-sm w-full hover:bg-white hover:text-accent-color hover:border-white">
                        <Link to={'/listings'} className="flex gap-x-1">
                            <IconContext.Provider value={{ className: 'size-6 group-hover:scale-125 transition duration-500 group-hover:transition group-hover:duration-500' }}>
                                <CiSearch />
                            </IconContext.Provider>
                            <span>Browse Cars</span>
                        </Link>
                    </Button>
                </div>
            </div>
        </motion.div>
    )
}