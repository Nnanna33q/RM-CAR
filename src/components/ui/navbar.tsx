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
import { Select, SelectTrigger, SelectItem, SelectContent, SelectValue } from './select';
import { MdOutlineClear } from "react-icons/md";
import { LuHouse } from "react-icons/lu";
import { LuCarFront } from "react-icons/lu";
import { LuUsers } from "react-icons/lu";
import { LuChartNoAxesColumn } from "react-icons/lu";
import { LuSettings } from "react-icons/lu";
import { LuX } from "react-icons/lu";
import { LuLogOut } from "react-icons/lu";
import type { Dispatch, SetStateAction } from "react";

const mobileNavBarVariants = {
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

const filterVariants = {
    initial: {
        x: '100vw'
    },
    animate: {
        x: 0
    },
    exit: {
        x: '100vw'
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
            variants={mobileNavBarVariants}
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

export function Filter({ navHeight, disableFilter }: { navHeight: number, disableFilter: () => void }) {
    return (
        <motion.div
            variants={filterVariants}
            initial={'initial'}
            animate={'animate'}
            exit={'exit'}
            transition={{
                duration: 0.3,
                bounce: 0
            }}
            className={`filter-container w-[100%] sm:w-[75%] h-[100vh] bg-black z-200`} style={{ position: 'fixed', top: navHeight + 'px', right: 0 }}>
            <div className='h-fit rounded-md lg:w-[30%] py-4 px-8'>
                <div className='flex items-center justify-between py-4'>
                    <div className='text-secondary text-lg'>Filters & Sort</div>
                    <div onClick={() => disableFilter()}>
                        <IconContext.Provider value={{ className: 'text-medium-gray size-6' }}><MdOutlineClear /></IconContext.Provider>
                    </div>
                </div>
                <button className='flex items-center text-secondary border border-accent-color bg-accent-color px-6 py-1 rounded-sm'>
                    <span>Clear</span>
                </button>
                <div className='selects-containers py-8 flex flex-col gap-y-4'>
                    <Select>
                        <SelectTrigger className="w-full py-6! border-very-dark-gray text-medium-gray! focus-visible:border-none!">
                            <SelectValue placeholder="Any Make" />
                        </SelectTrigger>
                        <SelectContent className='bg-black border-very-dark-gray text-medium-gray z-200'>
                            <SelectItem className='bg-black! text-medium-gray! hover:bg-primary! hover:text-medium-gray! py-3!' value="Any Make">Any Make</SelectItem>
                            <SelectItem className='bg-black! text-medium-gray! hover:bg-primary! hover:text-medium-gray! py-3!' value="Renault">Renault</SelectItem>
                            <SelectItem className='bg-black! text-medium-gray! hover:bg-primary! hover:text-medium-gray! py-3!' value="Ford">Ford</SelectItem>
                            <SelectItem className='bg-black! text-medium-gray! hover:bg-primary! hover:text-medium-gray! py-3!' value="Citroen">Citroen</SelectItem>
                        </SelectContent>
                    </Select>
                    <Select>
                        <SelectTrigger className="w-full py-6! border-very-dark-gray text-medium-gray! focus-visible:border-none!">
                            <SelectValue placeholder="Any Model" />
                        </SelectTrigger>
                        <SelectContent className='bg-black border-very-dark-gray text-medium-gray z-200'>
                            <SelectItem className='bg-black! text-medium-gray! hover:bg-primary! hover:text-medium-gray! py-3!' value="Any Make">Any Model</SelectItem>
                            <SelectItem className='bg-black! text-medium-gray! hover:bg-primary! hover:text-medium-gray! py-3!' value="Clio">Clio</SelectItem>
                            <SelectItem className='bg-black! text-medium-gray! hover:bg-primary! hover:text-medium-gray! py-3!' value="EcoSport">EcoSport</SelectItem>
                            <SelectItem className='bg-black! text-medium-gray! hover:bg-primary! hover:text-medium-gray! py-3!' value="C1">C1</SelectItem>
                        </SelectContent>
                    </Select>
                    <Select>
                        <SelectTrigger className="w-full py-6! border-very-dark-gray text-medium-gray! focus-visible:border-none!">
                            <SelectValue placeholder="Any Body" />
                        </SelectTrigger>
                        <SelectContent className='bg-black border-very-dark-gray text-medium-gray z-200'>
                            <SelectItem className='bg-black! text-medium-gray! hover:bg-primary! hover:text-medium-gray! py-3!' value="Any Body">Any Body</SelectItem>
                            <SelectItem className='bg-black! text-medium-gray! hover:bg-primary! hover:text-medium-gray! py-3!' value="Convertible">Convertible</SelectItem>
                            <SelectItem className='bg-black! text-medium-gray! hover:bg-primary! hover:text-medium-gray! py-3!' value="Coupe">Coupe</SelectItem>
                            <SelectItem className='bg-black! text-medium-gray! hover:bg-primary! hover:text-medium-gray! py-3!' value="Hatchback">Hatchback</SelectItem>
                            <SelectItem className='bg-black! text-medium-gray! hover:bg-primary! hover:text-medium-gray! py-3!' value="SUV">SUV</SelectItem>
                            <SelectItem className='bg-black! text-medium-gray! hover:bg-primary! hover:text-medium-gray! py-3!' value="Sedan">Sedan</SelectItem>
                        </SelectContent>
                    </Select>
                    <Select>
                        <SelectTrigger className="w-full py-6! border-very-dark-gray text-medium-gray! focus-visible:border-none!">
                            <SelectValue placeholder="Any Fuel" />
                        </SelectTrigger>
                        <SelectContent className='bg-black border-very-dark-gray text-medium-gray z-200'>
                            <SelectItem className='bg-black! text-medium-gray! hover:bg-primary! hover:text-medium-gray! py-3!' value="Any Fuel">Any Fuel</SelectItem>
                            <SelectItem className='bg-black! text-medium-gray! hover:bg-primary! hover:text-medium-gray! py-3!' value="Diesel">Diesel</SelectItem>
                            <SelectItem className='bg-black! text-medium-gray! hover:bg-primary! hover:text-medium-gray! py-3!' value="Fuel">Fuel</SelectItem>
                        </SelectContent>
                    </Select>
                    <Select>
                        <SelectTrigger className="w-full py-6! border-very-dark-gray text-medium-gray! focus-visible:border-none!">
                            <SelectValue placeholder="Any Transmission" />
                        </SelectTrigger>
                        <SelectContent className='bg-black border-very-dark-gray text-medium-gray z-200'>
                            <SelectItem className='bg-black! text-medium-gray! hover:bg-primary! hover:text-medium-gray! py-3!' value="Any Transmission">Any Fuel</SelectItem>
                            <SelectItem className='bg-black! text-medium-gray! hover:bg-primary! hover:text-medium-gray! py-3!' value="Automatic">Automatic</SelectItem>
                            <SelectItem className='bg-black! text-medium-gray! hover:bg-primary! hover:text-medium-gray! py-3!' value="Manual">Manual</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
        </motion.div>
    )
}

export function AdminSidebar({ currentPage, setIsAdminNavbarEnabled }: { currentPage: 'Dashboard' | 'Inventory' | 'Inquiries' | 'Stats' | 'Settings', setIsAdminNavbarEnabled: Dispatch<SetStateAction<boolean>> }) {
    return (
        <motion.div
            variants={mobileNavBarVariants}
            initial={'initial'}
            animate={'animate'}
            exit={'exit'}
            transition={{
                duration: 0.3,
                bounce: 0
            }}
            className={`admin-sidebar-container w-[75%] sm:w-[50%] h-[100vh] bg-black fixed top-0 left-0 z-150 text-very-light-gray border-r-very-dark-gray`}>
            <nav className="flex flex-col h-[100vh] bg-black text-medium-gray py-8 px-4 md:hidden">
                <div className="flex flex-col gap-y-8 py-8">
                    <div className="absolute top-4 right-4" onClick={() => setIsAdminNavbarEnabled(false)}>
                        <IconContext.Provider value={{ className: `size-6` }}>
                            <LuX />
                        </IconContext.Provider>
                    </div>
                    <div className={`flex gap-x-4 items-center ${currentPage === 'Dashboard' && 'text-accent-color'}`}>
                        <IconContext.Provider value={{ className: `size-6` }}>
                            <LuHouse />
                        </IconContext.Provider>
                        <span className="font-semibold">Dashboard</span>
                    </div>
                    <div className={`flex gap-x-4 items-center ${currentPage === 'Inventory' && 'text-accent-color'}`}>
                        <IconContext.Provider value={{ className: `size-6` }}>
                            <LuCarFront />
                        </IconContext.Provider>
                        <span className="font-semibold">Inventory</span>
                    </div>
                    <div className={`flex gap-x-4 items-center ${currentPage === 'Inquiries' && 'text-accent-color'}`}>
                        <IconContext.Provider value={{ className: `size-6` }}>
                            <LuUsers />
                        </IconContext.Provider>
                        <span className="font-semibold">Inquiries</span>
                    </div>
                    <div className={`flex gap-x-4 items-center ${currentPage === 'Stats' && 'text-accent-color'}`}>
                        <IconContext.Provider value={{ className: `size-6` }}>
                            <LuChartNoAxesColumn />
                        </IconContext.Provider>
                        <span className="font-semibold">Stats</span>
                    </div>
                    <div className={`flex gap-x-4 items-center ${currentPage === 'Settings' && 'text-accent-color'}`}>
                        <IconContext.Provider value={{ className: `size-6` }}>
                            <LuSettings />
                        </IconContext.Provider>
                        <span className="font-semibold">Settings</span>
                    </div>
                    <div className={`flex gap-x-4 items-center`}>
                        <IconContext.Provider value={{ className: `size-6` }}>
                            <LuLogOut />
                        </IconContext.Provider>
                        <span className="font-semibold">Log out</span>
                    </div>
                </div>
            </nav>
        </motion.div>
    )
}