import Car from "../schemas/car.js";
import { cloudinary } from "../index.js";
import { getCars, countCars } from "./cars.js";

export async function deleteCarFromDb(id: string, page: number, tablist: 'All' | 'Available' | 'Sold') {
    await Car.findByIdAndDelete(id);
    const [cars, totalCars] = await Promise.all([
        getCars(tablist, page),
        countCars(tablist)
    ])
    return { cars, totalCars }
}

export async function deleteCloudinaryCarImages(images: string[]) {
    try {
        const publicIds = images.map(i => {
            const substrings = i.split('/')[i.split('/').length - 1];
            if(!substrings) {
                throw Error('No public ids detected')
            }
            const publicId = substrings.split('.')[0];
            if(!publicId) {
                throw new Error('No public ids detected');
            }
            return publicId;
        });
        if(publicIds.length === 0) throw new Error('No public id detected');
        return await cloudinary.v2.api.delete_resources(publicIds);
    } catch(error) {
        console.error(error);
        console.warn(`The car might have been deleted from database. If it has, udelete the car's images from cloudinary. Here are their urls ${images}`);
    }
}