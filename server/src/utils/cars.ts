import Car from "../schemas/car.js";

type TFilter = {
    make?: string,
    model?: string,
    category?: string,
    fuelType?: string,
    transmission?: string
}

type TGetCarListingsFilter = string | undefined;

export function getCars(tablist: 'All' | 'Available' | 'Sold', page: number, limit?: number) {
    if (tablist === 'All') {
        return Car.find().sort({ _id: -1 }).skip(limit ? (page - 1) * limit : (page - 1) * 5).limit(limit ? limit : 5)
    } else if (tablist === 'Available') {
        return Car.find({ status: 'Active' }).sort({ _id: -1 }).skip(limit ? (page - 1) * limit : (page - 1) * 5).limit(limit ? limit : 5)
    } else {
        return Car.find({ status: 'Sold' }).sort({ _id: -1 }).skip(limit ? (page - 1) * limit : (page - 1) * 5).limit(limit ? limit : 5)
    }
}

export function countCars(tablist: 'All' | 'Available' | 'Sold') {
    if(tablist === 'All') {
        return Car.find().countDocuments()
    } else if(tablist === 'Available') {
        return Car.find({ status: 'Active' }).countDocuments()
    } else {
        return Car.find({ status: 'Sold' }).countDocuments()
    }
}

export function getCarListings(page: number, limit: number, sortBy: "Default" | "Ascending" | "Descending", make: TGetCarListingsFilter, model: TGetCarListingsFilter, category: TGetCarListingsFilter, fuelType: TGetCarListingsFilter, transmission: TGetCarListingsFilter) {
    const filter: TFilter = {};

    if(make) filter.make = make;
    if(model) filter.model = model;
    if(category) filter.category = category;
    if(fuelType) filter.fuelType = fuelType;
    if(transmission) filter.transmission = transmission;

    if(sortBy === 'Default') {
        return Car.find({ status: 'Active', ...filter }).sort({ _id: -1 }).skip(limit ? (page - 1) * limit : (page - 1) * 5).limit(limit ? limit : 5);
    } else if(sortBy === 'Ascending') {
        return Car.find({ status: 'Active', ...filter }).sort({ price: 1 }).skip(limit ? (page - 1) * limit : (page - 1) * 5).limit(limit ? limit : 5);
    } else {
        return Car.find({ status: 'Active', ...filter }).sort({ price: -1 }).skip(limit ? (page - 1) * limit : (page - 1) * 5).limit(limit ? limit : 5);
    }
}

export function countListingsCars(make: TGetCarListingsFilter, model: TGetCarListingsFilter, category: TGetCarListingsFilter, fuelType: TGetCarListingsFilter, transmission: TGetCarListingsFilter) {
    const filter: TFilter = {};

    if(make) filter.make = make;
    if(model) filter.model = model;
    if(category) filter.category = category;
    if(fuelType) filter.fuelType = fuelType;
    if(transmission) filter.transmission = transmission;

    return Car.find({ status: 'Active', ...filter }).countDocuments()
}