import React, { useState, useEffect } from "react";
import { City, PropertyStatus, PropertyType, PropertyTypeDetail, State } from "@prisma/client";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";
import { useFormContext } from "react-hook-form";
import { AddPropertyInputType } from "./AddPropertyForm";
import clsx from "clsx";

interface Props {
  className?: string;
  statuses: PropertyStatus[];
  types: PropertyType[];
  next: () => void;
  details: PropertyTypeDetail[];
  cities: City[];
  states: State[];
}

const Basic = (props: Props) => {
  const {
    register,
    formState: { errors },
    trigger,
    getValues,
    setValue,
    watch,
  } = useFormContext<AddPropertyInputType>();

  const [filteredCities, setFilteredCities] = useState<City[]>([]);

  // Watch the selected typeId
  const selectedTypeId = watch("typeId");
  const typeId = Number(selectedTypeId);

  // Filter details based on the selected typeId
  const filteredDetails = props.details.filter(
    (detail) => detail.propertyTypeId === typeId
  );

  const selectedStateId = watch("location.state");
  const stateType = Number(selectedStateId);

  // Update cities whenever the state changes
  useEffect(() => {
    if (stateType) {
      setFilteredCities(props.cities.filter((item) => item.stateId === stateType));
    }
  }, [stateType, props.cities]);

  const handleNext = async () => {
    if (await trigger(["typeId", "statusId", "DetailId", "location.city", "location.state"])) props.next();
  };

  return (
    <div className={clsx("p-4 gap-3 flex justify-center flex-col space-y-10", props.className)}>
      {/* Type Input */}
      <div className="w-full sm:w-2/3 md:w-1/2 lg:w-1/3">
        <label htmlFor="statusId" className="text-white block">
          Property Status
        </label>
        <div className="flex items-center gap-2 mt-5 flex-wrap">
          {props.statuses?.map((item) => (
            <label key={item.id} className="flex items-center cursor-pointer">
              <input
                {...register("statusId", { required: "Status is required" })}
                type="radio"
                value={item.id.toString()}
                className="hidden peer"
              />
              <span className="bg-black font-semibold text-white border rounded-lg p-3 peer-checked:bg-green-500 peer-checked:text-white">
                {item.value}
              </span>
            </label>
          ))}
        </div>
        {errors.statusId && <p className="text-sm text-red-500">{errors.statusId?.message}</p>}
      </div>

      {/* Property Type Input */}
      <div className="relative mb-5 w-full sm:w-2/3 md:w-1/2 lg:w-1/3">
        <label htmlFor="typeId" className="cursor-text">
          Property Type
        </label>
        <div className="flex mt-2 gap-1 bg-transparent text-black flex-wrap">
          {props.types?.map((item) => (
            <label key={item.id} className="flex items-center cursor-pointer">
              <input
                {...register("typeId", { required: "Type is required" })}
                type="radio"
                value={item.id}
                className="hidden peer"
              />
              <span className="bg-black text-white border-b font-semibold rounded-lg p-3 peer-checked:bg-green-500 peer-checked:text-white">
                {item.value}
              </span>
            </label>
          ))}
        </div>
        {errors.typeId && <p className="text-sm text-red-500">{errors.typeId?.message}</p>}
      </div>

      {/* Property Details Input */}
      <div className="relative w-full sm:w-2/3 md:w-1/2 lg:w-1/3">
        <label htmlFor="DetailId" className="text-white">
          Property Details
        </label>
        <div className="peer w-full bg-transparent flex space-x-2 mt-2 flex-wrap">
          {filteredDetails.map((item) => (
            <label key={item.id} className="cursor-pointer">
              <input
                {...register("DetailId", { required: "Detail is required" })}
                type="radio"
                value={item.id.toString()}
                className="hidden peer"
              />
              <span className="bg-black text-white border p-2 rounded-md peer-checked:bg-green-500 peer-checked:text-white transition duration-300 ease-in-out">
                {item.value}
              </span>
            </label>
          ))}
        </div>
        {errors.DetailId && <p className="text-sm text-red-500">{errors.DetailId?.message}</p>}
      </div>

      {/* State Selection */}
      <div className="relative mb-5 w-full sm:w-2/3 md:w-1/2 lg:w-1/3">
        <label htmlFor="state" className="text-white">
          State
        </label>
        <select
          {...register("location.state")}
          defaultValue={getValues().location?.state}
          id="state"
          className={`peer w-full bg-transparent text-green-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-green-600 hover:border-slate-300 shadow-sm ${
            errors.location?.state ? "border-red-500" : ""
          }`}
        >
          <option value="" disabled>
            Select a State
          </option>
          {props.states.map((item) => (
            <option key={item.id} value={item.id}>
              {item.value}
            </option>
          ))}
        </select>
        {errors.location?.state && <p className="text-sm text-red-500">{errors.location?.state?.message}</p>}
      </div>

      {/* City Selection */}
      <div className="relative mb-5 w-full sm:w-2/3 md:w-1/2 lg:w-1/3">
        <label htmlFor="city" className="text-white">
          City
        </label>
        <select
          {...register("location.city")}
          defaultValue={getValues().location?.city}
          id="city"
          className={`peer w-full bg-transparent text-green-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-green-600 hover:border-slate-300 shadow-sm ${
            errors.location?.city ? "border-red-500" : ""
          }`}
          style={{ position: "relative", zIndex: 10 }}
        >
          <option value="" disabled>
            Select a City
          </option>
          {filteredCities.map((city) => (
            <option key={city.id} value={city.id}>
              {city.value}
            </option>
          ))}
        </select>
        {errors.location?.city && <p className="text-sm text-red-500">{errors.location?.city?.message}</p>}
      </div>

      {/* Buttons */}
      <div className="flex justify-center col-span-3 gap-3">
        <button
          type="button"
          disabled
          className="w-36 bg-gray-300 text-white rounded-md py-2"
        >
          <ChevronLeftIcon className="w-6 inline" />
          Previous
        </button>
        <button
          type="button"
          onClick={handleNext}
          className="w-36 bg-green-600 text-white rounded-md py-2"
        >
          Next
          <ChevronRightIcon className="w-6 inline" />
        </button>
      </div>
    </div>
  );
};

export default Basic;
