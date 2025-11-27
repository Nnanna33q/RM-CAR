import { NavigationMenu, NavigationMenuList, NavigationMenuItem } from "@radix-ui/react-navigation-menu";
import Bars from "./bars";
import { Button } from "./button";
import { IconContext } from "react-icons";
import { CiSearch } from "react-icons/ci";
import type { BarsProp, TBusinessInfo, TSelectFilter } from "@/lib/types";
import { motion } from "motion/react";
import { useState, useContext, useLayoutEffect } from 'react';
import { Link } from "react-router";
import { Select, SelectTrigger, SelectItem, SelectContent, SelectValue } from './select';
import { MdOutlineClear } from "react-icons/md";
import { LuHouse } from "react-icons/lu";
import { LuCarFront } from "react-icons/lu";
import { LuUsers } from "react-icons/lu";
import { LuSettings } from "react-icons/lu";
import { LuX } from "react-icons/lu";
import { LuLogOut } from "react-icons/lu";
import type { Dispatch, SetStateAction } from "react";
import AuthContext from "@/contexts/auth";
import { useNavigate } from "react-router";
import { Skeleton } from "./skeleton";
import BusinessInfoContext from "@/contexts/business-info";
import fallbackBusinessInfo from "@/data/business-info";

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
    const businessInfo = useContext(BusinessInfoContext) as TBusinessInfo | null;

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
                                <img src={businessInfo === null ? fallbackBusinessInfo.logo : businessInfo.logo} />
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
    const businessInfo = useContext(BusinessInfoContext) as TBusinessInfo | null;

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
                                <img src={businessInfo === null ? fallbackBusinessInfo.logo : businessInfo.logo} />
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

export function MobileNavBar({ pageName }: { pageName?: 'Home' | 'Listings' | 'About Us' | 'Contact' }) {
    const businessInfo = useContext(BusinessInfoContext) as TBusinessInfo | null;

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
            className={`mobile-navbar-container w-[75%] sm:w-[50%] h-[100vh] bg-black fixed top-0 left-0 z-170 text-very-light-gray font-manrope border-r-very-dark-gray`}>
            <div>
                <div className="border-b border-very-dark-gray px-4 py-4">
                    <div className="max-w-15 lg:max-w-20">
                        <img src={businessInfo === null ? fallbackBusinessInfo.logo : businessInfo.logo} />
                    </div>
                </div>
                <div className="flex flex-col gap-y-15 px-4 sm:px-8 py-12 font-bold">
                    <Link to={'/'} className={pageName === 'Home' ? 'text-accent-color' : ''}>Home</Link>
                    <Link to={'/listings'} className={pageName === 'Listings' ? 'text-accent-color' : ''}>Listings</Link>
                    <Link to={'/about'} className={pageName === 'About Us' ? 'text-accent-color' : ''}>About Us</Link>
                    <Link to={'/contact'} className={pageName === 'Contact' ? 'text-accent-color' : ''}>Contact</Link>
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

export function Filter({
    navHeight,
    disableFilter,
    selectFilter,
    findCarsWithFilters,
    handleMakeChange,
    handleModelChange,
    handleCategoryChange,
    handleFuelTypeChange,
    handleTransmissionChange,
    filterKey,
    resetFilter
}: {
    navHeight: number,
    disableFilter: () => void,
    selectFilter: TSelectFilter,
    findCarsWithFilters: () => Promise<void>,
    handleMakeChange: (value: string) => void,
    handleModelChange: (value: string) => void,
    handleCategoryChange: (value: string) => void,
    handleFuelTypeChange: (value: string) => void,
    handleTransmissionChange: (value: string) => void,
    filterKey: number
    resetFilter(): void
}) {
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
                <button disabled={!selectFilter} onClick={resetFilter} className={`flex items-center text-secondary border border-accent-color bg-accent-color px-6 py-1 rounded-sm ${selectFilter ? 'cursor-pointer' : 'cursor-not-allowed'}`}>
                    <span>Clear</span>
                </button>
                {selectFilter ? <div key={filterKey} className='selects-containers py-8 flex flex-col gap-y-4'>
                    <Select onValueChange={handleMakeChange}>
                        <SelectTrigger className="w-full py-6! border-very-dark-gray text-medium-gray! focus-visible:border-none!">
                            <SelectValue placeholder="Any Make" />
                        </SelectTrigger>
                        <SelectContent className='bg-black border-very-dark-gray text-medium-gray z-200'>
                            <SelectItem className='bg-black! text-medium-gray! hover:bg-primary! hover:text-medium-gray! py-3!' value="Any Make">Any Make</SelectItem>
                            {selectFilter.makes.map((m, i) => <SelectItem key={i} className='bg-black! text-medium-gray! hover:bg-primary! hover:text-medium-gray! py-3!' value={m}>{m}</SelectItem>)}
                        </SelectContent>
                    </Select>
                    <Select onValueChange={handleModelChange}>
                        <SelectTrigger className="w-full py-6! border-very-dark-gray text-medium-gray! focus-visible:border-none!">
                            <SelectValue placeholder="Any Model" />
                        </SelectTrigger>
                        <SelectContent className='bg-black border-very-dark-gray text-medium-gray z-200'>
                            <SelectItem className='bg-black! text-medium-gray! hover:bg-primary! hover:text-medium-gray! py-3!' value="Any Model">Any Model</SelectItem>
                            {selectFilter.models.map((m, i) => <SelectItem key={i} className='bg-black! text-medium-gray! hover:bg-primary! hover:text-medium-gray! py-3!' value={m}>{m}</SelectItem>)}
                        </SelectContent>
                    </Select>
                    <Select onValueChange={handleCategoryChange}>
                        <SelectTrigger className="w-full py-6! border-very-dark-gray text-medium-gray! focus-visible:border-none!">
                            <SelectValue placeholder="Any Category" />
                        </SelectTrigger>
                        <SelectContent className='bg-black border-very-dark-gray text-medium-gray z-200'>
                            <SelectItem className='bg-black! text-medium-gray! hover:bg-primary! hover:text-medium-gray! py-3!' value="Any Category">Any Category</SelectItem>
                            {selectFilter.categories.map((c, i) => <SelectItem key={i} className='bg-black! text-medium-gray! hover:bg-primary! hover:text-medium-gray! py-3!' value={c}>{c}</SelectItem>)}
                        </SelectContent>
                    </Select>
                    <Select onValueChange={handleFuelTypeChange}>
                        <SelectTrigger className="w-full py-6! border-very-dark-gray text-medium-gray! focus-visible:border-none!">
                            <SelectValue placeholder="Any Fuel" />
                        </SelectTrigger>
                        <SelectContent className='bg-black border-very-dark-gray text-medium-gray z-200'>
                            <SelectItem className='bg-black! text-medium-gray! hover:bg-primary! hover:text-medium-gray! py-3!' value="Any Fuel">Any Fuel</SelectItem>
                            {selectFilter.fuelTypes.map((f, i) => <SelectItem key={i} className='bg-black! text-medium-gray! hover:bg-primary! hover:text-medium-gray! py-3!' value={f}>{f}</SelectItem>)}
                        </SelectContent>
                    </Select>
                    <Select onValueChange={handleTransmissionChange}>
                        <SelectTrigger className="w-full py-6! border-very-dark-gray text-medium-gray! focus-visible:border-none!">
                            <SelectValue placeholder="Any Transmission" />
                        </SelectTrigger>
                        <SelectContent className='bg-black border-very-dark-gray text-medium-gray z-200'>
                            <SelectItem className='bg-black! text-medium-gray! hover:bg-primary! hover:text-medium-gray! py-3!' value="Any Transmission">Any Transmission</SelectItem>
                            {selectFilter.transmissions.map((t, i) => <SelectItem key={i} className='bg-black! text-medium-gray! hover:bg-primary! hover:text-medium-gray! py-3!' value={t}>{t}</SelectItem>)}
                        </SelectContent>
                    </Select>
                </div> : <div className='py-8 flex flex-col gap-y-4'>
                    <Skeleton className='h-[50px] w-full bg-very-dark-gray rounded-sm'></Skeleton>
                    <Skeleton className='h-[50px] w-full bg-very-dark-gray rounded-sm'></Skeleton>
                    <Skeleton className='h-[50px] w-full bg-very-dark-gray rounded-sm'></Skeleton>
                    <Skeleton className='h-[50px] w-full bg-very-dark-gray rounded-sm'></Skeleton>
                    <Skeleton className='h-[50px] w-full bg-very-dark-gray rounded-sm'></Skeleton>
                </div>}
                <button onClick={findCarsWithFilters} disabled={!selectFilter} className={`w-full flex items-center justify-center text-secondary border border-accent-color bg-accent-color py-3 rounded-sm ${selectFilter ? 'cursor-pointer' : 'cursor-not-allowed'}`}>
                    <IconContext.Provider value={{ className: 'stroke-1 size-4' }}>
                        <CiSearch />
                    </IconContext.Provider>
                    <span className="pl-2">Find Cars</span>
                </button>
            </div>
        </motion.div>
    )
}

export function AdminSidebar({ currentPage, setIsAdminNavbarEnabled }: { currentPage: 'Dashboard' | 'Inventory' | 'Enquiries' | 'Settings', setIsAdminNavbarEnabled: Dispatch<SetStateAction<boolean>> }) {
    const { setIsAuthenticated } = useContext(AuthContext);
    const navigate = useNavigate();

    function logOut() {
        localStorage.removeItem('accessToken');
        setIsAuthenticated(false);
        navigate('/admin/login', { replace: true });
    }

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
                <ul className="flex flex-col gap-y-8 py-8">
                    <li className="absolute top-4 right-4" onClick={() => setIsAdminNavbarEnabled(false)}>
                        <IconContext.Provider value={{ className: `size-6` }}>
                            <LuX />
                        </IconContext.Provider>
                    </li>
                    <a href={'/admin/dashboard'} className={`flex gap-x-4 items-center ${currentPage === 'Dashboard' && 'text-accent-color'}`}>
                        <IconContext.Provider value={{ className: `size-6` }}>
                            <LuHouse />
                        </IconContext.Provider>
                        <span className="font-semibold">Dashboard</span>
                    </a>
                    <a href={'/admin/inventory'} className={`flex gap-x-4 items-center ${currentPage === 'Inventory' && 'text-accent-color'}`}>
                        <IconContext.Provider value={{ className: `size-6` }}>
                            <LuCarFront />
                        </IconContext.Provider>
                        <span className="font-semibold">Inventory</span>
                    </a>
                    <a href={'/admin/enquiries'} className={`flex gap-x-4 items-center ${currentPage === 'Enquiries' && 'text-accent-color'}`}>
                        <IconContext.Provider value={{ className: `size-6` }}>
                            <LuUsers />
                        </IconContext.Provider>
                        <span className="font-semibold">Enquiries</span>
                    </a>
                    <a href={'/admin/settings'} className={`flex gap-x-4 items-center ${currentPage === 'Settings' && 'text-accent-color'}`}>
                        <IconContext.Provider value={{ className: `size-6` }}>
                            <LuSettings />
                        </IconContext.Provider>
                        <span className="font-semibold">Settings</span>
                    </a>
                    <a className={`flex gap-x-4 items-center`} onClick={logOut}>
                        <IconContext.Provider value={{ className: `size-6` }}>
                            <LuLogOut />
                        </IconContext.Provider>
                        <span className="font-semibold">Log out</span>
                    </a>
                </ul>
            </nav>
        </motion.div>
    )
}