import { useRef } from 'react';
import { GiCarWheel } from "react-icons/gi";
import { CurveDivider } from "./divider";
import { getCurveDividerHeight } from '@/lib/utils';
import { CarCard } from './card';
import { featuredCars } from '@/data/cars';

export default function Featured() {
    const textRef = useRef(null);

    return (
        <div className="relative px-4 py-30 md:px-6 md:py-45 lg:px-10 lg:py-45">
            <CurveDivider height={getCurveDividerHeight()} />
            <div ref={textRef} className="text-start pb-8 sm:pb-12 overflow-hidden flex flex-col gap-y-1 sm:gap-y-6">
                <div className="text-accent-color flex items-center border border-primary rounded-full px-4 py-1 w-[fit-content] bg-accent-dark">
                                        <div className='animate-pulse'><GiCarWheel/></div>
                    <div className="text-sm pl-2">Featured Cars</div>
                </div>
                <h1 className="text-secondary text-2xl/15 sm:text-2xl md:text-4xl/15 lg:text-4xl/15 font-bold">Discover Our Featured Cars</h1>
                <p className="text-medium-gray text-md md:text-md lg:text-lg">From sedans to SUVs, we handpick the best cars to fit your lifestyle—backed by trusted service.</p>
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-12 gap-x-4 md:gap-x-8'>
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
    )
}