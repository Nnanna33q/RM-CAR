import { useRef, useEffect, useState, useLayoutEffect } from 'react';
import { AnimatePresence, useInView } from 'motion/react';
import { StickyNavBar, MobileNavBar } from './navbar';
import Backdrop from './backdrop';
import { CiViewList } from "react-icons/ci";
import { animateListingsText } from '@/lib/animations';
import { HiOutlineAdjustmentsVertical } from "react-icons/hi2";
import { IconContext } from 'react-icons';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CarCard } from './card';
import { featuredCars } from '@/data/cars';
import { Filter } from './navbar';

export default function ListingsComponent() {
    const [isMobileNavBarEnabled, setIsMobileNavBarEnabled] = useState<boolean>(false);
    const [navHeight, setNavHeight] = useState(0);
    const [isFilterEnabled, setIsFilterEnabled] = useState<boolean>(false);
    const textRef = useRef(null);
    const isListingsInView = useInView(textRef);

    const disableFilter = () => {
        setIsFilterEnabled(false);
    }

    useEffect(() => {
        isListingsInView && animateListingsText();
    }, [isListingsInView]);

    useEffect(() => {
        isFilterEnabled ? document.body.classList.add('overflow-hidden') : document.body.classList.remove('overflow-hidden');
    }, [isFilterEnabled])

    useLayoutEffect(() => {
        const nav = document.querySelector('.nav');
        nav && setNavHeight(nav.clientHeight);
    }, [navHeight])

    return (
        <div>
            <StickyNavBar isMobileNavBarEnabled={isMobileNavBarEnabled} setIsMobileNavBarEnabled={setIsMobileNavBarEnabled} />
            <div ref={textRef} className="relative px-4 py-30 md:px-6 md:py-45 lg:px-10 lg:py-45 bg-primary flex flex-col gap-y-4">
                <div className="text-start pb-8 sm:pb-12 overflow-hidden flex flex-col gap-y-1 sm:gap-y-6 lg:w-[50%]">
                    <div className="listings-text-animate text-accent-color flex items-center border border-black rounded-full px-4 py-1 w-[fit-content] bg-accent-dark translate-y-16 opacity-0">
                        <div className='animate-pulse'><CiViewList /></div>
                        <div className="text-sm pl-2">Listings</div>
                    </div>
                    <h1 className="listings-text-animate text-secondary text-2xl/15 sm:text-2xl md:text-4xl/15 lg:text-4xl/15 font-bold translate-y-16 opacity-0">Browse Our Listings</h1>
                    <p className="listings-text-animate text-medium-gray text-md md:text-md lg:text-lg translate-y-16 opacity-0">
                        Browse our selection of quality pre-owned cars, all inspected and priced fairly to give you peace of mind while you shop.
                    </p>
                </div>
                <div className='lg:flex lg:gap-x-8'>
                    <div className='lg:w-[70%] flex flex-col gap-y-4 listings-text-animate translate-y-16 opacity-0'>
                        <div className='flex items-center gap-x-4'>
                            <div className='text-medium-gray text-sm'>Showing 1 - 6 Of 49 results</div>
                            <button onClick={() => setIsFilterEnabled(true)} className='bg-accent-color px-6 py-2 flex items-center gap-x-0.5 rounded-md text-secondary text-sm'>
                                <span>Filter</span>
                                <IconContext.Provider value={{ className: '' }}>
                                    <HiOutlineAdjustmentsVertical />
                                </IconContext.Provider>
                            </button>
                        </div>
                        <div className='flex gap-x-4 justify-between sm:justify-start'>
                            <Select>
                                <SelectTrigger className="w-[180px] border-very-dark-gray text-medium-gray! focus-visible:border-none!">
                                    <SelectValue placeholder="Show: 6" />
                                </SelectTrigger>
                                <SelectContent className='bg-black border-very-dark-gray text-medium-gray'>
                                    <SelectItem className='bg-black! text-medium-gray! hover:bg-primary! hover:text-medium-gray!' value="Show: 6">Show: 6</SelectItem>
                                    <SelectItem className='bg-black! text-medium-gray! hover:bg-primary! hover:text-medium-gray!' value="Show: 9">Show: 9</SelectItem>
                                    <SelectItem className='bg-black! text-medium-gray! hover:bg-primary! hover:text-medium-gray!' value="Show: 12">Show: 12</SelectItem>
                                </SelectContent>
                            </Select>
                            <Select>
                                <SelectTrigger className="w-[180px] border-very-dark-gray text-medium-gray! focus-visible:border-none!">
                                    <SelectValue placeholder="Sort by (Default)" />
                                </SelectTrigger>
                                <SelectContent className='bg-black border-very-dark-gray text-medium-gray'>
                                    <SelectItem className='bg-black! text-medium-gray! hover:bg-primary! hover:text-medium-gray!' value="Sort by (Default)">Sort by (Default)</SelectItem>
                                    <SelectItem className='bg-black! text-medium-gray! hover:bg-primary! hover:text-medium-gray!' value="Price Ascending">Price Ascending</SelectItem>
                                    <SelectItem className='bg-black! text-medium-gray! hover:bg-primary! hover:text-medium-gray!' value="Price Descending">Price Descending</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className='py-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-y-12 gap-x-4 md:gap-x-8 lg:gap-x-4'>
                            {featuredCars.map(f => {
                                return (
                                    <CarCard
                                        key={f.key}
                                        images={f.images}
                                        carManufacturer={f.carManufacturer}
                                        carCategory={f.carCategory}
                                        carModel={f.carModel}
                                        carYear={f.carYear}
                                        carVariant={f.carVariant}
                                        mileage={f.mileage}
                                        fuelType={f.fuelType}
                                        transmissionType={f.transmissionType}
                                        price={f.price} />
                                )
                            })}
                        </div>
                    </div>
                    <div className='h-fit border border-very-dark-gray rounded-md desktop-filter hidden lg:block lg:w-[30%] p-8 listings-text-animate translate-y-16 opacity-0'>
                        <div className='flex items-center justify-between'>
                            <div className='text-secondary text-lg'>Filters & Sort</div>
                            <button className='flex items-center text-secondary border border-accent-color bg-accent-color px-6 py-1 rounded-sm'>
                                <span>Clear</span>
                            </button>
                        </div>
                        <div className='selects-containers py-8 flex flex-col gap-y-4'>
                            <Select>
                                <SelectTrigger className="w-full py-6! border-very-dark-gray text-medium-gray! focus-visible:border-none!">
                                    <SelectValue placeholder="Any Make" />
                                </SelectTrigger>
                                <SelectContent className='bg-black border-very-dark-gray text-medium-gray'>
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
                                <SelectContent className='bg-black border-very-dark-gray text-medium-gray'>
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
                                <SelectContent className='bg-black border-very-dark-gray text-medium-gray'>
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
                                <SelectContent className='bg-black border-very-dark-gray text-medium-gray'>
                                    <SelectItem className='bg-black! text-medium-gray! hover:bg-primary! hover:text-medium-gray! py-3!' value="Any Fuel">Any Fuel</SelectItem>
                                    <SelectItem className='bg-black! text-medium-gray! hover:bg-primary! hover:text-medium-gray! py-3!' value="Diesel">Diesel</SelectItem>
                                    <SelectItem className='bg-black! text-medium-gray! hover:bg-primary! hover:text-medium-gray! py-3!' value="Fuel">Fuel</SelectItem>
                                </SelectContent>
                            </Select>
                            <Select>
                                <SelectTrigger className="w-full py-6! border-very-dark-gray text-medium-gray! focus-visible:border-none!">
                                    <SelectValue placeholder="Any Transmission" />
                                </SelectTrigger>
                                <SelectContent className='bg-black border-very-dark-gray text-medium-gray'>
                                    <SelectItem className='bg-black! text-medium-gray! hover:bg-primary! hover:text-medium-gray! py-3!' value="Any Transmission">Any Fuel</SelectItem>
                                    <SelectItem className='bg-black! text-medium-gray! hover:bg-primary! hover:text-medium-gray! py-3!' value="Automatic">Automatic</SelectItem>
                                    <SelectItem className='bg-black! text-medium-gray! hover:bg-primary! hover:text-medium-gray! py-3!' value="Manual">Manual</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>
            </div>
            <AnimatePresence>
                {isMobileNavBarEnabled && <MobileNavBar key={'1'} />}
                {isMobileNavBarEnabled && <Backdrop key={'2'} />}
                {isFilterEnabled && <Filter navHeight={navHeight} disableFilter={disableFilter} key={'3'} />}
                {isFilterEnabled && <Backdrop key={'4'} />}
            </AnimatePresence>
        </div>
    )
}