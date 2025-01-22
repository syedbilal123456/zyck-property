import React, { useState, useEffect } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/16/solid';
import { useFormContext } from 'react-hook-form';
import { AddPropertyInputType } from './AddPropertyForm';
import { City, PropertyStatus, PropertyType, PropertyTypeDetail, State } from "@prisma/client";
import { Building2, Currency, Earth, MapPinCheck, Target } from "lucide-react";

interface Props {
  className?: string;
  statuses: PropertyStatus[];
  types: PropertyType[];
  next: () => void;
  prev: () => void;

  details: PropertyTypeDetail[];
  cities: City[];
  states: State[];
}

const Location = (props: Props) => {
  const {
    register,
    formState: { errors },
    trigger,
    watch,
    getValues,
  } = useFormContext<AddPropertyInputType>();

  const selectedStateId = watch("location.state");
  const stateType = Number(selectedStateId);

  useEffect(() => {
    if (stateType) {
      setFilteredCities(props.cities.filter((item) => item.stateId === stateType));
    }
  }, [stateType, props.cities]);

  const handleNext = async () => {
    if (
      await trigger([
        'location.streetAddress',
        'location.city',
        'location.state',
        'location.region',
        'location.landmark',
        'location.zip'
      ])
    ) {
      props.next();
    }
  };

  const handlePrevious = () => props.prev();

  const [filteredCities, setFilteredCities] = useState<City[]>([]);

  // Watch the selected typeId
  const selectedTypeId = watch("typeId");
  const typeId = Number(selectedTypeId);

  // Filter details based on the selected typeId
  const filteredDetails = props.details.filter(
    (detail) => detail.propertyTypeId === typeId
  );



  return (
    <div className={`p-8 gap-4 flex flex-col items-start border bg-neutral-900 border-green-200  justify-start ${props.className}`}>


      {/* state */}
      <div className="relative mb-5 w-full">
      <span className="text-green-300 text-sm   flex items-center  mb-2 ">
      <Earth className="mr-2" />
      
          Province</span>
     
        <select
          {...register("location.state")}
          defaultValue={getValues().location?.state}
          id="state"
          className={`peer w-full bg-transparent text-white text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-green-600 hover:border-slate-300 shadow-sm ${errors.location?.state ? "border-red-500" : ""
            }`}
        >
          <option value="" disabled>
            Select a State
          </option>
          {props.states.map((item) => (
            <option className="text-black" key={item.id} value={item.id}>
              {item.value}
            </option>
          ))}
        </select>
        {errors.location?.state && (
          <p className="text-sm text-red-500">
            {errors.location?.state?.message}
          </p>
        )}
      </div>


      {/* Zip Code */}

      <div className="relative mb-5 w-full">
      <span className="text-green-300 flex items-center  mb-2 text-sm">
      <Building2 className="mr-2"  />
          City </span>
        <select
          {...register("location.city")}
          defaultValue={getValues().location?.city}
          id="city"
          className={`peer w-full bg-transparent text-white text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-green-600 hover:border-slate-300 focus:text-white hover:text-white shadow-sm ${errors.location?.city ? "border-red-500" : ""
            }`}
        >
          <option value="" disabled></option>
          {filteredCities.map((city) => (
            <option className="text-black" key={city.id} value={city.id}>
              {city.value}
            </option>
          ))}
        </select>
        {errors.location?.city && (
          <p className="text-sm text-red-500">
            {errors.location?.city?.message}
          </p>
        )}
      </div>


      {/* Zip code */}
      <div className="relative mb-5  w-full">
      <span className="text-green-300 flex items-center  mb-2 text-sm">
      <MapPinCheck className="mr-2"  />
           Street Address</span>
     
        <input
          {...register('location.streetAddress')}
          defaultValue={getValues().location?.streetAddress}
          id="streetAddress"
          type="text"
          placeholder="Enter your Street Address"
          className={`peer w-full bg-transparent placeholder:text-slate-400 text-white text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-green-600 hover:border-slate-300 shadow-sm ${errors.location?.streetAddress ? 'border-red-500' : ''
            }`}
        />
        {errors.location?.streetAddress && (
          <p className="text-sm text-red-500">{errors.location?.streetAddress?.message}</p>
        )}
      </div>
       {/* zip code */}
       <div className="relative mb-5  w-full">
      <span className="text-green-300 flex items-center  mb-2 text-sm">
      <Target className="mr-2"  />
           Zip code</span>
     
        <input
          {...register('location.zip')}
          defaultValue={getValues().location?.zip}
          id="zip"
          type="text"
          placeholder="Enter your Street Address"
          className={`peer w-full bg-transparent placeholder:text-slate-400 text-white text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-green-600 hover:border-slate-300 shadow-sm ${errors.location?.streetAddress ? 'border-red-500' : ''
            }`}
        />
        {errors.location?.zip && (
          <p className="text-sm text-red-500">{errors.location?.zip?.message}</p>
        )}
      </div>
      <div className="relative mb-5  w-full">
      <span className="text-green-300 flex items-center  mb-2 text-sm">
      <Currency className="mr-2"  />
           landmark </span>
     
        <input
          {...register('location.landmark')}
          defaultValue={getValues().location?.landmark}
          id="streetAddress"
          type="text"
          placeholder="Enter your Street Address"
          className={`peer w-full bg-transparent placeholder:text-slate-400 text-white text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-green-600 hover:border-slate-300 shadow-sm ${errors.location?.streetAddress ? 'border-red-500' : ''
            }`}
        />
        {errors.location?.landmark && (
          <p className="text-sm text-red-500">{errors.location?.landmark?.message}</p>
        )}
      </div>
      <div className="relative mb-5  w-full">
      <span className="text-green-300 flex items-center  mb-2 text-sm">
      <Currency className="mr-2"  />
      region </span>
     
        <input
          {...register('location.region')}
          defaultValue={getValues().location?.region}
          id="region"
          type="text"
          placeholder="Enter your Street Address"
          className={`peer w-full bg-transparent placeholder:text-slate-400 text-white text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-green-600 hover:border-slate-300 shadow-sm ${errors.location?.streetAddress ? 'border-red-500' : ''
            }`}
        />
        {errors.location?.region && (
          <p className="text-sm text-red-500">{errors.location?.region?.message}</p>
        )}
      </div>

      {/* Buttons */}
      <div className="mt-3 flex justify-center col-span-1 md:col-span-2 lg:col-span-3 gap-3">
        <button
          onClick={handlePrevious}
          className="bg-green-500 text-white p-2 rounded-md w-36 flex items-center justify-center gap-2 transition hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300"
        >
          <ChevronLeftIcon className="w-6" /> Previous
        </button>
        <button
          onClick={handleNext}
          className="bg-green-500 text-white p-2 rounded-md w-36 flex items-center justify-center gap-2 transition hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300"
        >
          <ChevronRightIcon className="w-6" /> Next
        </button>
      </div>
    </div>
  );
};

export default Location;