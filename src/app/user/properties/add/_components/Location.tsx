import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/16/solid';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { AddPropertyInputType } from './AddPropertyForm';

interface Props {
  next: () => void;
  prev: () => void;
  className?: string;
}

const Location = (props: Props) => {
  const {
    register,
    formState: { errors },
    trigger,
    getValues,
  } = useFormContext<AddPropertyInputType>();

  const handleNext = async () => {
    if (
      await trigger([
        'location.streetAddress',
        'location.zip',
        'location.city',
        'location.state',
        'location.region',
        'location.landmark',
      ])
    ) {
      props.next();
    }
  };

  const handlePrevious = () => props.prev();

  return (
    <div className={`p-4 gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ${props.className}`}>
      {/* Street Address */}
      <div className="relative mb-5 col-span-1 md:col-span-2">
        <input
          {...register('location.streetAddress')}
          defaultValue={getValues().location?.streetAddress}
          id="streetAddress"
          placeholder=" "
          className={`peer w-full bg-transparent placeholder:text-slate-400 text-green-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-green-600 hover:border-slate-300 shadow-sm ${
            errors.location?.streetAddress ? 'border-red-500' : ''
          }`}
        />
        <label
          htmlFor="streetAddress"
          className="absolute cursor-text px-1 left-2.5 top-2.5 text-slate-400 text-sm transition-all transform origin-left peer-focus:-top-7 peer-focus:left-2.5 peer-focus:text-green-400 peer-focus:scale-500"
        >
          Street Address
        </label>
        {errors.location?.streetAddress && (
          <p className="text-sm text-red-500">{errors.location?.streetAddress?.message}</p>
        )}
      </div>

      {/* Zip Code */}
      <div className="relative mb-5">
        <input
          {...register('location.zip')}
          defaultValue={getValues().location?.zip}
          id="zip"
          placeholder=" "
          className={`peer w-full bg-transparent placeholder:text-slate-400 text-green-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-green-600 hover:border-slate-300 shadow-sm ${
            errors.location?.zip ? 'border-red-500' : ''
          }`}
        />
        <label
          htmlFor="zip"
          className="absolute cursor-text px-1 left-2.5 top-2.5 text-slate-400 text-sm transition-all transform origin-left peer-focus:-top-7 peer-focus:left-2.5 peer-focus:text-green-400 peer-focus:scale-500"
        >
          Zip/Postal Code
        </label>
        {errors.location?.zip && (
          <p className="text-sm text-red-500">{errors.location?.zip?.message}</p>
        )}
      </div>

      {/* City */}
      <div className="relative mb-5">
        <input
          {...register('location.city')}
          defaultValue={getValues().location?.city}
          id="city"
          placeholder=" "
          className={`peer w-full bg-transparent placeholder:text-slate-400 text-green-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-green-600 hover:border-slate-300 shadow-sm ${
            errors.location?.city ? 'border-red-500' : ''
          }`}
        />
        <label
          htmlFor="city"
          className="absolute cursor-text px-1 left-2.5 top-2.5 text-slate-400 text-sm transition-all transform origin-left peer-focus:-top-7 peer-focus:left-2.5 peer-focus:text-green-400 peer-focus:scale-500"
        >
          City
        </label>
        {errors.location?.city && (
          <p className="text-sm text-red-500">{errors.location?.city?.message}</p>
        )}
      </div>

      {/* State */}
      <div className="relative mb-5">
        <input
          {...register('location.state')}
          defaultValue={getValues().location?.state}
          id="state"
          placeholder=" "
          className={`peer w-full bg-transparent placeholder:text-slate-400 text-green-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-green-600 hover:border-slate-300 shadow-sm ${
            errors.location?.state ? 'border-red-500' : ''
          }`}
        />
        <label
          htmlFor="state"
          className="absolute cursor-text px-1 left-2.5 top-2.5 text-slate-400 text-sm transition-all transform origin-left peer-focus:-top-7 peer-focus:left-2.5 peer-focus:text-green-400 peer-focus:scale-500"
        >
          State
        </label>
        {errors.location?.state && (
          <p className="text-sm text-red-500">{errors.location?.state?.message}</p>
        )}
      </div>

      {/* Region */}
      <div className="relative mb-5 col-span-1 md:col-span-2 lg:col-span-3">
        <input
          {...register('location.region')}
          defaultValue={getValues().location?.region}
          id="region"
          placeholder=" "
          className={`peer w-full bg-transparent placeholder:text-slate-400 text-green-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-green-600 hover:border-slate-300 shadow-sm ${
            errors.location?.region ? 'border-red-500' : ''
          }`}
        />
        <label
          htmlFor="region"
          className="absolute cursor-text px-1 left-2.5 top-2.5 text-slate-400 text-sm transition-all transform origin-left peer-focus:-top-7 peer-focus:left-2.5 peer-focus:text-green-400 peer-focus:scale-500"
        >
          Region/Neighborhood
        </label>
        {errors.location?.region && (
          <p className="text-sm text-red-500">{errors.location?.region?.message}</p>
        )}
      </div>

      {/* Landmark */}
      <div className="relative mb-5 col-span-1 md:col-span-2">
        <textarea
          {...register('location.landmark')}
          defaultValue={getValues().location?.landmark}
          id="landmark"
          placeholder=" "
          className={`peer w-full bg-transparent placeholder:text-slate-400 text-green-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-green-600 hover:border-slate-300 shadow-sm ${
            errors.location?.landmark ? 'border-red-500' : ''
          }`}
        />
        <label
          htmlFor="landmark"
          className="absolute cursor-text px-1 left-2.5 top-2 text-slate-400 text-sm transition-all transform origin-left peer-focus:-top-7 peer-focus:left-2.5 peer-focus:text-green-400 peer-focus:scale-500"
        >
          Landmarks
        </label>
        {errors.location?.landmark && (
          <p className="text-sm text-red-500">{errors.location?.landmark?.message}</p>
        )}
      </div>

      {/* Buttons */}
      <div className="mt-3 flex justify-center col-span-1 md:col-span-2 lg:col-span-3 gap-3">
        <button
          onClick={handlePrevious}
          className="bg-blue-500 text-white p-2 rounded-md w-36 flex items-center justify-center gap-2 transition hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          <ChevronLeftIcon className="w-6" /> Previous
        </button>
        <button
          onClick={handleNext}
          className="bg-blue-500 text-white p-2 rounded-md w-36 flex items-center justify-center gap-2 transition hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          <ChevronRightIcon className="w-6" /> Next
        </button>
      </div>
    </div>
  );
};

export default Location;
