import { LuFile } from "react-icons/lu";
import { IconContext } from "react-icons";
import { GoPlusCircle } from "react-icons/go";
import { Button } from "@/components/ui/button";
import { useState, useContext } from "react";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { LuImagePlus } from "react-icons/lu";
import type { ChangeEvent } from "react";
import AlertErrorContext from "@/contexts/alert-error";
import type { InvalidFileProp } from "@/lib/types";
import { getFetchUrl } from "@/lib/utils";

export default function TabList({ currentPage }: { currentPage: 'Dashboard' | 'Inventory' | 'Enquiries' | 'Stats' | 'Settings' }) {
    const [images, setImages] = useState<FileList | null>(null);
    const [ ,setIsError] = useContext(AlertErrorContext);

    function selectImages() {
        const fileInput = document.querySelector<HTMLInputElement>('.file-input');
        fileInput?.click();
    }

    function handleImageSelection(e: ChangeEvent<HTMLInputElement>) {
        if (e.target.files && e.target.files.length > 0) {
            if(e.target.files.length <= 20) {
                const invalidFiles: InvalidFileProp[] = [];

                Array.from(e.target.files).forEach(f => {
                    if(f.size > 10485760) {
                        invalidFiles.push({
                            fileName: f.name,
                            errorMessage: `${f.name} is too large (maximum allowed size is 10 MB)`
                        })
                    }

                    if(!f.type.includes('image/')) {
                        invalidFiles.push({
                            fileName: f.name,
                            errorMessage: `${f.name} is not a supported file type`
                        })
                    }
                })

                if(invalidFiles.length === 0) {
                    setImages(e.target.files);
                    return;
                }

                setIsError({ error: true, errorMessage: invalidFiles[0]?.errorMessage })
            }
            setIsError({ error: true, errorMessage: 'A maximum of 20 images can be uploaded'})
        }
    }

    function handleSelectChange(e: ChangeEvent<HTMLSelectElement>) {
        if(e.target.value === 'Category' || e.target.value === 'Transmission' || e.target.value === 'Fuel Type') {
            e.target.classList.add('text-dark-gray');
            e.target.classList.remove('text-secondary')
        } else {
            e.target.classList.remove('text-dark-gray');
            e.target.classList.add('text-secondary')
        }
    }

    async function addCar() {
        const make = document.querySelector<HTMLInputElement>('#car-make');
        const model = document.querySelector<HTMLInputElement>('#car-model');
        const variant = document.querySelector<HTMLInputElement>('#car-variant');
        const year = document.querySelector<HTMLInputElement>('#car-year');
        const mileage = document.querySelector<HTMLInputElement>('#car-mileage');
        const category = document.querySelector<HTMLInputElement>('#car-category');
        const transmission = document.querySelector<HTMLInputElement>('#car-transmission');
        const fuelType = document.querySelector<HTMLInputElement>('#car-fuel-type');
        const price = document.querySelector<HTMLInputElement>('#car-price');
        if (make && model && variant && year && mileage && category && transmission && fuelType && price) {
            if (make.value && model.value && variant.value && year.value && mileage.value && category.value && transmission.value && fuelType.value && price.value) {
                if(images && images.length > 0) {
                    const formData = new FormData();
                    formData.append('make', make.value);
                    formData.append('model', model.value);
                    formData.append('variant', variant.value);
                    formData.append('year', year.value);
                    formData.append('mileage', mileage.value);
                    formData.append('category', category.value);
                    formData.append('transmission', transmission.value);
                    formData.append('fuelType', fuelType.value);
                    formData.append('price', price.value);
                    Array.from(images).forEach(image => formData.append('image', image));
                    const response = await fetch(getFetchUrl('api/cars'), {
                        method: 'POST',
                        credentials: 'include',
                        body: formData
                    })
                    return;
                }
                setIsError({ error: true, errorMessage: 'Please upload an image of the car' });
                return;
            }
            setIsError({ error: true, errorMessage: 'Please fill all fields' });
            return;
        }
    }

    return (
        <>
            <div className="flex justify-between items-center md:pt-6 md:pb-2">
                <div className="tablist-container bg-black rounded-sm flex text-medium-gray text-sm p-1 [&>*]:rounded-sm [&>*]:px-4 [&>*]:py-1">
                    <div className="active [.active]:bg-primary">All</div>
                    <div className="[.active]:bg-primary">{currentPage === 'Enquiries' ? 'Pending' : 'Available'}</div>
                    <div className="[.active]:bg-primary">{currentPage === 'Enquiries' ? 'Completed' : 'Sold'}</div>
                </div>
                {currentPage !== 'Enquiries' && <div className="car-actions flex gap-x-2">
                    <button className="flex items-center gap-x-1 bg-secondary text-black text-sm p-2 md:py-1 md:px-2 rounded-sm font-bold border border-medium-gray">
                        <IconContext.Provider value={{ className: '' }}>
                            <LuFile />
                        </IconContext.Provider>
                        <span className="hidden sm:block">Export</span>
                    </button>
                    <Dialog>
                        <form>
                            <DialogTrigger asChild>
                                <button className="flex items-center gap-x-1 bg-accent-color text-secondary text-sm p-2 md:py-1 md:px-4 rounded-sm font-bold border border-accent-color">
                                    <IconContext.Provider value={{ className: '' }}>
                                        <GoPlusCircle />
                                    </IconContext.Provider>
                                    <span className="hidden sm:block">Add Car</span>
                                </button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px] h-[75vh] overflow-auto rounded-none bg-black border-very-dark-gray" style={{ scrollbarWidth: 'none' }}>
                                <DialogHeader>
                                    <DialogTitle className="text-secondary">List new car</DialogTitle>
                                    <DialogDescription>
                                        Add your car’s details and photos to make it publicly available for sale.
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4">
                                    <div className="grid gap-3">
                                        <input id="car-make" type="text" className="w-full outline-none bg-primary p-2 rounded-sm border border-primary text-secondary focus:border-accent-color" placeholder="Make" />
                                    </div>
                                    <div className="grid gap-3">
                                        <input id="car-model" type="text" className="w-full outline-none bg-primary p-2 rounded-sm border border-primary text-secondary focus:border-accent-color" placeholder="Model" />
                                    </div>
                                    <div className="grid gap-3">
                                        <input id="car-variant" type="text" className="w-full outline-none bg-primary p-2 rounded-sm border border-primary text-secondary focus:border-accent-color" placeholder="Variant" />
                                    </div>
                                    <div className="grid gap-3">
                                        <input id="car-year" type="number" className="w-full outline-none bg-primary p-2 rounded-sm border border-primary text-secondary focus:border-accent-color" placeholder="Year" />
                                    </div>
                                    <div className="grid gap-3">
                                        <input id="car-mileage" type="number" className="w-full outline-none bg-primary p-2 rounded-sm border border-primary text-secondary focus:border-accent-color" placeholder="Mileage" />
                                    </div>
                                    <div className="grid gap-3">
                                        <select id="car-category" name={'category'} className="border border-primary bg-primary p-2 rounded-sm text-dark-gray focus:outline-none" onChange={(e) => handleSelectChange(e)}>
                                            <option value="Category">Category</option>
                                            <option value="Sedan" className="text-secondary!">Sedan</option>
                                            <option value="Hatchback">Hatchback</option>
                                            <option value="Suv">SUV</option>
                                            <option value="Coupe">Coupe</option>
                                            <option value="Convertible">Convertible</option>
                                            <option value="Van">Van</option>
                                            <option value="Electric Vehicle">Electric Vehicle</option>
                                        </select>
                                    </div>
                                    <div className="grid gap-3">
                                        <select id="car-transmission" name={"transmission"} className="border border-primary bg-primary p-2 rounded-sm text-dark-gray focus:outline-none" onChange={(e) => handleSelectChange(e)}>
                                            <option value="Category">Transmission</option>
                                            <option value="Automatic">Automatic</option>
                                            <option value="Manual">Manual</option>
                                            <option value="Specialized">Specialized</option>
                                        </select>
                                    </div>
                                    <div className="grid gap-3">
                                        <select id="car-fuel-type" name={"fuel-type"} className="border border-primary bg-primary p-2 rounded-sm text-dark-gray focus:outline-none" onChange={(e) => handleSelectChange(e)}>
                                            <option value="Category">Fuel Type</option>
                                            <option value="Automatic">Diesel</option>
                                            <option value="Manual">Petrol</option>
                                            <option value="Electric">Electric</option>
                                        </select>
                                    </div>
                                    <div className="grid gap-3">
                                        <input id="car-price" type="number" className="w-full outline-none bg-primary p-2 rounded-sm border border-primary text-secondary focus:border-accent-color" placeholder="Price" />
                                    </div>
                                    <div className="grid gap-3">
                                        <input id="file-input" className="file-input w-0 h-0 absolute visibility-hidden" name="image" type="file" accept="image/*" multiple onChange={(e) => handleImageSelection(e)} />
                                        <div className="bg-primary rounded-sm text-dark-gray flex flex-col items-center gap-y-2 p-4" onClick={selectImages}>
                                            <IconContext.Provider value={{ className: 'size-8' }}><LuImagePlus /></IconContext.Provider>
                                            <div>Click to upload car images</div>
                                        </div>
                                    </div>
                                </div>
                                <DialogFooter>
                                    <DialogClose asChild>
                                        <Button className="bg-primary border-primary rounded-sm text-secondary" variant="outline">Cancel</Button>
                                    </DialogClose>
                                    <Button onClick={addCar} className="bg-accent-color text-secondary" type="submit">Add Car</Button>
                                </DialogFooter>
                            </DialogContent>
                        </form>
                    </Dialog>
                </div>}
            </div>
        </>
    )
}