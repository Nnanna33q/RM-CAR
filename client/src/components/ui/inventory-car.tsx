import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "./table";
import { Popover, PopoverTrigger, PopoverContent } from "./popover";
import { Dialog, DialogContent, DialogHeader, DialogDescription, DialogTitle, DialogFooter, DialogClose } from "./dialog";
import { Button } from "./button";
import { LuEllipsis, LuImagePlus } from "react-icons/lu";
import Spinner from "./spinner";
import { Skeleton } from "./skeleton";
import { AdminPaginationInventory } from "./admin-pagination";
import { PiImagesThin } from "react-icons/pi";
import { MdCancel } from "react-icons/md";
import { IconContext } from "react-icons";
import type { Car } from "@/lib/types";
import { useState, useEffect, useContext } from "react";
import { getFetchUrl } from "@/lib/utils";
import AlertErrorContext from "@/contexts/alert-error";
import AlertSuccessContext from "@/contexts/alert-success";
import CarsContext from "@/contexts/cars";
import TotalCarsContext from "@/contexts/totalCars";
import TablistContext from "@/contexts/tablist-context";
import { validateSelectFields, handleSelectChange, selectImages, getCarsData } from "@/lib/utils";
import type { TotalCarsContextProp, InvalidFileProp } from "@/lib/types";
import type { ChangeEvent, MouseEvent } from "react";
import PageContext from "@/contexts/page";

export function UndefinedCars({ page, setPage }: { page: number, setPage: React.Dispatch<React.SetStateAction<number>> }) {
    return (
        <>
            <Table>
                <TableHeader className=''>
                    <TableRow className='hover:bg-primary [&>*]:text-medium-gray [&>*]:font-semibold border-very-dark-gray w-full'>
                        <TableHead>Name</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Mileage</TableHead>
                        <TableHead>Transmission</TableHead>
                        <TableHead>Fuel Type</TableHead>
                        <TableHead>Created at</TableHead>
                        <TableHead></TableHead>
                    </TableRow>
                </TableHeader>
            </Table>
            <Skeleton className='h-12 w-[100%] bg-very-dark-gray'></Skeleton>
            <Skeleton className='h-12 w-[100%] bg-very-dark-gray'></Skeleton>
            <Skeleton className='h-12 w-[100%] bg-very-dark-gray'></Skeleton>
            <Skeleton className='h-12 w-[100%] bg-very-dark-gray'></Skeleton>
            <Skeleton className='h-12 w-[100%] bg-very-dark-gray'></Skeleton>
            <AdminPaginationInventory page={page} setPage={setPage} />
        </>
    )
}

function CarT({ c, page, tablist }: { c: Car, page: number, tablist: "All" | "Available" | "Sold" }) {
    const cars = useContext(CarsContext)?.cars;
    const setCars = useContext(CarsContext)?.setCars;
    const [, setIsError] = useContext(AlertErrorContext);
    const [, setIsSuccess] = useContext(AlertSuccessContext);
    const { setTotalCars } = useContext(TotalCarsContext) as TotalCarsContextProp;
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isEditButtonLoading, setIsEditButtonLoading] = useState(false);
    const [isDeleteButtonLoading, setIsDeleteButtonLoading] = useState(false);
    const [isSoldButtonLoading, setIsSoldButtonLoading] = useState(false);
    const [images, setImages] = useState<FileList | null>(null);
    const [preview, setPreview] = useState({ img: c.images[0], imagesLength: c.images.length });

    useEffect(() => {
        if (!isDialogOpen) {
            setImages(null);
            setPreview({ img: '', imagesLength: 0 });
        }
    }, [isDialogOpen]);

    function resetImagesState() {
        setPreview({ img: '', imagesLength: 0 });
        setImages(null);
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

    function openDialog() {
        setPreview({ img: c.images[0], imagesLength: c.images.length });
        setIsDialogOpen(true);
    }

    async function deleteCar(e: MouseEvent) {
        const elem = e.target as Element;
        const id = elem.id;
        // Enable Delete Spinner
        setIsDeleteButtonLoading(true);
        try {
            const response = await fetch(getFetchUrl('api/cars'), {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    id: id,
                    page: page,
                    tablist
                }),
                credentials: 'include'
            })
            const data = await response.json();
            if (!data.success) {
                throw new Error('Failed to delete car from inventory');
            }
            setIsSuccess({ success: true, successMessage: 'Car deleted from inventory' });
            setCars && setCars(data.cars);
            setTotalCars(data.totalCars);
        } catch (error) {
            console.error(error);
            setIsError({ error: true, errorMessage: error instanceof Error ? error.message : 'An unexpected error occurred' });
        }
        // Disable Delete Spinner
        setIsDeleteButtonLoading(false);
    }

    async function editCar() {
        const make = document.querySelector<HTMLInputElement>('#car-make-edit');
        const model = document.querySelector<HTMLInputElement>('#car-model-edit');
        const variant = document.querySelector<HTMLInputElement>('#car-variant-edit');
        const year = document.querySelector<HTMLInputElement>('#car-year-edit');
        const mileage = document.querySelector<HTMLInputElement>('#car-mileage-edit');
        const category = document.querySelector<HTMLSelectElement>('#car-category-edit');
        const transmission = document.querySelector<HTMLSelectElement>('#car-transmission-edit');
        const fuelType = document.querySelector<HTMLSelectElement>('#car-fuel-type-edit');
        const price = document.querySelector<HTMLInputElement>('#car-price-edit');

        setIsEditButtonLoading(true);
        try {
            if (!make || !model || !variant || !year || !mileage || !category || !transmission || !fuelType || !price) {
                throw new Error('One the input field elements is null');
            }

            if (!make.value || !model.value || !variant.value || !year.value || !mileage.value || !category.value || !transmission.value || !fuelType.value || !price.value) {
                throw new Error('Please fill all fields');
            }

            if (validateSelectFields(category, transmission, fuelType).error) {
                throw new Error(validateSelectFields(category, transmission, fuelType).errorMessage);
            }

            const formData = new FormData();
            formData.append('id', c._id);
            formData.append('make', make.value);
            formData.append('model', model.value);
            formData.append('variant', variant.value);
            formData.append('year', year.value);
            formData.append('mileage', mileage.value);
            formData.append('category', category.value);
            formData.append('transmission', transmission.value);
            formData.append('fuelType', fuelType.value);
            formData.append('price', price.value);
            images && Array.from(images).forEach(image => formData.append('image', image));

            const response = await fetch(getFetchUrl('api/cars'), {
                method: 'PATCH',
                credentials: 'include',
                body: formData
            })
            const data = await response.json();

            if (!data.success) {
                throw new Error(data.errorMessage);
            }

            setIsSuccess({ success: true, successMessage: 'Update Successful' });
            make.value = data.updatedCar.make;
            model.value = data.updatedCar.model;
            variant.value = data.updatedCar.variant;
            year.value = data.updatedCar.year;
            mileage.value = data.updatedCar.mileage;
            category.value = data.updatedCar.category;
            category.classList.add('text-secondary');
            transmission.value = data.updatedCar.transmission;
            transmission.classList.add('text-secondary');
            fuelType.value = data.updatedCar.fuelType;
            fuelType.classList.add('text-secondary');
            price.value = data.updatedCar.price;
            setImages(null);
            setPreview({ img: data.updatedCar.images[0], imagesLength: data.updatedCar.images.length });
            if (cars) {
                const updatedCars = cars.map(c => {
                    if (c._id === data.updatedCar._id) return data.updatedCar;
                    return c;

                })
                setCars && setCars(updatedCars);
            }

        } catch (error) {
            console.error(error);
            setIsError({ error: true, errorMessage: error instanceof Error ? error.message : 'An unknown error occurred ' });
        }
        setIsEditButtonLoading(false);
    }

    async function markAsSold(e: MouseEvent) {
        const elem = e.target as Element;
        const id = elem.id.split('-')[1];
        setIsSoldButtonLoading(true);
        try {
            const response = await fetch(getFetchUrl('api/sold'), {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id, tablist, page }),
                credentials: 'include'
            })
            const data = await response.json();
            if (!data.success) {
                throw new Error(data.errorMessage);
            }
            setIsSuccess({ success: true, successMessage: 'Car has been marked as sold' });
            setCars && setCars(data.cars);
            setTotalCars(data.totalCars);
        } catch (error) {
            console.error(error);
            setIsError({ error: true, errorMessage: error instanceof Error ? error.message : 'An unexpected error occurred' });
        }
        setIsSoldButtonLoading(false);
    }

    return (
        <TableRow id={`car-${c._id}`} key={c._id} className='hover:bg-primary [&>*]:text-medium-gray [&>*]:py-4 border-very-dark-gray'>
            <TableCell className='flex items-center gap-x-4 min-w-60 sm:min-w-50' style={{ overflowX: 'auto', scrollbarWidth: 'none' }}>
                <img className='rounded-sm' width={64} height={64} src={c.images[0]} />
                <span className='font-bold text-secondary'>{c.make} {c.model} {c.year}</span>
            </TableCell>
            <TableCell>
                <span className='font-bold rounded-full border border-very-dark-gray text-xs px-2 py-1'>
                    {c.status}
                </span>
            </TableCell>
            <TableCell>
                £{c.price.toLocaleString()}
            </TableCell>
            <TableCell>{c.mileage.toLocaleString()} km</TableCell>
            <TableCell>{c.transmission}</TableCell>
            <TableCell>{c.fuelType}</TableCell>
            <TableCell>
                {tablist === 'Sold' ? `${new Date(c.soldAt).getDate()}/${new Date(c.soldAt).getMonth() + 1}/${new Date(c.soldAt).getFullYear()}`  : `${new Date(c.createdAt).getDate()}/${new Date(c.createdAt).getMonth() + 1}/${new Date(c.createdAt).getFullYear()}`}
            </TableCell>
            <TableCell>
                <Popover>
                    <PopoverTrigger><LuEllipsis /></PopoverTrigger>
                    <PopoverContent className='w-30 flex flex-col p-1 [&>*]:p-2 [&>*]:text-sm bg-black text-medium-gray border-very-dark-gray [&>*]:hover:bg-primary mr-4'>
                        <div className='font-semibold text-secondary'>Actions</div>
                        <div onClick={openDialog}>Edit</div>
                        {c.status === 'Active' &&
                            <button role='button' className="text-start" disabled={isSoldButtonLoading} id={`sold-${c._id}`} onClick={(e) => markAsSold(e)}>
                                {isSoldButtonLoading ? <Spinner /> : 'Sold' }
                            </button>}
                        <button role='button' disabled={isDeleteButtonLoading} className='text-accent-color text-start' id={c._id} onClick={(e) => deleteCar(e)}>
                            {isDeleteButtonLoading ? <Spinner /> : 'Delete' }
                        </button>
                    </PopoverContent>
                </Popover>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <form>
                        <DialogContent className="sm:max-w-[425px] h-[75vh] overflow-auto rounded-none bg-black border-very-dark-gray dialog-container" style={{ scrollbarWidth: 'none' }}>
                            <DialogHeader>
                                <DialogTitle className="text-secondary">Edit car details</DialogTitle>
                                <DialogDescription>
                                    Update the car’s details to keep the listing accurate and up to date.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4">
                                <div className="grid gap-3">
                                    <input id="car-make-edit" type="text" className="w-full outline-none bg-primary p-2 rounded-sm border border-primary text-secondary focus:border-accent-color" placeholder="Make" defaultValue={c.make} />
                                </div>
                                <div className="grid gap-3">
                                    <input id="car-model-edit" type="text" className="w-full outline-none bg-primary p-2 rounded-sm border border-primary text-secondary focus:border-accent-color" placeholder="Model" defaultValue={c.model} />
                                </div>
                                <div className="grid gap-3">
                                    <input id="car-variant-edit" type="text" className="w-full outline-none bg-primary p-2 rounded-sm border border-primary text-secondary focus:border-accent-color" placeholder="Variant" defaultValue={c.variant} />
                                </div>
                                <div className="grid gap-3">
                                    <input id="car-year-edit" type="number" className="w-full outline-none bg-primary p-2 rounded-sm border border-primary text-secondary focus:border-accent-color" placeholder="Year" defaultValue={c.year} />
                                </div>
                                <div className="grid gap-3">
                                    <input id="car-mileage-edit" type="number" className="w-full outline-none bg-primary p-2 rounded-sm border border-primary text-secondary focus:border-accent-color" placeholder="Mileage" defaultValue={c.mileage} />
                                </div>
                                <div className="grid gap-3">
                                    <select id="car-category-edit" name={'category'} className={`border border-primary bg-primary p-2 rounded-sm ${c.category ? 'text-secondary' : 'text-dark-gray'} focus:outline-none`} defaultValue={c.category} onChange={(e) => handleSelectChange(e)}>
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
                                    <select id="car-transmission-edit" name={"transmission"} className={`border border-primary bg-primary p-2 rounded-sm ${c.transmission ? 'text-secondary' : 'text-dark-gray'} focus:outline-none`} defaultValue={c.transmission} onChange={(e) => handleSelectChange(e)}>
                                        <option value="Category">Transmission</option>
                                        <option value="Automatic">Automatic</option>
                                        <option value="Manual">Manual</option>
                                        <option value="Specialized">Specialized</option>
                                    </select>
                                </div>
                                <div className="grid gap-3">
                                    <select id="car-fuel-type-edit" name={"fuelType"} className={`border border-primary bg-primary p-2 rounded-sm ${c.fuelType ? 'text-secondary' : 'text-dark-gray'} focus:outline-none`} defaultValue={c.fuelType} onChange={(e) => handleSelectChange(e)}>
                                        <option value="Fuel Type">Fuel Type</option>
                                        <option value="Diesel">Diesel</option>
                                        <option value="Petrol">Petrol</option>
                                        <option value="Electric">Electric</option>
                                    </select>
                                </div>
                                <div className="grid gap-3">
                                    <input id="car-price-edit" type="number" className="w-full outline-none bg-primary p-2 rounded-sm border border-primary text-secondary focus:border-accent-color" placeholder="Price" defaultValue={c.price} />
                                </div>
                                <div className="grid gap-3">
                                    <input id="file-input-edit" className="file-input-edit w-0 h-0 absolute visibility-hidden" name="image" type="file" accept="image/*" multiple onChange={(e) => handleImageSelection(e)} />
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
                                    <Button disabled={isEditButtonLoading} className="bg-primary border-primary rounded-sm text-secondary w-[25%]" variant="outline">Cancel</Button>
                                </DialogClose>
                                <Button disabled={isEditButtonLoading} onClick={editCar} className="bg-accent-color text-secondary w-[25%] flex items-center justify-center" type="submit">
                                    {isEditButtonLoading ? <Spinner /> : <span>Edit Car</span>}
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </form>
                </Dialog>
            </TableCell>
        </TableRow>
    )
}

export function CarsTable() {
    const cars = useContext(CarsContext)?.cars;
    const setCars = useContext(CarsContext)?.setCars;
    const { setTotalCars } = useContext(TotalCarsContext) as TotalCarsContextProp;
    const [, setIsError] = useContext(AlertErrorContext);
    const { page, setPage } = useContext(PageContext);
    const { tablist } = useContext(TablistContext);

    useEffect(() => {
        getCarsData({ page, setCars, setIsError, setTotalCars, tablist });
    }, [page, tablist]);

    if (cars === undefined) {
        return <UndefinedCars page={page} setPage={setPage} />
    }

    if(cars === null) {
        return (
            <div>
                <span className='text-medium-gray text-sm'>Unable to load inventory data {': ('}</span>
            </div>
        )
    }

    if (cars.length > 0) {
        return (
            <>
                <div>
                    <Table>
                        <TableHeader className=''>
                            <TableRow className='hover:bg-primary [&>*]:text-light-gray [&>*]:font-semibold border-very-dark-gray w-full'>
                                <TableHead>Name</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Price</TableHead>
                                <TableHead>Mileage</TableHead>
                                <TableHead>Transmission</TableHead>
                                <TableHead>Fuel Type</TableHead>
                                <TableHead>{tablist === 'Sold' ? 'Sold at' : 'Created at'}</TableHead>
                                <TableHead></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody className='w-full'>
                            {cars && cars.map(c => {
                                return <CarT key={c._id} c={c} page={page} tablist={tablist} />
                            })}
                        </TableBody>
                    </Table>
                </div>
                <AdminPaginationInventory page={page} setPage={setPage} />
            </>
        )
    }

    if (cars.length === 0) {
        return <div className='text-medium-gray'>Your inventory is empty — add new cars to get started.</div>
    }
}