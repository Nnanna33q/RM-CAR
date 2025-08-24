import { useRef, useState } from 'react';
import { FaUser } from 'react-icons/fa';
import { Card, CardDescription } from './card';
import { IconContext } from 'react-icons';
import { FaRegStar } from "react-icons/fa6";
import { FaStar } from "react-icons/fa6";
import { LuUser } from "react-icons/lu";
import { LuGhost } from "react-icons/lu";

const cardItems = [
    {
        key: '1',
        avatar: LuGhost,
        name: 'Anonymous',
        date: 'June 12, 2025',
        starCount: 5,
        comment: 'Thanks for helping us , highly recommend made up with the car we got today !!'
    },
    {
        key: '2',
        avatar: LuUser,
        name: 'Russel P',
        date: 'June 18, 2025',
        starCount: 5,
        comment: 'Fantastic service from start to finish... would highly recommend!'
    },
    {
        key: '3',
        avatar: LuUser,
        name: 'William M',
        date: 'July 4, 2025',
        starCount: 5,
        comment: 'Very friendly and very helpful, all the fine details explained about my purchase which gave me great piece of mind.'
    },
    {
        key: '4',
        avatar: LuUser,
        name: 'Paul D',
        date: 'July 7, 2025',
        starCount: 5,
        comment: 'First class service will recommend to friends and family'
    },
    {
        key: '5',
        avatar: LuGhost,
        name: 'Anonymous',
        date: 'July 19, 2025',
        starCount: 4,
        comment: 'Absolutely amazing from start to finish highly recommend so helpful anything g you ask nothing is too much trouble listens to what I was after and they had the car I needed amazing can’t thank you enough 🥂❤️'
    },
    {
        key: '6',
        avatar: LuUser,
        name: 'Andy C',
        date: 'July 21, 2025',
        starCount: 5,
        comment: 'While dealing with Sean he was the upmost professional and i couldnt recommend this company enough to anyone when buying a car.'
    },
]

export default function Testimonials() {

    function renderTestimonialStars(num: number) {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <div key={i}>
                    <IconContext.Provider value={{ className: i <= num ? 'text-accent-color' : 'text-gray-500' }}>
                        <FaRegStar />
                    </IconContext.Provider>
                </div>
            )
        }
        return stars;
    }

    return (
        <div className="relative px-4 py-30 md:px-6 md:py-45 lg:px-10 lg:py-45 bg-black">
            <div className="text-start pb-8 sm:pb-12 overflow-hidden flex flex-col gap-y-1 sm:gap-y-6">
                <div className="text-accent-color flex items-center border border-black rounded-full px-4 py-1 w-[fit-content] bg-accent-dark">
                    <FaStar />
                    <div className="text-sm pl-2">Our Testimonials</div>
                </div>
                <h1 className="text-secondary text-2xl/15 sm:text-2xl md:text-4xl/15 lg:text-4xl/15 font-bold">What They Say About Us</h1>
                <p className="text-medium-gray text-md md:text-md lg:text-lg">From first-time buyers to lifelong drivers, we’re proud to earn trust through quality cars and exceptional support</p>
            </div>
            <div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-8 sm:gap-x-8 lg:gap-x-4">
                {cardItems.map(i => {
                    return (
                        <Card key={i.key} className="border px-6 border-very-dark-gray">
                            <div className='flex flex-col gap-y-4'>
                                <div className='flex gap-x-4'>
                                    <div className='rounded-full border border-very-dark-gray p-2.5'>
                                        <IconContext.Provider value={{ className: 'size-full text-light-gray' }}>
                                            <i.avatar />
                                        </IconContext.Provider>
                                    </div>
                                    <div className='flex flex-col'>
                                        <span className="font-bold text-secondary">{i.name}</span>
                                        <span className="text-medium-gray">{i.date}</span>
                                    </div>
                                </div>
                                <div className='flex'>
                                    {renderTestimonialStars(i.starCount)}
                                </div>
                                <CardDescription className="text-medium-gray font-semibold px-0 text-lg">{i.comment}</CardDescription>
                            </div>
                        </Card>
                    )
                })}
            </div>
        </div>
    )
}