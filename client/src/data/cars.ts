import accuraImg from '../assets/acura-svgrepo-com.svg';
import audiImg from '../assets/audi-logo.svg';
import bmwImg from '../assets/bmw-svgrepo-com.svg';
import fordImg from '../assets/ford-svgrepo-com.svg';
import hondaImg from '../assets/honda-svgrepo-com.svg';
import mazdaImg from '../assets/mazda-alt-svgrepo-com.svg';
import nissanImg from '../assets/nissan-svgrepo-com.svg';
import peugeotImg from '../assets/peugeot-svgrepo-com.svg';
import renaultImg from '../assets/renault-svgrepo-com.svg';
import toyotaImg from '../assets/toyota-svgrepo-com.svg';

import car1 from '../assets/car-1.png';
import car2 from '../assets/car-2-removebg-preview.png';
import car3 from '../assets/car-3.png';
import car4 from '../assets/car-4-removebg-preview.png';
import car5 from '../assets/car-5-removebg-preview.png';
import car6 from '../assets/car-6-removebg-preview.png';

import { featuredCarImages1, featuredCarImages2, featuredCarImages3, featuredCarImages4 } from './featuredCarsImport';

export const carLogos = [
    {
        img: accuraImg,
        key: '1',
        name: 'Accura'
    },
    {
        img: audiImg,
        key: '2',
        name: 'Audi'
    },
    {
        img: bmwImg,
        key: '3',
        name: 'BMW'
    },
    {
        img: fordImg,
        key: '4',
        name: 'Ford'
    },
    {
        img: hondaImg,
        key: '5',
        name: 'Honda'
    },
    {
        img: mazdaImg,
        key: '6',
        name: 'Mazda'
    },
    {
        img: nissanImg,
        key: '7',
        name: 'Nissan'
    },
    {
        img: peugeotImg,
        key: '8',
        name: 'Peugeot'
    },
    {
        img: renaultImg,
        key: '9',
        name: 'Renault'
    },
    {
        img: toyotaImg,
        key: '10',
        name: 'Toyota'
    }
]

export const cars = [
    {
        "key": "1",
        img: car1
    },
    {
        "key": "2",
        img: car2
    },
    {
        "key": "3",
        img: car3
    },
    {
        "key": "4",
        img: car4
    },
    {
        "key": "5",
        img: car5
    },
    {
        "key": "6",
        img: car6
    }
]

export const featuredCars = [
    {
        key: '1',
        images: featuredCarImages1,
        carManufacturer: 'Renault',
        carModel: 'Clio',
        carVariant: 'Dynamique',
        carCategory: 'Hatchback',
        carYear: 2013,
        mileage: '73k',
        fuelType: 'Petrol',
        transmissionType: 'Manual',
        price: '4,295'
    },
    {
        key: '2',
        images: featuredCarImages2,
        carManufacturer: 'Renault',
        carModel: 'Clio',
        carVariant: 'Dynamique',
        carCategory: 'Hatchback',
        carYear: 2013,
        mileage: '62k',
        fuelType: 'Diesel',
        transmissionType: 'Manual',
        price: '4,995'
    },
    {
        key: '3',
        images: featuredCarImages3,
        carManufacturer: 'Ford',
        carModel: 'EcoSport',
        carVariant: '',
        carCategory: 'SUV',
        carYear: 2015,
        mileage: '73k',
        fuelType: 'Diesel',
        transmissionType: 'Manual',
        price: '4,695'
    },
    {
        key: '4',
        images: featuredCarImages4,
        carManufacturer: 'Citroen',
        carModel: 'C1',
        carVariant: '',
        carCategory: 'Hatchback',
        carYear: 2013,
        mileage: '77k',
        fuelType: 'Petrol',
        transmissionType: 'Manual',
        price: '4,695'
    }
]