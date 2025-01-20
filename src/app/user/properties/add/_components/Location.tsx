

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
        'name',
        'description'
      ])
    ) {
      props.next();
    }
  };

  const handlePrevious = () => props.prev();

  return (
    <div className={`p-4 gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ${props.className}`}>

      {/* Title Code */}
      <div className="relative mb-5">
        <label
          htmlFor="name"
          className="text-white"
        >
          Title
        </label>
        <input
          {...register('name')}
          defaultValue={getValues().name}
          id="name"
          placeholder="Enter Your Title"
          className={`peer w-full bg-transparent placeholder:text-slate-400 text-green-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-green-600 hover:border-slate-300 shadow-sm ${errors.name ? 'border-red-500' : ''
            }`}
        />

        {errors.name && (
          <p className="text-sm text-red-500">{errors.name?.message}</p>
        )}
      </div>

      {/* Zip Code */}
      <div className="relative mb-5">
        <label
          htmlFor="zip"
          className="text-white"
        >
          Description
        </label>
        <input
          {...register('description')}
          defaultValue={getValues().description}
          id="zip"
          placeholder="Enter Your Descripton"
          className={`peer w-full bg-transparent placeholder:text-slate-400 text-green-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-green-600 hover:border-slate-300 shadow-sm ${errors.description ? 'border-red-500' : ''
            }`}
        />

        {errors.description && (
          <p className="text-sm text-red-500">{errors.description?.message}</p>
        )}
      </div>

      {/* Street Address */}
      <div className="relative mb-5 col-span-1 md:col-span-2">
        <label
          htmlFor="streetAddress"
          className="text-white"
        >
          Street Address
        </label>
        <input
          {...register('location.streetAddress')}
          defaultValue={getValues().location?.streetAddress}
          id="streetAddress"
          placeholder="Enter your Street Address"
          className={`peer w-full bg-transparent placeholder:text-slate-400 text-green-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-green-600 hover:border-slate-300 shadow-sm ${errors.location?.streetAddress ? 'border-red-500' : ''
            }`}
        />
        {errors.location?.streetAddress && (
          <p className="text-sm text-red-500">{errors.location?.streetAddress?.message}</p>
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
