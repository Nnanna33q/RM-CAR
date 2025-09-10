export type BarsProp = {
    isMobileNavBarEnabled: boolean,
    setIsMobileNavBarEnabled: (param: boolean) => void
}

export type IsCardInView = {
    isInView: boolean,
    id: string
}

export type CarCardProp = {
    images: string[],
    carCategory: string,
    carManufacturer: string,
    carModel: string,
    carVariant?: string,
    carYear: number,
    mileage: string,
    fuelType: string,
    transmissionType: string,
    price: string
}