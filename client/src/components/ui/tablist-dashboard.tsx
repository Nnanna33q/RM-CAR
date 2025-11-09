import { IconContext } from "react-icons";
import { GoPlusCircle } from "react-icons/go";
import { Button } from "@/components/ui/button";
import { useState, useEffect, useContext, useRef } from "react";
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
import AlertSuccessContext from "@/contexts/alert-success";
import type { InvalidFileProp, TotalCarsContextProp } from "@/lib/types";
import { getFetchUrl } from "@/lib/utils";
import { validateSelectFields } from "@/lib/utils";
import { PiImagesThin } from "react-icons/pi";
import { MdCancel } from "react-icons/md";
import Spinner from "./spinner";
import CarsContext from "@/contexts/cars";
import TotalCarsContext from "@/contexts/totalCars";
import TablistContext from "@/contexts/tablist-context";
import TablistEnquiriesContext from "@/contexts/tablist-enquiries";
import { handleSelectChange } from "@/lib/utils";
import PageContext from "@/contexts/page";

export default function TabList({ currentPage }: { currentPage: 'Dashboard' | 'Inventory' | 'Enquiries' | 'Stats' | 'Settings' }) {
    const [images, setImages] = useState<FileList | null>(null);
    const [preview, setPreview] = useState({ img: '', imagesLength: 0 });
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useContext(AlertErrorContext);
    const [isSuccess, setIsSuccess] = useContext(AlertSuccessContext);
    const errorId = useRef<NodeJS.Timeout | undefined>(undefined);
    const successId = useRef<NodeJS.Timeout | undefined>(undefined);
    const cars = useContext(CarsContext)?.cars;
    const setCars = useContext(CarsContext)?.setCars;
    const { totalCars, setTotalCars } = useContext(TotalCarsContext) as TotalCarsContextProp;
    const { tablist, setTablist } = useContext(TablistContext);
    const { page, setPage } = useContext(PageContext);

    useEffect(() => {
        // Disables error alert after 5 seconds
        if (isError.error) {
            errorId.current = setTimeout(() => setIsError({ error: false, errorMessage: '' }), 5000);
        }

        return () => clearTimeout(errorId.current);
    }, [isError.error])

    useEffect(() => {
        // Disables success alert after 5 seconds
        if (isSuccess.success) {
            successId.current = setTimeout(() => setIsSuccess({ success: false, successMessage: '' }), 5000);
        }

        return () => clearTimeout(successId.current);
    }, [isSuccess.success])

    function selectImages() {
        const fileInput = document.querySelector<HTMLInputElement>('.file-input');
        fileInput?.click();
    }

    function handleImageSelection(e: ChangeEvent<HTMLInputElement>) {
        if (e.target.files && e.target.files.length > 0) {
            if (e.target.files.length <= 20) {
                const invalidFiles: InvalidFileProp[] = [];

                Array.from(e.target.files).forEach(f => {
                    if (f.size > 10485760) {
                        invalidFiles.push({
                            fileName: f.name,
                            errorMessage: `${f.name} is too large (maximum allowed size is 10 MB)`
                        })
                    }

                    if (!f.type.includes('image/')) {
                        invalidFiles.push({
                            fileName: f.name,
                            errorMessage: `${f.name} is not a supported file type`
                        })
                    }
                })

                if (invalidFiles.length === 0) {
                    setImages(e.target.files);
                    setPreview({ img: URL.createObjectURL(e.target.files[0]), imagesLength: e.target.files.length });
                    return;
                }

                setIsError({ error: true, errorMessage: invalidFiles[0]?.errorMessage })
            }
            setIsError({ error: true, errorMessage: 'A maximum of 20 images can be uploaded' })
        }
    }

    function resetImagesState() {
        setPreview({ img: '', imagesLength: 0 });
        setImages(null);
    }

    async function addCar() {
        const make = document.querySelector<HTMLInputElement>('#car-make');
        const model = document.querySelector<HTMLInputElement>('#car-model');
        const variant = document.querySelector<HTMLInputElement>('#car-variant');
        const year = document.querySelector<HTMLInputElement>('#car-year');
        const mileage = document.querySelector<HTMLInputElement>('#car-mileage');
        const category = document.querySelector<HTMLSelectElement>('#car-category');
        const transmission = document.querySelector<HTMLSelectElement>('#car-transmission');
        const fuelType = document.querySelector<HTMLSelectElement>('#car-fuel-type');
        const price = document.querySelector<HTMLInputElement>('#car-price');
        if (make && model && variant && year && mileage && category && transmission && fuelType && price) {
            if (make.value && model.value && variant.value && year.value && mileage.value && category.value && transmission.value && fuelType.value && price.value) {
                const selectErrors = validateSelectFields(category, transmission, fuelType);
                if (selectErrors.error) {
                    setIsError({ error: true, errorMessage: selectErrors.errorMessage });
                    return;
                }
                if (images && images.length > 0) {
                    const formData = new FormData();
                    formData.append('tablist', tablist),
                    formData.append('page', page.toString());
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
                    setIsLoading(true);
                    try {
                        const response = await fetch(getFetchUrl('api/cars'), {
                            method: 'POST',
                            credentials: 'include',
                            body: formData
                        })
                        const data = await response.json();

                        if (!data.success) {
                            console.log('An error occurred');
                            throw new Error(data.errorMessage);
                        }
                        setIsSuccess({ success: true, successMessage: `${make.value} ${model.value} ${year.value} has been listed for sale` });
                        const form = document.querySelector<HTMLFormElement>('.add-car-form');
                        form && form.reset();
                        category.classList.add('text-dark-gray');
                        transmission.classList.add('text-dark-gray');
                        fuelType.classList.add('text-dark-gray');
                        setImages(null);
                        setPreview({ img: '', imagesLength: 0 });
                        setCars && setCars(data.cars);
                        setTotalCars(data.totalCars);
                    } catch (error) {
                        if (error instanceof Error) {
                            console.error(error.message);
                            setIsError({ error: true, errorMessage: error.message });
                        } else {
                            console.error('An unexpected error occurred');
                            setIsError({ error: true, errorMessage: 'An unexpected error occurred' });
                        }
                    }
                    setIsLoading(false);
                    return;
                }
                setIsError({ error: true, errorMessage: 'Please upload an image of the car' });
                return;
            }
            setIsError({ error: true, errorMessage: 'Please fill all fields' });
            return;
        }
    }

    function renderAllCars() {
        const tablistContainer = document.querySelector('.tablist-container');
        tablistContainer && Array.from(tablistContainer?.children).forEach(elem => {
            elem.classList.contains('all-car') ? elem.classList.add('active') : elem.classList.remove('active');
        })
        if(tablist !== 'All') {
            setTablist('All');
            setPage(1);
        }
    }

    function renderAvailableCars() {
        const tablistContainer = document.querySelector('.tablist-container');
        tablistContainer && Array.from(tablistContainer?.children).forEach(elem => {
            elem.classList.contains('available-car') ? elem.classList.add('active') : elem.classList.remove('active');
        })
        if(tablist !== 'Available') {
            setTablist('Available');
            setPage(1);
        }
    }

    function renderSoldCars() {
        const tablistContainer = document.querySelector('.tablist-container');
        tablistContainer && Array.from(tablistContainer?.children).forEach(elem => {
            elem.classList.contains('sold-car') ? elem.classList.add('active') : elem.classList.remove('active');
        })
        if(tablist !== 'Sold') {
            setTablist('Sold');
            setPage(1);
        }
    }

    return (
        <>
            <div className="flex justify-between items-center md:pt-6 md:pb-2">
                <div className="tablist-container bg-black rounded-sm flex text-medium-gray text-sm p-1 [&>*]:rounded-sm [&>*]:px-4 [&>*]:py-1">
                    <div onClick={renderAllCars} className="all-car active [.active]:bg-primary">All</div>
                    <div onClick={renderAvailableCars} className="available-car [.active]:bg-primary">{currentPage === 'Enquiries' ? 'Pending' : 'Available'}</div>
                    <div onClick={renderSoldCars} className="sold-car [.active]:bg-primary">{currentPage === 'Enquiries' ? 'Completed' : 'Sold'}</div>
                </div>
                {currentPage !== 'Enquiries' && <div className="car-actions flex gap-x-2">
                    <Dialog>
                        <form className="add-car-form">
                            <DialogTrigger asChild>
                                <button className="flex items-center gap-x-1 bg-accent-color text-secondary text-sm p-2 md:py-1 md:px-4 rounded-sm font-bold border border-accent-color">
                                    <IconContext.Provider value={{ className: '' }}>
                                        <GoPlusCircle />
                                    </IconContext.Provider>
                                    <span className="">Add Car</span>
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
                                        <select id="car-fuel-type" name={"fuelType"} className="border border-primary bg-primary p-2 rounded-sm text-dark-gray focus:outline-none" onChange={(e) => handleSelectChange(e)}>
                                            <option value="Fuel Type">Fuel Type</option>
                                            <option value="Diesel">Diesel</option>
                                            <option value="Petrol">Petrol</option>
                                            <option value="Electric">Electric</option>
                                        </select>
                                    </div>
                                    <div className="grid gap-3">
                                        <input id="car-price" type="number" className="w-full outline-none bg-primary p-2 rounded-sm border border-primary text-secondary focus:border-accent-color" placeholder="Price" />
                                    </div>
                                    <div className="grid gap-3">
                                        <input id="file-input" className="file-input w-0 h-0 absolute visibility-hidden" name="image" type="file" accept="image/*" multiple onChange={(e) => handleImageSelection(e)} />
                                        {preview.img
                                            ? <div className="max-w-[33%] relative border border-very-dark-gray rounded-sm">
                                                <img src={preview.img} alt={"Car Preview"} />
                                                <div className="text-secondary flex items-center absolute top-1 left-1 rounded-full">
                                                    <PiImagesThin />
                                                    <span className="text-xs pl-1">{preview.imagesLength}</span>
                                                </div>
                                                <div className="w-fit rounded-full text-secondary absolute top-1 right-1" onClick={resetImagesState}>
                                                    <MdCancel />
                                                </div>
                                            </div>
                                            : <div className="bg-primary rounded-sm text-dark-gray flex flex-col items-center gap-y-2 p-4" onClick={selectImages}>
                                                <IconContext.Provider value={{ className: 'size-8' }}><LuImagePlus /></IconContext.Provider>
                                                <div>Click to upload car images</div>
                                            </div>}
                                    </div>
                                </div>
                                <DialogFooter className="flex-row justify-end">
                                    <DialogClose asChild>
                                        <Button className="bg-primary border-primary rounded-sm text-secondary w-[25%]" variant="outline" disabled={isLoading}>Cancel</Button>
                                    </DialogClose>
                                    <Button disabled={isLoading} onClick={addCar} className="bg-accent-color text-secondary w-[25%] flex items-center justify-center" type="submit">
                                        {isLoading ? <Spinner /> : <span>Add Car</span>}
                                    </Button>
                                </DialogFooter>
                            </DialogContent>
                        </form>
                    </Dialog>
                </div>}
            </div>
        </>
    )
}

export function TabListEnquiries() {
    const { setTablist } = useContext(TablistEnquiriesContext);
    const { setPage } = useContext(PageContext);

    function renderAllEnquiries() {
        const tablistContainer = document.querySelector('.tablist-container');
        tablistContainer && Array.from(tablistContainer.children).forEach(elem => {
            elem.classList.contains('all-enquiries') ? elem.classList.add('active') : elem.classList.remove('active');
        })
        setTablist('All');
        setPage(1);
    }

    function renderPendingEnquiries() {
        const tablistContainer = document.querySelector('.tablist-container');
        tablistContainer && Array.from(tablistContainer.children).forEach(elem => {
            elem.classList.contains('pending-enquiries') ? elem.classList.add('active') : elem.classList.remove('active');
        })
        setTablist('Pending');
        setPage(1);
    }

    function renderCompletedEnquiries() {
        const tablistContainer = document.querySelector('.tablist-container');
        tablistContainer && Array.from(tablistContainer.children).forEach(elem => {
            elem.classList.contains('completed-enquiries') ? elem.classList.add('active') : elem.classList.remove('active');
        })
        setTablist('Completed');
        setPage(1);
    }

    return (
        <>
            <div className="flex justify-between items-center md:pt-6 md:pb-2">
                <div className="tablist-container bg-black rounded-sm flex text-medium-gray text-sm p-1 [&>*]:rounded-sm [&>*]:px-4 [&>*]:py-1">
                    <div onClick={renderAllEnquiries} className="all-enquiries active [.active]:bg-primary">All</div>
                    <div onClick={renderPendingEnquiries} className="pending-enquiries [.active]:bg-primary">Pending</div>
                    <div onClick={renderCompletedEnquiries} className="completed-enquiries [.active]:bg-primary">Completed</div>
                </div>
            </div>
        </>
    )
}