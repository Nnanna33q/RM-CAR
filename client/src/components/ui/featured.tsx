import { useRef, useEffect, useState } from 'react';
import { GiCarWheel } from "react-icons/gi";
import { CurveDivider } from "./divider";
import { getCurveDividerHeight } from '@/lib/utils';
import { CarCard } from './card';
import { useInView } from 'motion/react';
import { animateFeaturedText } from '@/lib/animations';
import type { Car } from '@/lib/types';
import { getFetchUrl } from '@/lib/utils';
import { Skeleton } from './skeleton';
import { LuRefreshCcw } from "react-icons/lu";
import { IconContext } from 'react-icons';

export function RenderFeaturedCars({ cars, getFeaturedCars }: { cars: Car[] | undefined | null , getFeaturedCars: () => Promise<void> }) {
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
                    <div onClick={() => getFeaturedCars()}>
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

    if (cars.length === 0) {
        return <div className='text-medium-gray'>No cars available at the moment</div>
    }
}

export default function Featured() {
    const textRef = useRef(null);
    const isInView = useInView(textRef);
    const [cars, setCars] = useState<Car[] | undefined | null>(undefined);

    async function getFeaturedCars() {
        setCars(undefined);
        try {
            const response = await fetch(getFetchUrl(`api/featured-cars`), { credentials: 'include' });
            const data = await response.json();
            if (!data.success) {
                throw new Error(data.errorMessage);
            }
            setCars(data.cars);
        } catch (error) {
            if (error instanceof Error) {
                console.error(error.message);
                setCars(null);
            } else {
                console.error('Failed to retrieve listings data');
                setCars(null);
            }
        }
    }

    useEffect(() => {
        isInView && animateFeaturedText();
    }, [isInView])

    useEffect(() => {
        getFeaturedCars();
    }, [])

    return (
        <div className="relative px-4 py-30 md:px-6 md:py-45 lg:px-10 lg:py-45">
            <CurveDivider height={getCurveDividerHeight()} />
            <div ref={textRef} className="text-start pb-8 sm:pb-12 overflow-hidden flex flex-col gap-y-1 sm:gap-y-6">
                <div className="featured-text-animate text-accent-color flex items-center border border-primary rounded-full px-4 py-1 w-[fit-content] bg-accent-dark translate-y-16 opacity-0">
                    <div className='animate-pulse'><GiCarWheel /></div>
                    <div className="text-sm pl-2">Featured Cars</div>
                </div>
                <h1 className="featured-text-animate text-secondary text-2xl/15 sm:text-2xl md:text-4xl/15 lg:text-4xl/15 font-bold translate-y-16 opacity-0">Discover Our Featured Cars</h1>
                <p className="featured-text-animate text-medium-gray text-md md:text-md lg:text-lg translate-y-16 opacity-0">From sedans to SUVs, we handpick the best cars to fit your lifestyle—backed by trusted service.</p>
            </div>
            <div className='pt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-12 gap-x-4 md:gap-x-8 lg:gap-x-4'>
                <RenderFeaturedCars cars={cars} getFeaturedCars={getFeaturedCars} />
            </div>
        </div>
    )
}