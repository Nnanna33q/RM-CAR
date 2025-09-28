import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';
import { Card, CardContent } from './card';
import { carLogos, cars } from '@/data/cars';
import { useRef, useEffect } from 'react';
import { useInView } from 'motion/react';
import { animateCarsCarousel } from '@/lib/animations';

function getSlidesPerView() {
    if(window.innerWidth >= 1024) {
        return 5
    } else if(window.innerWidth < 1024 && window.innerWidth >= 768) {
        return 4
    } else {
        return 3
    }
}

export function CarLogosCarousel() {
    return (
        <div className='px-4 md:px-6'>
            <Swiper
                className=''
                slidesPerView={getSlidesPerView()}
                loop={true}
                speed={1000}
                modules={[Autoplay]}
                autoplay={
                    { delay: 0 }
                }
            >
                {carLogos.map(c => {
                    return <SwiperSlide key={c.key}>
                        <Card className='rounded-none border-none shadow-none'>
                            <CardContent className='flex items-center justify-center'>
                                <img className="size-9 sm:size-10 lg:size-15" src={c.img} />
                            </CardContent>
                        </Card>
                    </SwiperSlide>
                })}
            </Swiper>
        </div>
    )
}

export function CarsCarousel() {
    const carsCarouselRef = useRef(null);
    const isCarsInView = useInView(carsCarouselRef);

    useEffect(() => {
        isCarsInView && animateCarsCarousel();
    }, [isCarsInView])
    return (
        <div ref={carsCarouselRef}>
            <Swiper
                className='cars-carousel-container translate-x-[-100vw]'
                slidesPerView={1}
                loop={true}
                speed={1000}
                modules={[Autoplay, EffectFade]}
                autoplay={
                    { delay: 5000 }
                }
                effect='fade'
                fadeEffect={{
                    crossFade: true
                }}
            >
                {cars.map(c => {
                    return <SwiperSlide className='flex! justify-center! lg:justify-start!'><img key={c.key} className="" src={c.img} /></SwiperSlide>
                })}
            </Swiper>
        </div>
    )
}