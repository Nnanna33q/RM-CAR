import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import { Card, CardContent } from './card';
import { cars } from '@/data/cars';

function getSlidesPerView() {
    if(window.innerWidth >= 1024) {
        return 5
    } else if(window.innerWidth < 1024 && window.innerWidth >= 768) {
        return 4
    } else {
        return 3
    }
}

export function CarsCarousel() {
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
                {cars.map(c => {
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