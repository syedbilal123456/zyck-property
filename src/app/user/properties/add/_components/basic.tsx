"use client";
import React, { useState } from "react";
import { PropertyStatus, PropertyType, PropertyTypeDetail } from "@prisma/client";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/16/solid";
import { useFormContext } from "react-hook-form";
import { AddPropertyInputType } from "./AddPropertyForm";
import clsx from "clsx";

interface Props {
  className?: string;
  statuses: PropertyStatus[];
  types: PropertyType[];
  next: () => void;
  details: PropertyTypeDetail[];
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

  // Watch the selected typeId
  const selectedTypeId = watch("typeId");
  const TypeId = Number(selectedTypeId)
  // Filter details based on the selected typeId
  const filteredDetails = props.details.filter(
    (detail) => detail.propertyTypeId === TypeId
  );

  const handleNext = async () => {
    if (await trigger(["typeId", "statusId", "price", "DetailId"])) props.next();
  };

  return (
    <div className={clsx("p-4 gap-3 flex justify-center flex-col space-y-10", props.className)}>
      {/* Type Input */}
      <div>
        <label htmlFor="statusId" className="text-white block">
          Property Status
        </label>
        <div className="flex items-center gap-2 mt-5">
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

      <div className="relative mb-5">
        <label htmlFor="typeId" className="cursor-text">
          Property Type
        </label>
        <div className="flex mt-2 gap-1 bg-transparent text-black">
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
        {errors.typeId && (
          <p className="text-sm text-red-500">{errors.typeId?.message}</p>
        )}
      </div>

      <div className="relative">
        <label htmlFor="DetailId" className="text-white">
          Property Details
        </label>
        <div className="peer w-full bg-transparent flex space-x-2 mt-2">
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

      {/* Price Input */}
      <div className="relative mb-5">
        <label htmlFor="price" className="text-white">
          City
        </label>
        <input
          {...register('location.city')}
          defaultValue={getValues().location?.city}
          id="city"
          placeholder=" "
          className={`peer w-full bg-transparent placeholder:text-slate-400 text-green-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-green-600 hover:border-slate-300 shadow-sm ${
            errors.location?.city ? 'border-red-500' : ''
          }`}
        />
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
