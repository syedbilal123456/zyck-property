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
                <label htmlFor="bedrooms" className="block">Bedrooms</label>
                <input
                    {...register('propertyFeature.bedrooms')}
                    defaultValue={defaultValues?.propertyFeature?.bedrooms?.toString()}
                    id="bedrooms"
                    className={`w-full p-2 border rounded-md ${errors?.propertyFeature?.bedrooms ? 'border-red-500' : ''}`}
                />
                {errors?.propertyFeature?.bedrooms && <div className="text-red-500">{errors?.propertyFeature?.bedrooms?.message}</div>}
            </div>

            <div className="input-group">
                <label htmlFor="bathrooms" className="block">Bathrooms</label>
                <input
                    {...register('propertyFeature.bathrooms')}
                    defaultValue={defaultValues?.propertyFeature?.bathrooms?.toString()}
                    id="bathrooms"
                    className={`w-full p-2 border rounded-md ${errors?.propertyFeature?.bathrooms ? 'border-red-500' : ''}`}
                />
                {errors?.propertyFeature?.bathrooms && <div className="text-red-500">{errors?.propertyFeature?.bathrooms?.message}</div>}
            </div>

            <div className="input-group">
                <label htmlFor="parkingSpots" className="block">Parking Slots</label>
                <input
                    {...register('propertyFeature.parkingSpots')}
                    defaultValue={defaultValues?.propertyFeature?.parkingSpots?.toString()}
                    id="parkingSpots"
                    className={`w-full p-2 border rounded-md ${errors?.propertyFeature?.parkingSpots ? 'border-red-500' : ''}`}
                />
                {errors?.propertyFeature?.parkingSpots && <div className="text-red-500">{errors?.propertyFeature?.parkingSpots?.message}</div>}
            </div>

            <div className="input-group">
                <label htmlFor="area" className="block">Area</label>
                <input
                    {...register('propertyFeature.area')}
                    defaultValue={defaultValues?.propertyFeature?.area?.toString()}
                    id="area"
                    className={`w-full p-2 border rounded-md ${errors?.propertyFeature?.area ? 'border-red-500' : ''}`}
                />
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
