import React from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/16/solid';
import { useFormContext } from 'react-hook-form';
import { AddPropertyInputType } from './AddPropertyForm';
import { Bed, Bath, Car, ChartArea } from 'lucide-react';

interface Props {
  next: () => void;
  prev: () => void;
  className?: string;
}

const Features = (props: Props) => {
  const {
    register,
    formState: { errors },
    trigger,
    getValues,
  } = useFormContext<AddPropertyInputType>();

  const handleNext = async () => {
    if (
      await trigger([
        'propertyFeature.bedrooms',
        'propertyFeature.bathrooms',
        'propertyFeature.parkingSpots',
        'propertyFeature.area',
      ])
    ) {
      props.next();
    }
  };

  const handlePrev = () => props.prev();
  const defaultValues = getValues();

  // Generate radio button options
 // Generate radio button options
const generateRadioButtons = (name: any, defaultValue?: number) => {
    return Array.from({ length: 10 }, (_, i) => i + 1).map((value) => {

        console.log(value,typeof value,"value",defaultValue,typeof defaultValue);
        
       return <label key={value} className="relative">
        <input
          {...register(name, { valueAsNumber: true })}
          type="radio"
          value={value}
          defaultChecked={defaultValue ? defaultValue.toString() === value.toString() : value === 1}
          className="hidden peer" // Hide the radio button but still keep it accessible
        />
        <span
          className="px-5 py-3 text-black rounded-3xl bg-white border border-gray-300 peer-checked:bg-green-400 peer-checked:text-white transition"
        >
          {value}
        </span>
      </label>
    });
  };
  

  return (
    <div className={`p-2 flex flex-col gap-3 ${props.className}`}>
      {/* Bedrooms */}
      <div className="input-group">
        <label className="flex items-center gap-2 text-base font-medium text-green-300 mb-6">
          <Bed className="w-6 h-6 text-green-500" />
          Bedrooms
        </label>
        <div className="flex flex-wrap gap-3">{generateRadioButtons('propertyFeature.bedrooms', defaultValues?.propertyFeature?.bedrooms)}</div>
        {errors.propertyFeature?.bedrooms &&( <p className="text-red-500">{errors.propertyFeature?.bedrooms?.message}</p>)}
      </div>

      {/* Bathrooms */}
      <div className="input-group">
        <label className="flex items-center gap-2 text-base font-medium text-green-300 mb-6 mt-4">
          <Bath className="w-6 h-6 text-green-500" />
          Bathrooms
        </label>
        <div className="flex flex-wrap gap-3">{generateRadioButtons('propertyFeature.bathrooms', defaultValues?.propertyFeature?.bathrooms)}</div>
        {errors.propertyFeature?.bathrooms && <p className="text-red-500">{errors.propertyFeature?.bathrooms?.message}</p>}
      </div>

      {/* Parking Spots */}
      <div className="input-group">
        <label className="flex items-center gap-2 text-base font-medium text-green-300 mb-6 mt-4">
          <Car className="w-6 h-6 text-green-500" />
          Parking Spots
        </label>
        <div className="flex flex-wrap gap-3">{generateRadioButtons('propertyFeature.parkingSpots', defaultValues?.propertyFeature?.parkingSpots)}</div>
        {errors.propertyFeature?.parkingSpots && <p className="text-red-500">{errors.propertyFeature?.parkingSpots?.message}</p>}
      </div>

      {/* Area */}
      <div className="input-group">
        <label className="flex items-center gap-2 text-base font-medium text-green-300 mb-6 mt-4">
          <ChartArea className="w-6 h-6 text-green-500" />
          Area
        </label>
        <input
            {...register("propertyFeature.area")}
            id="contact-name"
            defaultValue={getValues("propertyFeature.area")}
            placeholder="Aera"
            className={`peer w-full bg-transparent placeholder:text-slate-400 text-green-700 text-sm border border-slate-200 rounded-md px-3 py-2.5 transition duration-300 ease focus:outline-none focus:border-green-600 hover:border-slate-300 shadow-sm ${
              errors.contact?.name ? "border-red-500" : ""
            }`}
          />
        {errors.propertyFeature?.area && <p className="text-red-500">{errors.propertyFeature?.area?.message}</p>}
      </div>

      <div className="mt-3 flex justify-center col-span-2 gap-3">
        <button
          onClick={handlePrev}
          className="bg-green-500 text-white p-2 rounded-md w-36 flex items-center justify-center gap-2"
        >
          <ChevronLeftIcon className="w-6" /> Previous
        </button>
        <button
          onClick={handleNext}
          className="bg-green-500 text-white p-2 rounded-md w-36 flex items-center justify-center gap-2"
        >
          <ChevronRightIcon className="w-6" /> Next
        </button>
      </div>
    </div>
  );
};

export default Features;
