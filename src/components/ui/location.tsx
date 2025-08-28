import { FaLocationDot } from "react-icons/fa6";
import { useEffect } from "react";
import { Button } from "./button";

export default function Location() {
    return (
        <div className="relative px-4 py-30 md:px-6 md:py-45 lg:px-10 lg:py-45 bg-black">
            <div className="text-start pb-8 sm:pb-12 overflow-hidden flex flex-col gap-y-1 sm:gap-y-6">
                <div className="text-accent-color flex items-center border border-black rounded-full px-4 py-1 w-[fit-content] bg-accent-dark">
                    <div className='animate-pulse'><FaLocationDot /></div>
                    <div className="text-sm pl-2">Our Location</div>
                </div>
                <h1 className="text-secondary text-2xl/15 sm:text-2xl md:text-4xl/15 lg:text-4xl/15 font-bold">We're Easy To Find</h1>
                <p className="text-medium-gray text-md md:text-md lg:text-lg">Located in the heart of Merseyside, just minutes from Liverpool city center</p>
            </div>
            <div className="map">
                <iframe style={{ border: 0, width: '100%', height: '350px' }} src="https://www.openstreetmap.org/export/embed.html?bbox=-2.87069320678711%2C53.355431062484634%2C-2.863075733184815%2C53.357857918776666&amp;layer=mapnik&amp;marker=53.35664450790476%2C-2.866884469985962"></iframe><br /><small><a href="https://www.openstreetmap.org/?mlat=53.356645&amp;mlon=-2.866884#map=18/53.356645/-2.866884">View Larger Map</a></small>
            </div>

            <div className="flex flex-col gap-y-8">
                <div className="address-container">
                    <div className="text-secondary font-bold">Address</div>
                    <div className="address text-medium-gray">
                        RM Car Sales, Triumph Way<br />
                        Hunts Cross<br />
                        Liverpool<br />
                        Merseyside<br />
                        L24 9GQ
                    </div>
                </div>
                <Button className="bg-accent-color border border-accent-color text-white font-semibold text-md lg:text-lg py-6 lg:w-[35%] group rounded-sm hover:bg-white hover:text-accent-color hover:border-white">
                    <span>Get Directions</span>
                </Button>
            </div>
        </div>
    )
}