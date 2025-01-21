import React from 'react'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/16/solid'
import { useFormContext } from 'react-hook-form'
import { AddPropertyInputType } from './AddPropertyForm'

interface Props { 
    next: () => void
    prev: () => void
    className?: string
}

const Features = (props: Props) => {
    const {
        register,
        formState: { errors },
        trigger,
        getValues,
    } = useFormContext<AddPropertyInputType>();

    const handleNext = async () => {
        if (await trigger(['propertyFeature.bedrooms', 'propertyFeature.bathrooms', 'propertyFeature.parkingSpots', 'propertyFeature.area'])) {
            props.next()
        }
    }

    const handlePrev = () => props.prev()
    const defaultValues = getValues();

    return (
        <div className={`p-2 grid grid-cols-1 md:grid-cols-2 gap-3 ${props.className}`}>
            <div className="input-group">
                <input
                    {...register('propertyFeature.bedrooms')}
                    defaultValue={defaultValues?.propertyFeature?.bedrooms?.toString()}
                    id="bedrooms"
                    className={`peer w-full bg-transparent placeholder:text-slate-400 text-green-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none hover:border-slate-300 shadow-sm focus:shadow focus:border-green-600 ${errors?.propertyFeature?.bedrooms ? 'border-red-500' : ''}`}
                />
                <label htmlFor="bedrooms" className="absolute cursor-text px-1 left-2.5 top-2.5 text-slate-400 text-sm transition-all transform origin-left peer-focus:-top-8 peer-focus:left-2.5 peer-focus:text-xl peer-focus:bg-transparent peer-focus:text-green-400 peer-focus:scale-500">Bedrooms</label>
                {errors?.propertyFeature?.bedrooms && <div className="text-red-500">{errors?.propertyFeature?.bedrooms?.message}</div>}
            </div>

            <div className="input-group">
                <input
                    {...register('propertyFeature.bathrooms')}
                    defaultValue={defaultValues?.propertyFeature?.bathrooms?.toString()}
                    id="bathrooms"
                    className={`peer w-full bg-transparent placeholder:text-slate-400 text-green-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none hover:border-slate-300 shadow-sm focus:shadow focus:border-green-600 ${errors?.propertyFeature?.bathrooms ? 'border-red-500' : ''}`}
                />
                <label htmlFor="bathrooms" className="absolute cursor-text px-1 left-2.5 top-2.5 text-slate-400 text-sm transition-all transform origin-left peer-focus:-top-8 peer-focus:left-2.5 peer-focus:text-xl peer-focus:bg-transparent peer-focus:text-green-400 peer-focus:scale-500">Bathrooms</label>
                {errors?.propertyFeature?.bathrooms && <div className="text-red-500">{errors?.propertyFeature?.bathrooms?.message}</div>}
            </div>

            <div className="input-group">
                <input
                    {...register('propertyFeature.parkingSpots')}
                    defaultValue={defaultValues?.propertyFeature?.parkingSpots?.toString()}
                    id="parkingSpots"
                    className={`peer w-full bg-transparent placeholder:text-slate-400 text-green-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none hover:border-slate-300 shadow-sm focus:shadow focus:border-green-600 ${errors?.propertyFeature?.parkingSpots ? 'border-red-500' : ''}`}
                />
                <label htmlFor="parkingSpots" className="absolute cursor-text px-1 left-2.5 top-2.5 text-slate-400 text-sm transition-all transform origin-left peer-focus:-top-8 peer-focus:left-2.5 peer-focus:text-xl peer-focus:bg-transparent peer-focus:text-green-400 peer-focus:scale-500">Parking Slots</label>
                {errors?.propertyFeature?.parkingSpots && <div className="text-red-500">{errors?.propertyFeature?.parkingSpots?.message}</div>}
            </div>

            <div className="input-group">
                <input
                    {...register('propertyFeature.area')}
                    defaultValue={defaultValues?.propertyFeature?.area?.toString()}
                    id="area"
                    className={`peer w-full bg-transparent placeholder:text-slate-400 text-green-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none hover:border-slate-300 shadow-sm focus:shadow focus:border-green-600 ${errors?.propertyFeature?.area ? 'border-red-500' : ''}`}
                />
                <label htmlFor="area" className="absolute cursor-text px-1 left-2.5 top-2.5 text-slate-400 text-sm transition-all transform origin-left peer-focus:-top-8 peer-focus:left-2.5 peer-focus:text-xl peer-focus:bg-transparent peer-focus:text-green-400 peer-focus:scale-500">Area</label>
                {errors?.propertyFeature?.area && <div className="text-red-500">{errors?.propertyFeature?.area?.message}</div>}
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

export default Features
