import Car from "../schemas/car.js"

export function getCars(tablist: 'All' | 'Available' | 'Sold', page: number) {
    if (tablist === 'All') {
        return Car.find().sort({ _id: -1 }).skip((page - 1) * 5).limit(5)
    } else if (tablist === 'Available') {
        return Car.find({ status: 'Active' }).sort({ _id: -1 }).skip((page - 1) * 5).limit(5)
    } else {
        return Car.find({ status: 'Sold' }).sort({ _id: -1 }).skip((page - 1) * 5).limit(5)
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