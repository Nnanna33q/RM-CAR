import * as React from "react"
import { PiImagesThin } from "react-icons/pi";
import { IconContext } from "react-icons";
import { SlSpeedometer } from "react-icons/sl";
import { PiGasPump } from "react-icons/pi";
import { TbManualGearbox } from "react-icons/tb";
import type { CarCardProp } from "@/lib/types";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { Button } from "./button";
import { cn } from "@/lib/utils"

type CardProp = React.ComponentProps<'div'> & {
}

function Card({ className, ...props }: CardProp) {
  return (
    <div
      data-slot="card"
      className={cn(
        "bg-car text-card-foreground flex flex-col gap-6 rounded-xl py-6 shadow-sm",
        className
      )}
      {...props}
    />
  )
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",
        className
      )}
      {...props}
    />
  )
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn("leading-none font-semibold", className)}
      {...props}
    />
  )
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  )
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className
      )}
      {...props}
    />
  )
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("px-6", className)}
      {...props}
    />
  )
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn("flex items-center px-6 [.border-t]:pt-6", className)}
      {...props}
    />
  )
}

function CarCard({
  images,
  carManufacturer,
  carModel,
  carVariant,
  carCategory,
  carYear,
  mileage,
  fuelType,
  transmissionType,
  price
}: CarCardProp) {
  const TransmissionIcon = TbManualGearbox;

  return (
    <div className="w-full h-[fit-content]">
      <div className="image-container relative">
        <Swiper
         modules={[Pagination]}
         pagination={{ type: 'bullets'}}>
        {images.map(i => {
          return (
            <SwiperSlide><img className="rounded-tl-sm rounded-tr-sm w-full max-h-[255px]" src={i} alt={`${carManufacturer} ${carModel} ${carYear}`} /></SwiperSlide>
          )
        })}
        </Swiper>
        <div className="absolute top-0 w-full bg-transparen p-2 z-150">
          <div className="w-full flex justify-between items-center">
            <div className="flex w-[40%] justify-between">
              <div className="featured-tag rounded-full text-secondary bg-accent-color py-1 px-3 text-xs">Featured</div>
              <div className="bg-primary text-secondary rounded-full flex items-center gap-x-1 px-2">
                <IconContext.Provider value={{ className: '' }}>
                  <PiImagesThin />
                </IconContext.Provider>
                <span className="text-xs">{images.length}</span>
              </div>
            </div>
            <div className="year-container w-[50%] flex justify-end">
              <div className="year p-4 rounded-full text-secondary bg-accent-color py-1 px-3 text-xs">{carYear}</div>
            </div>
          </div>
        </div>
      </div>
      <div className="featured-car-content p-4 bg-black flex flex-col">
        <div className="car-category text-xs text-accent-color">{carCategory}</div>
        <div>
          <div className="car-name flex gap-x-1 text-medium-gray py-2">
            <span className="car-manufacturer">{carManufacturer}</span>
            <span className="car-model">{carModel}</span>
            <span className="car-variant">{carVariant}</span>
            <span className="car-year">{carYear}</span>
          </div>
          <div className="car-specs flex gap-x-4 text-medium-gray">
            <div className="flex items-center text-sm gap-x-1">
              <SlSpeedometer />
              <span>{mileage}</span>
            </div>
            <div className="flex items-center text-sm gap-x-1">
              <PiGasPump />
              <span>{fuelType}</span>
            </div>
            <div className="flex items-center text-sm gap-x-1">
              {<TransmissionIcon />}
              <span>{transmissionType}</span>
            </div>
          </div>
        </div>
        <div className="car-price text-accent-color text-2xl font-semibold py-4">£{price} </div>
        <div className="pb-2"><div className="bg-very-dark-gray w-full h-[1px]" /></div>
        <Button className="hero1-btn-browse bg-accent-color border border-accent-color text-white font-semibold text-md lg:text-lg py-6 lg:w-[35%] group rounded-sm hover:bg-white hover:text-accent-color hover:border-white">
          <IconContext.Provider value={{ className: 'hero1-icon-search size-6 group-hover:scale-125 transition duration-500 group-hover:transition group-hover:duration-500' }}>
          </IconContext.Provider>
          <span>Contact Us</span>
        </Button>
      </div>
    </div>
  )
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
  CarCard
}
