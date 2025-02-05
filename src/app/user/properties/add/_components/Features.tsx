import React from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid';
import { useFormContext } from 'react-hook-form';
import { AddPropertyInputType } from './AddPropertyForm';
import { Bed, Bath, Car, ChartArea } from 'lucide-react';
import { AreaType } from '@prisma/client';


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
        'propertyFeature.hasBalcony',
        'propertyFeature.areaType'
      ])
    ) {
      props.next();
    }
  };

  const handlePrev = () => props.prev();
  const defaultValues = getValues();

  const price = watch('price');
  const formatPriceWithCommas = (price: number | null | undefined): string => {
    if (price === null || price === undefined) return "";
    return new Intl.NumberFormat("en-US").format(price);
  };

  const numberToWords = (num: number): string => {
    const units = [
      "Zero", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine",
      "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"
    ];
    const tens = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];
    const scales = ["", "Thousand", "Lakh", "Crore"];
    const scaleValues = [1, 1000, 100000, 10000000]; // Corresponds to "", Thousand, Lakh, Crore
  
    const getWords = (n: number, index: number = 0): string => {
      if (n === 0) return "";
      
      // For numbers less than 20 or less than 100
      if (n < 20)
        return units[n] + (scales[index] && index > 0 ? ` ${scales[index]}` : "");
      
      if (n < 100) {
        const rem = n % 10;
        return tens[Math.floor(n / 10)] + (rem ? ` ${units[rem]}` : "") + (scales[index] && index > 0 ? ` ${scales[index]}` : "");
      }
      
      // For numbers less than 1000
      if (n < 1000) {
        const rem = n % 100;
        return (
          units[Math.floor(n / 100)] +
          " Hundred" +
          (rem ? ` ${getWords(rem)}` : "") +
          (scales[index] && index > 0 ? ` ${scales[index]}` : "")
        );
      }
      
      // For larger numbers: Thousands, Lakhs, Crores
      for (let i = scales.length - 1; i >= 0; i--) {
        const scaleValue = scaleValues[i];
        if (n >= scaleValue) {
          const quotient = Math.floor(n / scaleValue);
          const remainder = n % scaleValue;
          return (
            getWords(quotient, i) +
            (remainder ? ` ${getWords(remainder)}` : "")
          );
        }
      }
      return "";
    };
  
    return getWords(num).trim();
  };
  
  

  const formatChequeAmount = (price: number): string => {
    if (!price) return "";

    const formattedPrice = formatPriceWithCommas(price);
    const priceInWords = numberToWords(price);

    return `RS ${formattedPrice}\n(${priceInWords} Rupees Only)`;
  };

  const enterPriceValue = formatChequeAmount(price);



  // Example Usage





  // Generate radio button options
  // Generate radio button options
  const generateRadioButtons = (name: any, defaultValue?: number) => {
    return Array.from({ length: 10 }, (_, i) => i + 0).map((value) => {


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
        <label htmlFor="description" className="text-white">
          Description
        </label>
        <textarea
          {...register('description')}
          defaultValue={getValues().description}
          id="description"
          placeholder="Enter Your Description"
          rows={4} // Default size for a larger input box
          onInput={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
            e.target.style.height = 'auto'; // Reset the height
            e.target.style.height = `${e.target.scrollHeight}px`; // Adjust to fit content
          }}
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
        {errors.propertyFeature?.bedrooms && (<p className="text-red-500">{errors.propertyFeature?.bedrooms?.message}</p>)}
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
      <label className="flex items-center  text-base font-medium text-green-300 mt-2 ">
            <ChartArea className="  text-green-500" />
            Area In SQ/F
          </label>
      <div className=" w-4/5 flex items-center  justify-start mt-2 gap-3">
        <div className="w-full">

          <input
            {...register("propertyFeature.area")}
            id="contact-name"
            defaultValue={getValues("propertyFeature.area")}
            placeholder="Aera"
            type='number'
            className={`peer w-full bg-transparent placeholder:text-slate-400 text-white text-sm border border-slate-200 rounded-md px-3 py-2.5 transition duration-300 ease focus:outline-none focus:border-green-600 hover:border-slate-300 shadow-sm ${errors.contact?.name ? "border-red-500" : ""
              }`}
          />
          
        </div>
        <div className="">
          <select
            {...register("propertyFeature.areaType")}
            defaultValue={getValues().propertyFeature.areaType}
            id="state"
            className={`peer w-full bg-transparent text-white text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-green-600 hover:border-slate-300 shadow-sm ${errors.propertyFeature?.areaType ? "border-red-500" : ""
              }`}
          >
            <option className="text-black" key={1} value={AreaType.SQUARE_METER}>
              Square Meter
            </option>
            <option className="text-black" key={2} value={AreaType.SQUARE_FEET}>
              Square Feet
            </option>
            <option className="text-black" key={3} value={AreaType.SQUARE_YARD}>
              Square Yard
            </option>
            <option className="text-black" key={4} value={AreaType.MARLA}>
              Marla
            </option>
            <option className="text-black" key={5} value={AreaType.KANAL}>
              Kanal
            </option>
          </select>
          {errors.location?.state && (
            <p className="text-sm text-red-500">
              {errors.location?.state?.message}
            </p>
          )}
        </div>
      </div>
      {errors.propertyFeature?.area && <p className="text-red-500">{errors.propertyFeature?.area?.message}</p>}

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
