import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from 'swiper/modules';
import { LuUser } from "react-icons/lu";
import { LuLock } from "react-icons/lu";
import { IconContext } from "react-icons";
import { AlertError } from "@/components/ui/alert";
import { useState, useEffect } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router";
import type { IsErrorProp } from "@/lib/types";
import { AnimatePresence } from "motion/react";
import { getFetchUrl } from "@/lib/utils";
import Spinner from "@/components/ui/spinner";

export default function AdminLogin() {
    const [isError, setIsError] = useState<IsErrorProp>({ error: false, errorMessage: '' });
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        document.title = 'Login';
    }, []);

    useEffect(() => {
        if(isError.error) {
            setTimeout(() => setIsError({ error: false, errorMessage: '' }), 5000)
        }
    }, [isError.error])

    const navigate = useNavigate();

    async function login(e: FormEvent) {
        e.preventDefault();

        const username = document.querySelector<HTMLInputElement>('#admin-username');
        const password = document.querySelector<HTMLInputElement>('#password');

        if (username && password) {
            if (!username.value || !password.value) {
                setIsError({ error: true, errorMessage: 'Empty username or password field' });
                console.error('Empty username or password field');
                return;
            }

            // Fetchhhhhhhh!!!!

            setIsLoading(true);
            try {
                const response = await fetch(getFetchUrl('login'), {
                    method: 'POST',
                    headers: { "Content-Type": "Application/json" },
                    body: JSON.stringify({ username: username.value, password: password.value }),
                    credentials: 'include'
                });
    
                const data = await response.json();
    
                if (!data.success) throw new Error(data.errorMessage);
                if(!data.accessToken) throw new Error('No access token detected');
                localStorage.setItem('accessToken', data.accessToken);
                navigate('/admin/dashboard');
            } catch(error) {
                console.error(error);
                setIsError({ error: true, errorMessage: error instanceof Error ? error.message : 'An unexpected error occurred' });
            }
            setIsLoading(false);
        }
    }

    return (
        <div>
            <AnimatePresence>
                {isError.error && <AlertError errorMessage={isError.errorMessage} />}
            </AnimatePresence>
            <div>
                <div className="absolute top-0 z-200 w-full h-[100vh] flex items-center md:items-center md:px-8 p-4">
                    <div className="admin-login-container py-8 sm:py-10 md:py-12 px-4 md:px-12 w-[100%] md:w-[50%] border border-primary rounded-sm bg-[rgba(0,0,0,0.8)] md:backdrop-blur-sm">
                        <div className="w-full flex flex-col gap-y-8 sm:gap-y-10 md:gap-y-12">
                            <div className="login-header">
                                <h1 className="text-secondary text-2xl sm:text-2xl md:text-4xl/15 lg:text-4xl/15 font-bold">Admin Login</h1>
                                <div className="bg-accent-color w-[10%] sm:w-[7.5%] h-[5px]"></div>
                            </div>
                            <form onSubmit={(e: FormEvent) => login(e)} className="flex flex-col gap-y-4 sm:gap-y-6 md:gap-y-8">
                                <div className="flex flex-col gap-y-2">
                                    <label htmlFor="admin-username" className="text-secondary text-sm font-semibold">Username</label>
                                    <div className={`flex items-center border border-${isError.errorMessage.toLowerCase().includes('username') ? 'accent-color' : 'primary' } rounded-sm bg-primary p-3 md:p-4`}>
                                        <IconContext.Provider value={{ className: 'text-dark-gray text-xl' }}><LuUser /></IconContext.Provider>
                                        <input id="admin-username" type="text" placeholder="Username" className="pl-2 sm:pl-4 w-full outline-none text-secondary focus:border-accent-color placeholder:text-dark-gray" />
                                    </div>
                                </div>
                                <div className="flex flex-col gap-y-2">
                                    <label htmlFor="password" className="text-secondary text-sm font-semibold">Password</label>
                                    <div className={`flex items-center border border-${isError.errorMessage.toLowerCase().includes('password') ? 'accent-color' : 'primary' } rounded-sm bg-primary p-3 md:p-4`}>
                                        <IconContext.Provider value={{ className: 'text-dark-gray text-xl' }}><LuLock /></IconContext.Provider>
                                        <input id="password" type="password" placeholder="Password" className="pl-2 sm:pl-4 w-full outline-none text-secondary focus:border-accent-color placeholder:text-dark-gray" />
                                    </div>
                                </div>
                                <div>
                                    <button type="submit" className="w-full bg-accent-color p-3 md:p-4 rounded-sm border border-primary text-secondary font-semibold flex justify-center items-center">
                                        {isLoading ? <Spinner /> : <div>Login</div>}
                                    </button>
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