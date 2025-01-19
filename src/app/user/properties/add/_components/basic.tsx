"use client";
import React from "react";
import { PropertyStatus, PropertyType } from "@prisma/client";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/16/solid";
import { useFormContext } from "react-hook-form";
import { AddPropertyInputType } from "./AddPropertyForm";
import clsx from "clsx";

interface Props {
  className?: string;
  statuses: PropertyStatus[];
  types: PropertyType[];
  next: () => void;
  details: { id: number; value: string }[] ; // Add the details prop
}


const Basic = (props: Props) => {
  const {
    register,
    formState: { errors },
    trigger,
    getValues,
  } = useFormContext<AddPropertyInputType>();

  const handleNext = async () => {
    if (await trigger(["name", "description", "typeId", "statusId", "price"]))
      props.next();
  };

  if (!props.details) {
    return <p>Loading details...</p>;
  }
  
  return (

    <div
      className={clsx("p-4 gap-3 grid grid-cols-1 md:grid-cols-3", props.className)}
    >
      {/* Name Input */}
      <div className="md:col-span-3 relative mb-5">
        <input
          {...register("name")}
          defaultValue={getValues().name}
          id="name"
          placeholder="Your Name"
          type="text"
          className="peer w-full bg-transparent  placeholder:text-slate-400 text-green-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none hover:border-slate-300 shadow-sm focus:shadow focus:border-green-600"
        />
        <label
          htmlFor="name"
          className="absolute hidden -ml-10 cursor-text px-1 left-2.5 top-2.5 text-slate-400 text-sm transition-all transform origin-left 
                 peer-focus:block peer-focus:-top-8 peer-focus:left-2.5 peer-focus:text-xl peer-focus:bg-transparent peer-focus:text-green-400 peer-focus:scale-500"
        >
          Enter Your Name:
        </label>
        {errors.name && (
          <p className="text-sm text-red-500">{errors.name?.message}</p>
        )}
      </div>

      {/* Description Input */}
      <div className="md:col-span-3 relative mb-5">
        <textarea
          {...register("description")}
          defaultValue={getValues().description}
          id="description"
          placeholder="Your Description"
          className="peer w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
        />
        <label
          htmlFor="description"
          className="absolute hidden cursor-text px-1 left-2.5 top-2 text-slate-400 text-sm transition-all transform origin-left 
                 peer-focus:block peer-focus:-top-7 peer-focus:left-2.5 peer-focus:text-xl peer-focus:bg-transparent peer-focus:text-green-400 peer-focus:scale-500"
        >
          Enter Your Description:
        </label>
        {errors.description && (
          <p className="text-sm text-red-500">{errors.description?.message}</p>
        )}
      </div>

      {/* Type Input */}
      <div className="relative mb-5">
        <select
          {...register("typeId")}
          id="typeId"
          defaultValue={getValues().typeId?.toString() ?? ""}
          className="peer w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
        >
          {props.types?.map((item) => (
            <option key={item.id} value={item.id}>
              {item.value}
            </option>
          ))}
        </select>
        <label
          htmlFor="typeId"
          className="absolute hidden cursor-text px-1 left-2.5 top-2.5 text-slate-400 text-sm transition-all transform origin-left 
                 peer-focus:block peer-focus:-top-8 peer-focus:left-2.5 peer-focus:text-xl peer-focus:bg-transparent peer-focus:text-green-400 peer-focus:scale-500"
        >
          Property Type:
        </label>
        {errors.typeId && (
          <p className="text-sm text-red-500">{errors.typeId?.message}</p>
        )}
      </div>

   {/* Details Dropdown */}
<div className="relative mb-5">
  <select
    {...register("DetailId")}
    id="detailId"
    defaultValue=""
    className="peer w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
  >
    <option value="" disabled>
      Select Detail Type
    </option>
    {(props.details || []).map((item) => (
      <option key={item.id} value={item.id}>
        {item.value}
      </option>
    ))}
  </select>
  <label
    htmlFor="detailId"
    className="absolute hidden cursor-text px-1 left-2.5 top-2.5 text-slate-400 text-sm transition-all transform origin-left 
             peer-focus:block peer-focus:-top-8 peer-focus:left-2.5 peer-focus:text-xl peer-focus:bg-transparent peer-focus:text-green-400 peer-focus:scale-500"
  >
    Detail Type:
  </label>
  {errors.DetailId && (
    <p className="text-sm text-red-500">{errors.DetailId?.message}</p>
  )}
</div>



      {/* Status Input */}
      <div className="relative mb-5">
        <select
          {...register("statusId")}
          id="statusId"
          defaultValue={getValues().statusId?.toString() ?? ""}
          className="peer w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
        >
          {props.statuses?.map((item) => (
            <option key={item.id} value={item.id}>
              {item.value}
            </option>
          ))}
        </select>
        <label
          htmlFor="statusId"
          className="absolute hidden cursor-text px-1 left-2.5 top-2.5 text-slate-400 text-sm transition-all transform origin-left 
                 peer-focus:block peer-focus:-top-8 peer-focus:left-2.5 peer-focus:text-xl peer-focus:bg-transparent peer-focus:text-green-400 peer-focus:scale-500"
        >
          Property Status:
        </label>
        {errors.statusId && (
          <p className="text-sm text-red-500">{errors.statusId?.message}</p>
        )}
      </div>

      {/* Price Input */}
      <div className="relative mb-5">
        <input
          {...register("price")}
          defaultValue={getValues().price?.toString()}
          id="price"
          type="number"
          placeholder="Price"
          className="peer w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
        />
        <label
          htmlFor="price"
          className="absolute hidden cursor-text px-1 left-2.5 top-2.5 text-slate-400 text-sm transition-all transform origin-left 
                 peer-focus:block peer-focus:-top-8 peer-focus:left-2.5 peer-focus:text-xl peer-focus:bg-transparent peer-focus:text-green-400 peer-focus:scale-500"
        >
          Enter Property Price:
        </label>
        {errors.price && (
          <p className="text-sm text-red-500">{errors.price?.message}</p>
        )}
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
}


export default Basic
