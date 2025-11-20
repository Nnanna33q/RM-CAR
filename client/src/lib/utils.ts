import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { GetCarsDataProp, GetEnquiriesDataProp, TBusinessInfo, TChartData, TRecentSales, Enquiry, TGetListingsCarsData, TGetListingsCarsFilters } from "./types";
import type { ChangeEvent, MouseEvent } from "react";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getCurveDividerHeight() {
  if (window.innerWidth >= 768 && window.innerWidth < 1024) {
    return 100;
  } else if (window.innerWidth >= 1024) {
    return 150;
  } else {
    return 75;
  }
}

export async function getAuthState(): Promise<boolean> {
  const response = await fetch(window.location.host === 'localhost:5173' ? 'http://localhost:3000/api/authenticated' : import.meta.env.VITE_API_DOMAIN + '/api/authenticated', { credentials: 'include' });
  const data = await response.json();
  return data.success;
}

export function getFetchUrl(endpoint: string) {
  if (window.location.host === 'localhost:5173') {
    return 'http://localhost:3000/' + endpoint
  }
  return `${import.meta.env.VITE_API_DOMAIN}/${endpoint}`
}

export function validateSelectFields(category: HTMLSelectElement, transmission: HTMLSelectElement, fuelType: HTMLSelectElement) {
  if (category.value === 'Category') {
    return { error: true, errorMessage: "Please select the car's category type" }
  }
  if (transmission.value === 'Transmission') {
    return { error: true, errorMessage: "Please select the car's transmission type" }
  }
  if (fuelType.value === 'Fuel Type') {
    return { error: true, errorMessage: "Please select the car's fuel type" }
  }
  return { error: false, errorMessage: '' }
}

export async function getCarsData({ page, setCars, setIsError, setTotalCars, tablist }: GetCarsDataProp) {
  try {
    const response = await fetch(getFetchUrl(`api/cars?page=${page}&tablist=${tablist}`), { credentials: 'include' });
    const data = await response.json();
    if (!data.success) {
      throw new Error(data.errorMessage);
    }
    setCars && setCars(data.cars);
    setTotalCars(data.totalCars);
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
      setIsError({ error: true, errorMessage: error.message });
    } else {
      console.error('Failed to fetch cars data');
      setIsError({ error: true, errorMessage: 'Failed to fetch cars data' });
    }
    setCars && setCars(null);
  }
}

export function handleSelectChange(e: ChangeEvent<HTMLSelectElement>) {
  if (e.target.value === 'Category' || e.target.value === 'Transmission' || e.target.value === 'Fuel Type') {
    e.target.classList.add('text-dark-gray');
    e.target.classList.remove('text-secondary')
  } else {
    e.target.classList.remove('text-dark-gray');
    e.target.classList.add('text-secondary')
  }
}

export function selectImages() {
  const fileInput = document.querySelector<HTMLInputElement>('.file-input-edit');
  fileInput?.click();
}

export async function getEnquiriesData({ page, setEnquiries, setIsError, setTotalEnquiries, tablist }: GetEnquiriesDataProp) {
  try {
    const response = await fetch(getFetchUrl(`api/enquiries?page=${page}&tablist=${tablist}`), { credentials: 'include' });
    const data = await response.json();
    if (!data.success) {
      throw new Error(data.errorMessage);
    }
    setEnquiries && setEnquiries(data.cars);
    setTotalEnquiries(data.totalCars);
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
      setIsError({ error: true, errorMessage: error.message });
    } else {
      console.error('Failed to fetch enquiries data');
      setIsError({ error: true, errorMessage: 'Failed to fetch enquiries data' });
    }
    setEnquiries && setEnquiries(null);
  }
}

export async function getBusinessInfo({ setLogo, setIsError, setBusinessInfo }: {
  setLogo: React.Dispatch<React.SetStateAction<string | null | undefined>>,
  setIsError: React.Dispatch<React.SetStateAction<{
    error: boolean;
    errorMessage: string;
  }>>,
  setBusinessInfo: React.Dispatch<React.SetStateAction<TBusinessInfo | null | undefined>>,
}) {
  try {
    const response = await fetch(getFetchUrl('api/business-info'), {
      method: 'GET',
      credentials: 'include'
    })
    const data = await response.json();
    if (!data.success) throw new Error(data.errorMessage);
    setLogo(data.businessInfo.logo);
    setBusinessInfo({
      name: data.businessInfo.name,
      email: data.businessInfo.email,
      phone: data.businessInfo.phone,
      instagramProfileLink: data.businessInfo.instagramProfileLink,
      facebookProfileLink: data.businessInfo.facebookProfileLink,
      tiktokProfleLink: data.businessInfo.tiktokProfileLink,
      logo: data.businessInfo.logo
    })
  } catch (error) {
    console.error(error);
    setIsError({ error: true, errorMessage: error instanceof Error ? error.message : 'Failed to fetch business info' });
    setLogo(null);
    setBusinessInfo(null);
  }
}

export async function getDashboardInfo({ setTCars, setTEnquiries, setTSales, setIsError, setPercentageChangeOfSales, setPercentageChangeOfCars, setPercentageChangeOfEnquiries, setChartData, setRecentSales, setRecentEnquiries }: {
  setTCars: React.Dispatch<React.SetStateAction<number | null | undefined>>,
  setTEnquiries: React.Dispatch<React.SetStateAction<undefined | number | null>>,
  setTSales: React.Dispatch<React.SetStateAction<number | null | undefined>>,
  setIsError: React.Dispatch<React.SetStateAction<{
    error: boolean;
    errorMessage: string;
  }>>,
  setPercentageChangeOfSales: React.Dispatch<React.SetStateAction<number | null>>,
  setPercentageChangeOfCars: React.Dispatch<React.SetStateAction<number | null>>,
  setPercentageChangeOfEnquiries: React.Dispatch<React.SetStateAction<number | null>>,
  setChartData: React.Dispatch<React.SetStateAction<TChartData[] | null | undefined>>
  setRecentSales: React.Dispatch<React.SetStateAction<TRecentSales[] | null | undefined>>,
  setRecentEnquiries: React.Dispatch<React.SetStateAction<Enquiry[] | undefined | null>>
}) {
  try {
    const response = await fetch(getFetchUrl('api/overview'), {
      method: 'GET',
      credentials: 'include'
    });
    const data = await response.json();
    if (!data.success) throw new Error(data.errorMessage);
    setTCars(data.info.totalCars);
    setTSales(data.info.totalSales);
    setTEnquiries(data.info.totalEnquiries);
    setPercentageChangeOfSales(data.info.percentageChangeOfSales);
    setPercentageChangeOfCars(data.info.percentageChangeOfCars);
    setPercentageChangeOfEnquiries(data.info.percentageChangeOfEnquiries);
    setChartData(data.info.chartData);
    setRecentSales(data.info.recentSales);
    setRecentEnquiries(data.info.recentEnquiries);
  } catch (error) {
    console.error(error);
    setIsError({ error: true, errorMessage: error instanceof Error ? error.message : 'Failed to fetch dashboard info' });
    setTCars(null);
    setTSales(null);
    setTEnquiries(null);
    setChartData(null);
    setRecentSales(null);
    setRecentEnquiries(null);
  }
}

export async function deleteEnquiry(
  e: MouseEvent,
  setIsDeleteButtonLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setEnquiries: React.Dispatch<React.SetStateAction<Enquiry[] | undefined | null>> | undefined,
  setIsSuccess: React.Dispatch<React.SetStateAction<{
    success: boolean;
    successMessage: string;
  }>>,
  setIsError: React.Dispatch<React.SetStateAction<{
    error: boolean;
    errorMessage: string;
  }>>,
  page: number,
  tablist: "All" | "Pending" | "Completed",
  setTotalEnquiries?: React.Dispatch<React.SetStateAction<number>>,
) {

  const elem = e.target as Element;
  const id = elem.id.split('-')[1];
  setIsDeleteButtonLoading(true);
  try {
    const response = await fetch(getFetchUrl('api/enquiries'), {
      method: 'DELETE',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, page, tablist }),
      credentials: "include"
    })
    const data = await response.json();
    if (!data.success) {
      throw new Error(data.errorMessage);
    }
    setEnquiries && setEnquiries(data.enquiries);
    setTotalEnquiries && setTotalEnquiries(data.totalEnquiries);
    setIsSuccess({ success: true, successMessage: 'Enquiry deleted successfully' });
  } catch (error) {
    console.error(error);
    setIsError({ error: true, errorMessage: error instanceof Error ? error.message : 'An unexpected error occurred' });
  }
  setIsDeleteButtonLoading(false);
}

export async function resolveEnquiry(
  e: MouseEvent,
  setIsResolveButtonLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setIsSuccess: React.Dispatch<React.SetStateAction<{
    success: boolean;
    successMessage: string;
  }>>,
  setIsError: React.Dispatch<React.SetStateAction<{
    error: boolean;
    errorMessage: string;
  }>>,
  setEnquiries: React.Dispatch<React.SetStateAction<Enquiry[] | undefined | null>> | undefined,
  page: number,
  tablist: "All" | "Pending" | "Completed",
  setTotalEnquiries?: React.Dispatch<React.SetStateAction<number>>,
) {
  const elem = e.target as Element;
  const id = elem.id.split('-')[1];
  setIsResolveButtonLoading(true);
  try {
      const response = await fetch(getFetchUrl('api/enquiries'), {
          method: 'PATCH',
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id, page, tablist }),
          credentials: 'include'
      })
      const data = await response.json();
      if (!data.success) {
          throw new Error(data.errorMessage);
      }
      console.log('Success')
      setIsSuccess({ success: true, successMessage: 'The enquiry has been resolved' });
      setEnquiries && setEnquiries(data.enquiries)
      setTotalEnquiries && setTotalEnquiries(data.totalEnquiries);
  } catch (error) {
      console.error(error);
      setIsError({ error: true, errorMessage: error instanceof Error ? error.message : 'An unexpected error occurred' });
  }
  setIsResolveButtonLoading(false);
}

export async function getListingsCarsData({ page, setCars, setTotalCars, limit, sortBy, filter }: TGetListingsCarsData) {
  setCars &&setCars(undefined);
  try {
    const response = await fetch(getFetchUrl(`api/listings?page=${page}&limit=${limit}&sortBy=${sortBy}&make=${filter.make}&model=${filter.model}&category=${filter.category}&fuelType=${filter.fuelType}&transmission=${filter.transmission}`), { credentials: 'include' });
    const data = await response.json();
    if (!data.success) {
      throw new Error(data.errorMessage);
    }
    setCars && setCars(data.cars);
    setTotalCars(data.totalCars);
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
      setCars && setCars(null);
    } else {
      console.error('Failed to retrieve listings data');
      setCars && setCars(null);
    }
  }
}

export function isNextPage(limit: number, page: number, totalCars: number) {
  const product = limit * page;
  return product < totalCars;
}

export async function getListingsCarsFilters({
  setIsError,
  setSelectFilter
}: TGetListingsCarsFilters) {
  try {
    const response = await fetch(getFetchUrl('api/listings/filter'), { credentials: 'include' });
    const data = await response.json();
    if(!data.success) throw new Error(data.errorMessage);
    setSelectFilter({ 
      makes: data.filter.makes,
      models: data.filter.models,
      categories: data.filter.categories,
      fuelTypes: data.filter.fuelTypes,
      transmissions: data.filter.transmissions
    })
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
      setIsError({ error: true, errorMessage: error.message });
    } else {
      console.error('Failed to retrieve filters');
      setIsError({ error: true, errorMessage: 'Couldn’t retrieve filters at the moment' });
    }
  }
}

export function handleBrowseCarsButton() {
  window.location.href = '/listings';
}

export function handleContactUsButton(phone: string) {
  window.location.href = `tel:${phone}`;
}

export function handleBuyNowButton(instagramProfileLink: string) {
  window.location.href = instagramProfileLink;
}