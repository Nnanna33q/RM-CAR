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

export type AuthContextProp = {
    isAuthenticated: Boolean,
    setIsAuthenticated: React.Dispatch<React.SetStateAction<Boolean | null>>
}

export type IsErrorProp = {
    error: boolean,
    errorMessage: string
}

export type AlertErrorContextProp = [
    {
        error: boolean,
        errorMessage: string
    },
    setIsError: React.Dispatch<React.SetStateAction<{
        error: boolean;
        errorMessage: string;
    }>>
]

export type InvalidFileProp = {
    fileName: string,
    errorMessage: string
}