import { useRef, useEffect, useState, useLayoutEffect, useContext } from 'react';
import { AnimatePresence, useInView } from 'motion/react';
import { StickyNavBar, MobileNavBar } from './navbar';
import Backdrop from './backdrop';
import { CiViewList } from "react-icons/ci";
import { animateListingsText } from '@/lib/animations';
import { HiOutlineAdjustmentsVertical } from "react-icons/hi2";
import { IconContext } from 'react-icons';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CarCard } from './card';
import { Filter } from './navbar';
import PageContext from '@/contexts/page';
import AlertErrorContext from '@/contexts/alert-error';
import type { Car, TFilter, TSelectFilter } from '@/lib/types';
import { getListingsCarsData, getListingsCarsFilters, isNextPage } from '@/lib/utils';
import { Skeleton } from './skeleton';
import { RxCaretLeft, RxCaretRight } from 'react-icons/rx';
import { CiSearch } from 'react-icons/ci';
import { LuRefreshCcw } from 'react-icons/lu';

export default function ListingsComponent() {
    const [isMobileNavBarEnabled, setIsMobileNavBarEnabled] = useState<boolean>(false);
    const [navHeight, setNavHeight] = useState(0);
    const [isFilterEnabled, setIsFilterEnabled] = useState<boolean>(false);
    const textRef = useRef(null);
    const isListingsInView = useInView(textRef);
    const { page, setPage } = useContext(PageContext);
    const [, setIsError] = useContext(AlertErrorContext);
    const [cars, setCars] = useState<Car[] | undefined | null>(undefined);
    const [totalCars, setTotalCars] = useState<number | undefined>(undefined);
    const [limit, setLimit] = useState(4);
    const [sortBy, setSortBy] = useState<"Default" | "Ascending" | "Descending">('Default');
    const [filter, setFilter] = useState<TFilter>({
        make: '',
        model: '',
        category: '',
        fuelType: '',
        transmission: ''
    });
    const [selectFilter, setSelectFilter] = useState<TSelectFilter>();
    const [filterKey, setFilterKey] = useState(0);

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

    useEffect(() => {
        getListingsCarsData({ page, setCars, setIsError, setTotalCars, limit, sortBy, filter });
    }, [page, limit, sortBy]);

    useEffect(() => {
        // Gets the default select filters
        getListingsCarsFilters({ setIsError, setSelectFilter });
    }, []);

    function resetFilter() {
        setFilter({ make: '', model: '', category: '', fuelType: '', transmission: '' });
        setFilterKey(filterKey + 1);
    }

    function handleLimitChange(value: string) {
        const limit = value.split(' ')[1];
        setLimit(parseInt(limit));
        setCars(undefined);
        setTotalCars(undefined);
    }

    function handleSortByChange(value: string) {
        if (value === 'Sort by (Default)') {
            setSortBy('Default');
        } else if (value === 'Price Ascending') {
            setSortBy('Ascending');
        } else setSortBy('Descending');
        setCars(undefined);
        setTotalCars(undefined);
    }

    function RenderPagination() {
        if (!totalCars) {
            return (
                <div className='flex items-center justify-end sm:justify-start'>
                    <div className="flex items-center gap-x-8">
                        <button disabled={true} className={`flex items-center gap-x-1 text-muted-foreground cursor-not-allowed font-bold`}>
                            <RxCaretLeft />
                            <span className="text-sm">Prev</span>
                        </button>
                        <button disabled={true} className={`flex items-center gap-x-1 text-muted-foreground cursor-not-allowed font-bold`}>
                            <span className="text-sm">Next</span>
                            <RxCaretRight />
                        </button>
                    </div>
                </div>
            )
        }
        return (
            <div className='flex items-center justify-end sm:justify-start'>
                <div className="flex items-center gap-x-8">
                    <button disabled={page <= 1} onClick={() => setPage(page - 1)} className={`flex items-center gap-x-1 ${page <= 1 ? 'text-muted-foreground cursor-not-allowed' : 'text-secondary cursor-pointer'} font-bold`}>
                        <RxCaretLeft />
                        <span className="text-sm">Prev</span>
                    </button>
                    <button disabled={!isNextPage(limit, page, totalCars)} onClick={() => setPage(page + 1)} className={`flex items-center gap-x-1 ${isNextPage(limit, page, totalCars) ? 'text-secondary cursor-pointer' : 'text-muted-foreground cursor-not-allowed'} font-bold`}>
                        <span className="text-sm">Next</span>
                        <RxCaretRight />
                    </button>
                </div>
            </div>
        )
    }

    function handleMakeChange(value: string) {
        setFilter({ ...filter, make: value === 'Any Make' ? '' : value });
    }

    function handleModelChange(value: string) {
        setFilter({ ...filter, model: value === 'Any Model' ? '' : value });
    }

    function handleCategoryChange(value: string) {
        setFilter({ ...filter, category: value === 'Any Category' ? '' : value });
    }

    function handleFuelTypeChange(value: string) {
        setFilter({ ...filter, fuelType: value === 'Any Fuel' ? '' : value });
    }

    function handleTransmissionChange(value: string) {
        setFilter({ ...filter, transmission: value === 'Any Transmission' ? '' : value });
    }

    async function findCarsWithFilters() {
        disableFilter();
        getListingsCarsData({ page, setCars, setIsError, setTotalCars, limit, sortBy, filter });
    }

    function RenderListingsCars({ cars, totalCars }: { cars: Car[] | undefined | null, totalCars?: number }) {
        if (cars === undefined) {
            return (
                <>
                    <div>
                        <Skeleton className='h-[231px] w-full bg-very-dark-gray border border-black rounded-none'></Skeleton>
                        <div className='bg-black p-4 flex flex-col gap-y-8'>
                            <div className='flex flex-col gap-y-4'>
                                <Skeleton className='h-[14px] w-[50px] rounded-xs bg-very-dark-gray'></Skeleton>
                                <Skeleton className='h-[20px] w-[200px] rounded-xs bg-very-dark-gray'></Skeleton>
                                <div className='flex gap-x-4'>
                                    <Skeleton className='h-[16px] w-[75px] rounded-xs bg-very-dark-gray'></Skeleton>
                                    <Skeleton className='h-[16px] w-[75px] rounded-xs bg-very-dark-gray'></Skeleton>
                                    <Skeleton className='h-[16px] w-[75px] rounded-xs bg-very-dark-gray'></Skeleton>
                                </div>
                            </div>
                            <Skeleton className="h-[32px] w-[100px] rounded-sm bg-very-dark-gray"></Skeleton>
                            <Skeleton className='h-[50px] w-full bg-very-dark-gray'></Skeleton>
                        </div>
                    </div>
                    <div>
                        <Skeleton className='h-[231px] w-full bg-very-dark-gray border border-black rounded-none'></Skeleton>
                        <div className='bg-black p-4 flex flex-col gap-y-8'>
                            <div className='flex flex-col gap-y-4'>
                                <Skeleton className='h-[14px] w-[50px] rounded-xs bg-very-dark-gray'></Skeleton>
                                <Skeleton className='h-[20px] w-[200px] rounded-xs bg-very-dark-gray'></Skeleton>
                                <div className='flex gap-x-4'>
                                    <Skeleton className='h-[16px] w-[75px] rounded-xs bg-very-dark-gray'></Skeleton>
                                    <Skeleton className='h-[16px] w-[75px] rounded-xs bg-very-dark-gray'></Skeleton>
                                    <Skeleton className='h-[16px] w-[75px] rounded-xs bg-very-dark-gray'></Skeleton>
                                </div>
                            </div>
                            <Skeleton className="h-[32px] w-[100px] rounded-sm bg-very-dark-gray"></Skeleton>
                            <Skeleton className='h-[50px] w-full bg-very-dark-gray'></Skeleton>
                        </div>
                    </div>
                    <div>
                        <Skeleton className='h-[231px] w-full bg-very-dark-gray border border-black rounded-none'></Skeleton>
                        <div className='bg-black p-4 flex flex-col gap-y-8'>
                            <div className='flex flex-col gap-y-4'>
                                <Skeleton className='h-[14px] w-[50px] rounded-xs bg-very-dark-gray'></Skeleton>
                                <Skeleton className='h-[20px] w-[200px] rounded-xs bg-very-dark-gray'></Skeleton>
                                <div className='flex gap-x-4'>
                                    <Skeleton className='h-[16px] w-[75px] rounded-xs bg-very-dark-gray'></Skeleton>
                                    <Skeleton className='h-[16px] w-[75px] rounded-xs bg-very-dark-gray'></Skeleton>
                                    <Skeleton className='h-[16px] w-[75px] rounded-xs bg-very-dark-gray'></Skeleton>
                                </div>
                            </div>
                            <Skeleton className="h-[32px] w-[100px] rounded-sm bg-very-dark-gray"></Skeleton>
                            <Skeleton className='h-[50px] w-full bg-very-dark-gray'></Skeleton>
                        </div>
                    </div>
                    <div>
                        <Skeleton className='h-[231px] w-full bg-very-dark-gray border border-black rounded-none'></Skeleton>
                        <div className='bg-black p-4 flex flex-col gap-y-8'>
                            <div className='flex flex-col gap-y-4'>
                                <Skeleton className='h-[14px] w-[50px] rounded-xs bg-very-dark-gray'></Skeleton>
                                <Skeleton className='h-[20px] w-[200px] rounded-xs bg-very-dark-gray'></Skeleton>
                                <div className='flex gap-x-4'>
                                    <Skeleton className='h-[16px] w-[75px] rounded-xs bg-very-dark-gray'></Skeleton>
                                    <Skeleton className='h-[16px] w-[75px] rounded-xs bg-very-dark-gray'></Skeleton>
                                    <Skeleton className='h-[16px] w-[75px] rounded-xs bg-very-dark-gray'></Skeleton>
                                </div>
                            </div>
                            <Skeleton className="h-[32px] w-[100px] rounded-sm bg-very-dark-gray"></Skeleton>
                            <Skeleton className='h-[50px] w-full bg-very-dark-gray'></Skeleton>
                        </div>
                    </div>
                </>
            )
        }

        if (cars === null) {
            return (
                <div className='flex flex-col gap-y-4'>
                    <span className='text-medium-gray'>Unable to load cars. Please retry.</span>
                    <div className='flex items-center justify-center sm:justify-start'>
                        <div onClick={() => getListingsCarsData({ page, setCars, setIsError, setTotalCars, limit, sortBy, filter })}>
                            <IconContext.Provider value={{ className: 'text-medium-gray size-6' }}>
                                <LuRefreshCcw />
                            </IconContext.Provider>
                        </div>
                    </div>
                </div>
            )
        }

        if (cars.length > 0) {
            return (
                <>
                    {cars.map(c => {
                        return (
                            <CarCard
                                key={c._id}
                                images={c.images}
                                carManufacturer={c.make}
                                carCategory={c.category}
                                carModel={c.model}
                                carYear={c.year}
                                carVariant={c.variant}
                                mileage={c.mileage}
                                fuelType={c.fuelType}
                                transmissionType={c.transmission}
                                price={c.price} />
                        )
                    })}
                </>)
        }

        if (cars.length === 0 && totalCars === 0) {
            return <div className='text-medium-gray'>No cars available at the moment</div>
        }
    }

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
                            <div className='text-medium-gray text-sm'>Showing {(page - 1) * limit + 1} - {limit * page} Of {totalCars} results</div>
                            <button onClick={window.innerWidth < 1024 ? () => setIsFilterEnabled(true) : undefined} className='bg-accent-color px-6 py-2 flex items-center gap-x-0.5 rounded-md text-secondary text-sm'>
                                <span>Filter</span>
                                <IconContext.Provider value={{ className: '' }}>
                                    <HiOutlineAdjustmentsVertical />
                                </IconContext.Provider>
                            </button>
                        </div>
                        <div className='flex gap-x-4 justify-between sm:justify-start'>
                            <Select onValueChange={handleLimitChange}>
                                <SelectTrigger className="w-[180px] border-very-dark-gray text-medium-gray! focus-visible:border-none!">
                                    <SelectValue placeholder="Show: 4" />
                                </SelectTrigger>
                                <SelectContent className='bg-black border-very-dark-gray text-medium-gray'>
                                    <SelectItem className='bg-black! text-medium-gray! hover:bg-primary! hover:text-medium-gray!' value="Show: 4">Show: 4</SelectItem>
                                    <SelectItem className='bg-black! text-medium-gray! hover:bg-primary! hover:text-medium-gray!' value="Show: 6">Show: 6</SelectItem>
                                    <SelectItem className='bg-black! text-medium-gray! hover:bg-primary! hover:text-medium-gray!' value="Show: 8">Show: 8</SelectItem>
                                </SelectContent>
                            </Select>
                            <Select onValueChange={handleSortByChange}>
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
                            <RenderListingsCars cars={cars} totalCars={totalCars} />
                        </div>
                        <RenderPagination />
                    </div>
                    <div className='h-fit border border-very-dark-gray rounded-md desktop-filter hidden lg:block lg:w-[30%] p-8 listings-text-animate translate-y-16 opacity-0'>
                        <div className='flex items-center justify-between'>
                            <div className='text-secondary text-lg'>Filters & Sort</div>
                            <button onClick={resetFilter} disabled={!selectFilter} className={`flex items-center text-secondary border border-accent-color bg-accent-color px-6 py-1 rounded-sm ${selectFilter ? 'cursor-pointer' : 'cursor-not-allowed'}`}>
                                <span>Clear</span>
                            </button>
                        </div>
                        {selectFilter ? <div key={filterKey} className='selects-containers py-8 flex flex-col gap-y-4'>
                            <Select onValueChange={handleMakeChange}>
                                <SelectTrigger className="w-full py-6! border-very-dark-gray text-medium-gray! focus-visible:border-none!">
                                    <SelectValue placeholder="Any Make" />
                                </SelectTrigger>
                                <SelectContent className='bg-black border-very-dark-gray text-medium-gray'>
                                    <SelectItem className='bg-black! text-medium-gray! hover:bg-primary! hover:text-medium-gray! py-3!' value="Any Make">Any Make</SelectItem>
                                    {selectFilter.makes.map((m, i) => <SelectItem key={i} className='bg-black! text-medium-gray! hover:bg-primary! hover:text-medium-gray! py-3!' value={m}>{m}</SelectItem>)}
                                </SelectContent>
                            </Select>
                            <Select onValueChange={handleModelChange}>
                                <SelectTrigger className="w-full py-6! border-very-dark-gray text-medium-gray! focus-visible:border-none!">
                                    <SelectValue placeholder="Any Model" />
                                </SelectTrigger>
                                <SelectContent className='bg-black border-very-dark-gray text-medium-gray'>
                                    <SelectItem className='bg-black! text-medium-gray! hover:bg-primary! hover:text-medium-gray! py-3!' value="Any Model">Any Model</SelectItem>
                                    {selectFilter.models.map((m, i) => <SelectItem key={i} className='bg-black! text-medium-gray! hover:bg-primary! hover:text-medium-gray! py-3!' value={m}>{m}</SelectItem>)}
                                </SelectContent>
                            </Select>
                            <Select onValueChange={handleCategoryChange}>
                                <SelectTrigger className="w-full py-6! border-very-dark-gray text-medium-gray! focus-visible:border-none!">
                                    <SelectValue placeholder="Any Category" />
                                </SelectTrigger>
                                <SelectContent className='bg-black border-very-dark-gray text-medium-gray'>
                                    <SelectItem className='bg-black! text-medium-gray! hover:bg-primary! hover:text-medium-gray! py-3!' value="Any Category">Any Category</SelectItem>
                                    {selectFilter.categories.map((c, i) => <SelectItem key={i} className='bg-black! text-medium-gray! hover:bg-primary! hover:text-medium-gray! py-3!' value={c}>{c}</SelectItem>)}
                                </SelectContent>
                            </Select>
                            <Select onValueChange={handleFuelTypeChange}>
                                <SelectTrigger className="w-full py-6! border-very-dark-gray text-medium-gray! focus-visible:border-none!">
                                    <SelectValue placeholder="Any Fuel" />
                                </SelectTrigger>
                                <SelectContent className='bg-black border-very-dark-gray text-medium-gray'>
                                    <SelectItem className='bg-black! text-medium-gray! hover:bg-primary! hover:text-medium-gray! py-3!' value="Any Fuel">Any Fuel</SelectItem>
                                    {selectFilter.fuelTypes.map((f, i) => <SelectItem key={i} className='bg-black! text-medium-gray! hover:bg-primary! hover:text-medium-gray! py-3!' value={f}>{f}</SelectItem>)}
                                </SelectContent>
                            </Select>
                            <Select onValueChange={handleTransmissionChange}>
                                <SelectTrigger className="w-full py-6! border-very-dark-gray text-medium-gray! focus-visible:border-none!">
                                    <SelectValue placeholder="Any Transmission" />
                                </SelectTrigger>
                                <SelectContent className='bg-black border-very-dark-gray text-medium-gray'>
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
                        <button disabled={!selectFilter} onClick={findCarsWithFilters} className={`w-full flex items-center justify-center text-secondary border border-accent-color bg-accent-color py-3 rounded-sm ${selectFilter ? 'cursor-pointer' : 'cursor-not-allowed'}`}>
                            <IconContext.Provider value={{ className: 'stroke-1 size-4' }}>
                                <CiSearch />
                            </IconContext.Provider>
                            <span className="pl-2">Find Cars</span>
                        </button>
                    </div>
                </div>
            </div>
            <AnimatePresence>
                {isMobileNavBarEnabled && <MobileNavBar pageName={'Listings'} key={'key-1'} />}
                {isMobileNavBarEnabled && <Backdrop key={'key-2'} />}
                {isFilterEnabled && <Filter filterKey={filterKey} navHeight={navHeight} disableFilter={disableFilter} selectFilter={selectFilter} findCarsWithFilters={findCarsWithFilters} handleMakeChange={handleMakeChange} handleModelChange={handleModelChange} handleCategoryChange={handleCategoryChange} handleFuelTypeChange={handleFuelTypeChange} handleTransmissionChange={handleTransmissionChange} resetFilter={resetFilter} key={'key-3'} />}
                {isFilterEnabled && <Backdrop key={'key-4'} />}
            </AnimatePresence>
        </div>
    )
}