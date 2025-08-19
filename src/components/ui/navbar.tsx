import { NavigationMenu, NavigationMenuList, NavigationMenuItem } from "@radix-ui/react-navigation-menu"
import logo from '../../assets/logo-light.png';
import Bars from "./bars";
import { Button } from "./button";
import { IconContext } from "react-icons";
import { CiSearch } from "react-icons/ci";
import type { BarsProp } from "@/lib/types";
import { motion } from "motion/react";

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
    return (
        <NavigationMenu className="nav w-[100%] text-very-light-gray px-4 md:px-6 py-4 md:py-6 font-manrope backdrop-blur-xs border-b border-very-dark-gray sticky top-0">
            <NavigationMenuList className="flex justify-between items-center w-full">
                <div className="w-[75%]">
                    <NavigationMenuItem className="max-w-15 md:max-w-18 lg:max-w-20">
                        <img src={logo} />
                    </NavigationMenuItem>
                </div>
                <div className="hidden md:inline-flex md:w-[50%] lg:w-[25%] flex justify-between font-bold text-md">
                    <NavigationMenuItem>
                        Listings
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        About Us
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        Contact
                    </NavigationMenuItem>
                </div>
                <div className="md:hidden">
                    <Bars isMobileNavBarEnabled={isMobileNavBarEnabled} setIsMobileNavBarEnabled={setIsMobileNavBarEnabled} />
                </div>
            </NavigationMenuList>
        </NavigationMenu>
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
            className={`mobile-navbar-container w-[75%] sm:w-[50%] h-[100vh] bg-black fixed top-0 left-0 z-150 text-very-light-gray font-manrope  border-r-very-dark-gray`}>
            <div className="border-b border-very-dark-gray px-4 py-4">
                <div className="max-w-15 lg:max-w-20">
                    <img src={logo} />
                </div>
            </div>
            <div className="flex flex-col gap-y-15 px-4 sm:px-8 py-12 font-bold">
                <div className="text-accent-color">Home</div>
                <div>Listings</div>
                <div>About Us</div>
                <div>Contact</div>
            </div>
            <div className="px-4 sm:px-6">
                <Button className="bg-accent-color border border-accent-color text-white font-semibold text-md lg:text-lg py-6 lg:w-[35%] group rounded-sm w-full hover:bg-white hover:text-accent-color hover:border-white">
                    <IconContext.Provider value={{ className: 'size-6 group-hover:scale-125 transition duration-500 group-hover:transition group-hover:duration-500' }}>
                        <CiSearch />
                    </IconContext.Provider>
                    <span>Browse Cars</span>
                </Button>
            </div>
        </motion.div>
    )
}