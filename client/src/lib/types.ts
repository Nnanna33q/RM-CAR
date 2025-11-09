import type { ChangeEvent } from "react"
import React from "react"

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

export type AlertSuccessContextProp = [
    {
        success: boolean,
        successMessage: string
    },
    setIsSuccess: React.Dispatch<React.SetStateAction<{
        success: boolean;
        successMessage: string;
    }>>
]

export type InvalidFileProp = {
    fileName: string,
    errorMessage: string
}

export type Car = {
    category: string,
    createdAt: string,
    fuelType: string,
    images: string[],
    make: string,
    mileage: string,
    model: string,
    price: number,
    status: string,
    transmission: string,
    variant?: string,
    year: string,
    soldAt: string,
    __v: number,
    _id: string
}

export type Enquiry = {
    _id: string,
    name: string,
    email: string,
    message: string,
    createdAt: string,
    status: string
}

export type CarsContextProp = {
    cars: Car[] | undefined,
    setCars: React.Dispatch<React.SetStateAction<Car[] | undefined>>;
} | null

export type EnquiriesContextProp = {
    enquiries: Enquiry[] | undefined,
    setEnquiries: React.Dispatch<React.SetStateAction<Enquiry[] | undefined>>;
} | null

export type TotalCarsContextProp = { totalCars: number; setTotalCars: React.Dispatch<React.SetStateAction<number>>; }

export type TotalEnquiriesContextProp = { totalEnquiries: number, setTotalEnquiries: React.Dispatch<React.SetStateAction<number>>; };

export type GetCarsDataProp = {
    page: number,
    setCars: React.Dispatch<React.SetStateAction<Car[] | undefined>> | undefined,
    setIsError: React.Dispatch<React.SetStateAction<{
        error: boolean;
        errorMessage: string;
    }>>,
    setTotalCars: React.Dispatch<React.SetStateAction<number>>,
    tablist: "All" | "Available" | "Sold"
}

export type GetEnquiriesDataProp = {
    page: number,
    setEnquiries: React.Dispatch<React.SetStateAction<Enquiry[] | undefined>> | undefined,
    setIsError: React.Dispatch<React.SetStateAction<{
        error: boolean;
        errorMessage: string;
    }>>,
    setTotalEnquiries: React.Dispatch<React.SetStateAction<number>>,
    tablist: "All" | "Pending" | "Completed"
}

export type CarsTableProp = {
    cars: Car[] | undefined,
    page: number,
    setPage: React.Dispatch<React.SetStateAction<number>>,
    isDialogOpen: boolean,
    setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>,
    isEditButtonLoading: boolean,
    preview: {
        img: string;
        imagesLength: number;
    },
    editCar: (id: string) => void,
    totalCars: number,
    deleteCar: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => Promise<void>,
    handleSelectChange: (e: ChangeEvent<HTMLSelectElement>) => void,
    handleImageSelection: (e: ChangeEvent<HTMLInputElement>) => void,
    selectImages: () => void,
    resetImagesState: () => void
}

export type TablistContextProp = {
    tablist: 'All' | 'Available' | 'Sold',
    setTablist: React.Dispatch<React.SetStateAction<"All" | "Available" | "Sold">>
}

export type EnquiriesTablistContextProp = {
    tablist: "All" | "Pending" | "Completed",
    setTablist: React.Dispatch<React.SetStateAction<"All" | "Pending" | "Completed">>
}

export type PageContextProp = {
    page: number,
    setPage: React.Dispatch<React.SetStateAction<number>>
}

export type TBusinessInfo = {
    email: string,
    phone: string,
    instagramProfileLink: string,
    facebookProfileLink: string,
    tiktokProfleLink: string,
    logo: string
}

export type TChartData = {
    data: string,
    amount: number
}

export type TRecentSales = Car