import React from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid';
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
    watch,
    getValues,
  } = useFormContext<AddPropertyInputType>();

  const handleNext = async () => {
    if (
      await trigger([
        'propertyFeature.bedrooms',
        'propertyFeature.bathrooms',
        'propertyFeature.parkingSpots',
        'propertyFeature.area',
       'propertyFeature.hasSwimmingPool',
       'propertyFeature.hasGardenYard',
       'propertyFeature.hasBalcony'
      ])
    ) {
      props.next();
    }
  };

  const handlePrev = () => props.prev();
  const defaultValues = getValues();

  const price = watch('price');
  const formatPriceWithCommas = (price:any) => {
    if (price === null || price === undefined) return "";
    return new Intl.NumberFormat('en-US').format(price);
  };
  const formattedPrice = formatPriceWithCommas(price);
  let enterPriceValue = "";
  
  if (price) {
    const priceStr = price.toString();
    const length = priceStr.length;
  
    const units = [
      { value: 4, label: "Thousand" },
      { value: 6, label: "Lakh" },
      { value: 8, label: "Crore" },
      { value: 10, label: "Arab" },
    ];
  
    const unit = units.find(u => length >= u.value && length < u.value + 2);
  
    if (unit) {
      const sliceLength = length - unit.value + 1;
      enterPriceValue = `RS ${priceStr.slice(0, sliceLength)} ${unit.label} ${formattedPrice}`;
    }
  }
  


  
  // Example Usage
 

  
  

  // Generate radio button options
 // Generate radio button options
const generateRadioButtons = (name: any, defaultValue?: number) => {
    return Array.from({ length: 10 }, (_, i) => i + 1).map((value) => {

        
       return <label key={value} className="relative">
        <input
          {...register(name)}
          type="radio"
          value={value}
          defaultChecked={defaultValue ? defaultValue === value : value === 1}
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
    <div className={`p-6 border  flex flex-col gap-3 bg-neutral-800 border-green-200  ${props.className}`}>
      {/* Bedrooms */}
         {/* Title Code */}
         <div className="input-group">
        <label
          htmlFor="name"
          className="text-white"
        >
          Property Name
        </label>
        <input
          {...register('name')}
          defaultValue={getValues().name}
          id="name"
          placeholder="Enter Your Title"
          className={`peer w-full bg-transparent placeholder:text-slate-400 text-white text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-green-600 hover:border-slate-300 shadow-sm ${errors.name ? 'border-red-500' : ''
            }`}
        />

        {errors.name && (
          <p className="text-sm text-red-500">{errors.name?.message}</p>
        )}
      </div>
      <div className="input-group">
        <label
          htmlFor="name"
          className="text-white"
        >
          Price in RS
        </label>
        <input
          {...register('price')}
          defaultValue={Number(getValues().price)}
          id="price"
          type='number'
          placeholder="Enter Your Title"
          className={`peer w-full bg-transparent placeholder:text-slate-400 text-white text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-green-600 hover:border-slate-300 shadow-sm ${errors.price ? 'border-red-500' : ''
            }`}
        />
         {enterPriceValue && (
          <p className="text-sm mt-1 text-green-200">{
          enterPriceValue
          }</p>
        )}

        {errors.price && (
          <p className="text-sm text-red-500">{errors.price?.message}</p>
        )}
      </div>

      {/* deciption Code */}
      <div className="input-group">
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
          className={`peer w-full bg-transparent placeholder:text-slate-400 text-white text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-green-600 hover:border-slate-300 shadow-sm ${errors.description ? 'border-red-500' : ''
            }`}
        />

        {errors.description && (
          <p className="text-sm text-red-500">{errors.description?.message}</p>
        )}
      </div>

      <div className="input-group">
        <label className="flex items-center gap-2 text-base font-medium text-green-300 mb-6">
          <Bed className="w-6 h-6 text-green-500" />
          Bedrooms
        </label>
        <div className="flex flex-wrap items-center justify-center  gap-4 max-sm:gap-6">{generateRadioButtons('propertyFeature.bedrooms', defaultValues?.propertyFeature?.bedrooms)}</div>
        {errors.propertyFeature?.bedrooms &&( <p className="text-red-500">{errors.propertyFeature?.bedrooms?.message}</p>)}
      </div>
      

      {/* Bathrooms */}
      <div className="input-group">
        <label className="flex items-center gap-2 text-base font-medium text-green-300 mb-6 mt-4">
          <Bath className="w-6 h-6 text-green-500" />
          Bathrooms
        </label>
        <div className="flex flex-wrap items-center justify-center  gap-4 max-sm:gap-6">{generateRadioButtons('propertyFeature.bathrooms', defaultValues?.propertyFeature?.bathrooms)}</div>
        {errors.propertyFeature?.bathrooms && <p className="text-red-500">{errors.propertyFeature?.bathrooms?.message}</p>}
      </div>

      {/* Parking Spots */}
      <div className="input-group">
        <label className="flex items-center gap-2 text-base font-medium text-green-300 mb-6 mt-4">
          <Car className="w-6 h-6 text-green-500" />
          Parking Spots
        </label>
        <div className="flex flex-wrap items-center justify-center  gap-4 max-sm:gap-6">{generateRadioButtons('propertyFeature.parkingSpots', defaultValues?.propertyFeature?.parkingSpots)}</div>
        {errors.propertyFeature?.parkingSpots && <p className="text-red-500">{errors.propertyFeature?.parkingSpots?.message}</p>}
      </div>

      {/* Area */}
      <div className="input-group">
        <label className="flex items-center gap-2 text-base font-medium text-green-300 mb-6 mt-4">
          <ChartArea className="w-6 h-6 text-green-500" />
          Area In SQ/F
        </label>
        <input
            {...register("propertyFeature.area")}
            id="contact-name"
            defaultValue={getValues("propertyFeature.area")}
            placeholder="Aera"
            type='number'
            className={`peer w-full bg-transparent placeholder:text-slate-400 text-white text-sm border border-slate-200 rounded-md px-3 py-2.5 transition duration-300 ease focus:outline-none focus:border-green-600 hover:border-slate-300 shadow-sm ${
              errors.contact?.name ? "border-red-500" : ""
            }`}
          />
        {errors.propertyFeature?.area && <p className="text-red-500">{errors.propertyFeature?.area?.message}</p>}
      </div>
      <div className="mt-3 flex items-center justify-between">
                <div className="flex items-center">
                    <input
                        type="checkbox"
                        {...register('propertyFeature.hasSwimmingPool')}
                        defaultChecked={defaultValues?.propertyFeature?.hasSwimmingPool}
                        id="hasSwimmingPool"
                    />
                    <label htmlFor="hasSwimmingPool" className="ml-2">Has Swimming Pool</label>
                </div>

                <div className="flex items-center">
                    <input
                        type="checkbox"
                        {...register('propertyFeature.hasGardenYard')}
                        defaultChecked={defaultValues?.propertyFeature?.hasGardenYard}
                        id="hasGardenYard"
                    />
                    <label htmlFor="hasGardenYard" className="ml-2">Has Garden/Yard</label>
                </div>

                <div className="flex items-center">
                    <input
                        type="checkbox"
                        {...register('propertyFeature.hasBalcony')}
                        defaultChecked={defaultValues?.propertyFeature?.hasBalcony}
                        id="hasBalcony"
                    />
                    <label htmlFor="hasBalcony" className="ml-2">Has Balcony/Patio</label>
                </div>
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
