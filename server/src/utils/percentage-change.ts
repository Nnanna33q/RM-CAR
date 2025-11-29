import type { Document, DefaultSchemaOptions } from "mongoose";

type TCar = (Document<unknown, {}, {
    price: number;
    model: string;
    category: string;
    transmission: string;
    fuelType: string;
    make: string;
    year: string;
    mileage: number;
    images: string[];
    status: string;
    createdAt?: NativeDate | null;
}, {}, DefaultSchemaOptions> & {
    price: number;
    model: string;
    category: string;
    transmission: string;
    fuelType: string;
    make: string;
    year: string;
    mileage: number;
    images: string[];
    status: string;
    createdAt?: NativeDate | null;
})[]

type TGetSalesPercentageChange = {
    carsSoldThisMonth: TCar,
    carsSoldLastMonth: TCar
}

type TGetTotalCarsPercentageChange = {
    totalCarsOfThisMonth: number,
    totalCarsOfLastMonth: number
}

type TGetTotalEnquiriesPercentageChange = {
    totalEnquiriesOfThisMonth: number,
    totalEnquiriesOfLastMonth: number
}

export function getSalesPercentageChange({ carsSoldThisMonth, carsSoldLastMonth }: TGetSalesPercentageChange) {
    let totalSalesOfThisMonth = 0;
    let totalSalesOfLastMonth = 0;
    let percentageChangeOfSales = 0;

    carsSoldThisMonth.forEach(car => totalSalesOfThisMonth += car.price);
    carsSoldLastMonth.forEach(car => totalSalesOfLastMonth += car.price);
    if(totalSalesOfThisMonth === 0 && totalSalesOfLastMonth === 0) {
        percentageChangeOfSales = 0;
    } else if(totalSalesOfThisMonth === 0) {
        percentageChangeOfSales = -100;
    } else if(totalSalesOfLastMonth === 0) {
        percentageChangeOfSales = 100
    } else percentageChangeOfSales = ((totalSalesOfThisMonth - totalSalesOfLastMonth) / totalSalesOfLastMonth) * 100;

    return percentageChangeOfSales;
}

export function getTotalCarsPercentageChange({ totalCarsOfThisMonth, totalCarsOfLastMonth}: TGetTotalCarsPercentageChange) {
    let percentageChangeOfCars = 0;

    if(totalCarsOfThisMonth === 0 && totalCarsOfLastMonth === 0) {
        percentageChangeOfCars = 0;
    } else if(totalCarsOfThisMonth === 0) {
        percentageChangeOfCars = -100;
    } else if(totalCarsOfLastMonth === 0) {
        percentageChangeOfCars = 100
    } else percentageChangeOfCars = ((totalCarsOfThisMonth - totalCarsOfLastMonth) / totalCarsOfLastMonth) * 100;

    return percentageChangeOfCars;
}

export function getTotalEnquiriesPercentageChange({ totalEnquiriesOfThisMonth, totalEnquiriesOfLastMonth}: TGetTotalEnquiriesPercentageChange) {
    let percentageChangeOfEnquiries = 0;

    if(totalEnquiriesOfThisMonth === 0 && totalEnquiriesOfLastMonth === 0) {
        percentageChangeOfEnquiries = 0;
    } else if(totalEnquiriesOfThisMonth === 0) {
        percentageChangeOfEnquiries = -100;
    } else if(totalEnquiriesOfLastMonth === 0) {
        percentageChangeOfEnquiries = 100
    } else percentageChangeOfEnquiries = ((totalEnquiriesOfThisMonth - totalEnquiriesOfLastMonth) / totalEnquiriesOfLastMonth) * 100;

    return percentageChangeOfEnquiries;
}