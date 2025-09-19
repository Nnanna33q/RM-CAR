import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from 'swiper/modules';
import { LuUser } from "react-icons/lu";
import { LuLock } from "react-icons/lu";
import { IconContext } from "react-icons";

export default function AdminLogin() {
    return (
        <div>
            <div>
                <div className="absolute top-0 z-200 w-full h-[100vh] flex items-center lg:items-center lg:px-8 p-4">
                    <div className="admin-login-container py-8 lg:py-12 px-4 lg:px-12 w-[100%] lg:w-[50%] border border-primary rounded-sm bg-[rgba(0,0,0,0.8)] lg:backdrop-blur-sm">
                        <div className="w-full flex flex-col gap-y-8 lg:gap-y-12">
                            <div className="login-header">
                                <h1 className="text-secondary text-2xl sm:text-2xl md:text-4xl/15 lg:text-4xl/15 font-bold">Admin Login</h1>
                                <div className="bg-accent-color w-[10%] h-[5px]"></div>
                            </div>
                            <form className="flex flex-col gap-y-4 lg:gap-y-8">
                                <div className="flex flex-col gap-y-2">
                                    <label htmlFor="admin-username" className="text-secondary text-sm font-semibold">Username</label>
                                    <div className="flex items-center border border-primary rounded-sm bg-primary p-3 lg:p-4">
                                        <IconContext.Provider value={{ className: 'text-dark-gray text-xl' }}><LuUser /></IconContext.Provider>
                                        <input id="admin-username" type="text" placeholder="Username" className="pl-2 w-full outline-none text-secondary focus:border-accent-color placeholder:text-dark-gray" />
                                    </div>
                                </div>
                                <div className="flex flex-col gap-y-2">
                                    <label htmlFor="password" className="text-secondary text-sm font-semibold">Password</label>
                                    <div className="flex items-center border border-primary rounded-sm bg-primary p-3 lg:p-4">
                                        <IconContext.Provider value={{ className: 'text-dark-gray text-xl' }}><LuLock /></IconContext.Provider>
                                        <input id="password" type="password" placeholder="Password" className="pl-2 w-full outline-none text-secondary focus:border-accent-color placeholder:text-dark-gray" />
                                    </div>
                                </div>
                                <span className="text-medium-gray">Forgot Password</span>
                                <div>
                                    <button className="w-full bg-accent-color p-3 lg:p-4 rounded-sm border border-primary text-secondary font-semibold">Login</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <Swiper
                    slidesPerView={1}
                    autoplay={{ delay: 8000 }}
                    effect="fade"
                    fadeEffect={{ crossFade: true }}
                    speed={1000}
                    modules={[Autoplay, EffectFade]}
                    preventClicks={false}
                    className="absolute! top-0! w-full h-[100vh]">
                    <SwiperSlide className="swiper-slide hero-container flex flex-col">
                        <div className="absolute w-[100vw] h-[100vh] backdrop-blur-xs"></div>
                        <div className="w-[100vw] lg:h-[100vh] relative">
                        </div>
                    </SwiperSlide>
                    <SwiperSlide className="swiper-slide hero-container hero-second flex flex-col">
                        <div className="absolute w-[100vw] h-[100vh] backdrop-blur-xs"></div>
                        <div className="w-[100vw] lg:h-[100vh] relative">
                        </div>
                    </SwiperSlide>
                </Swiper>
            </div>
        </div>
    )
}