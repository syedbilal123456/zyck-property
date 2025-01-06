import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/16/solid'
import React from 'react'
import { useFormContext } from 'react-hook-form'
import { AddPropertyInputType } from './AddPropertyForm'

interface Props {
  next: () => void
  prev: () => void
  className?: string
}

const Location = (props: Props) => {
  const {
    register,
    formState: { errors },
    trigger,
    getValues
  } = useFormContext<AddPropertyInputType>();

  const handleNext = async () => {
    if (await trigger(["location.streetAddress", "location.zip", "location.city", "location.state", "location.region", "location.landmark"])) {
      props.next()
    }
  }

  const handlePrevious = () => props.prev()

  return (
    <div className={`p-2 grid grid-cols-1 md:grid-cols-2 gap-3 ${props.className}`}>
      <div className="input-group">
        <input
          {...register('location.streetAddress')}
          defaultValue={getValues().location?.streetAddress}
          id="streetAddress"
          className={`absolute cursor-text px-1 left-2.5 top-2.5 text-slate-400 text-sm transition-all transform origin-left peer-focus:-top-8 peer-focus:left-2.5 peer-focus:text-xl peer-focus:bg-transparent peer-focus:text-green-400 peer-focus:scale-500 ${errors.location?.streetAddress ? 'border-red-500' : ''}`}
        />
        <label htmlFor="streetAddress" className="absolute cursor-text px-1 left-2.5 top-2.5 text-slate-400 text-sm transition-all transform origin-left peer-focus:-top-8 peer-focus:left-2.5 peer-focus:text-xl peer-focus:bg-transparent peer-focus:text-green-400 peer-focus:scale-500">Street Address</label>
        {errors.location?.streetAddress && <div className="text-red-500">{errors.location?.streetAddress?.message}</div>}
      </div>

      <div className="input-group">
        <input
          {...register('location.zip')}
          defaultValue={getValues().location?.zip}
          id="zip"
          className={`absolute cursor-text px-1 left-2.5 top-2.5 text-slate-400 text-sm transition-all transform origin-left peer-focus:-top-8 peer-focus:left-2.5 peer-focus:text-xl peer-focus:bg-transparent peer-focus:text-green-400 peer-focus:scale-500 ${errors.location?.zip ? 'border-red-500' : ''}`}
        />
        <label htmlFor="zip" className="absolute cursor-text px-1 left-2.5 top-2.5 text-slate-400 text-sm transition-all transform origin-left peer-focus:-top-8 peer-focus:left-2.5 peer-focus:text-xl peer-focus:bg-transparent peer-focus:text-green-400 peer-focus:scale-500">Zip/Postal Code</label>
        {errors.location?.zip && <div className="text-red-500">{errors.location?.zip?.message}</div>}
      </div>

      <div className="input-group">
        <input
          {...register('location.city')}
          defaultValue={getValues().location?.city}
          id="city"
          className={`absolute cursor-text px-1 left-2.5 top-2.5 text-slate-400 text-sm transition-all transform origin-left peer-focus:-top-8 peer-focus:left-2.5 peer-focus:text-xl peer-focus:bg-transparent peer-focus:text-green-400 peer-focus:scale-500 ${errors.location?.city ? 'border-red-500' : ''}`}
        />
        <label htmlFor="city" className="absolute cursor-text px-1 left-2.5 top-2.5 text-slate-400 text-sm transition-all transform origin-left peer-focus:-top-8 peer-focus:left-2.5 peer-focus:text-xl peer-focus:bg-transparent peer-focus:text-green-400 peer-focus:scale-500">City</label>
        {errors.location?.city && <div className="text-red-500">{errors.location?.city?.message}</div>}
      </div>

      <div className="input-group">
        <input
          {...register('location.state')}
          defaultValue={getValues().location?.state}
          id="state"
          className={`absolute cursor-text px-1 left-2.5 top-2.5 text-slate-400 text-sm transition-all transform origin-left peer-focus:-top-8 peer-focus:left-2.5 peer-focus:text-xl peer-focus:bg-transparent peer-focus:text-green-400 peer-focus:scale-500 ${errors.location?.state ? 'border-red-500' : ''}`}
        />
        <label htmlFor="state" className="absolute cursor-text px-1 left-2.5 top-2.5 text-slate-400 text-sm transition-all transform origin-left peer-focus:-top-8 peer-focus:left-2.5 peer-focus:text-xl peer-focus:bg-transparent peer-focus:text-green-400 peer-focus:scale-500">State</label>
        {errors.location?.state && <div className="text-red-500">{errors.location?.state?.message}</div>}
      </div>

      <div className="input-group col-span-2">
        <input
          {...register('location.region')}
          defaultValue={getValues().location?.region}
          id="region"
          className={`absolute cursor-text px-1 left-2.5 top-2.5 text-slate-400 text-sm transition-all transform origin-left peer-focus:-top-8 peer-focus:left-2.5 peer-focus:text-xl peer-focus:bg-transparent peer-focus:text-green-400 peer-focus:scale-500 ${errors.location?.region ? 'border-red-500' : ''}`}
        />
        <label htmlFor="region" className="absolute cursor-text px-1 left-2.5 top-2.5 text-slate-400 text-sm transition-all transform origin-left peer-focus:-top-8 peer-focus:left-2.5 peer-focus:text-xl peer-focus:bg-transparent peer-focus:text-green-400 peer-focus:scale-500">Region/Neighborhood</label>
        {errors.location?.region && <div className="text-red-500">{errors.location?.region?.message}</div>}
      </div>

      <div className="input-group col-span-2">
        <textarea
          {...register('location.landmark')}
          defaultValue={getValues().location?.landmark}
          id="landmark"
          className={`absolute cursor-text px-1 left-2.5 top-2.5 text-slate-400 text-sm transition-all transform origin-left peer-focus:-top-8 peer-focus:left-2.5 peer-focus:text-xl peer-focus:bg-transparent peer-focus:text-green-400 peer-focus:scale-500 ${errors.location?.landmark ? 'border-red-500' : ''}`}
        />
        <label htmlFor="landmark" className="absolute cursor-text px-1 left-2.5 top-2.5 text-slate-400 text-sm transition-all transform origin-left peer-focus:-top-8 peer-focus:left-2.5 peer-focus:text-xl peer-focus:bg-transparent peer-focus:text-green-400 peer-focus:scale-500">Landmarks</label>
        {errors.location?.landmark && <div className="text-red-500">{errors.location?.landmark?.message}</div>}
      </div>

      <div className="mt-3 flex justify-center col-span-2 gap-3">
        <button
          onClick={handlePrevious}
          className="bg-blue-500 text-white p-2 rounded-md w-36 flex items-center justify-center gap-2"
        >
          <ChevronLeftIcon className="w-6" /> Previous
        </button>
        <button
          onClick={handleNext}
          className="bg-blue-500 text-white p-2 rounded-md w-36 flex items-center justify-center gap-2"
        >
          <ChevronRightIcon className="w-6" /> Next
        </button>
      </div>
    </div>
  )
}

export default Location
