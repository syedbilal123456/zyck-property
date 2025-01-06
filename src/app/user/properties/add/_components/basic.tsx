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
      placeholder=" "
      type="text"
      className="peer w-full bg-transparent placeholder:text-slate-400 text-green-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none hover:border-slate-300 shadow-sm focus:shadow focus:border-green-600"
    />
    <label
      htmlFor="name"
      className="absolute cursor-text px-1 left-2.5 top-2.5 text-slate-400 text-sm transition-all transform origin-left peer-focus:-top-8 peer-focus:left-2.5 peer-focus:text-xl peer-focus:bg-transparent peer-focus:text-green-400 peer-focus:scale-500"
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
      placeholder=" "
      className="peer w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
    />
    <label
      htmlFor="description"
      className="absolute cursor-text px-1 left-2.5 top-2 text-slate-400 text-sm transition-all transform origin-left peer-focus:-top-7 peer-focus:left-2.5 peer-focus:text-xl peer-focus:bg-transparent peer-focus:text-green-400 peer-focus:scale-500"
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
      className="absolute cursor-text px-1 left-2.5 top-2.5 text-slate-400 text-sm transition-all transform origin-left peer-focus:-top-8 peer-focus:left-2.5 peer-focus:text-xl peer-focus:bg-transparent peer-focus:text-green-400 peer-focus:scale-500"
    >
      Property Type:
    </label>
    {errors.typeId && (
      <p className="text-sm text-red-500">{errors.typeId?.message}</p>
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
      className="absolute cursor-text px-1 left-2.5 top-2.5 text-slate-400 text-sm transition-all transform origin-left peer-focus:-top-8 peer-focus:left-2.5 peer-focus:text-xl peer-focus:bg-transparent peer-focus:text-green-400 peer-focus:scale-500"
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
      placeholder=" "
      className="peer w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
    />
    <label
      htmlFor="price"
      className="absolute cursor-text px-1 left-2.5 top-2.5 text-slate-400 text-sm transition-all transform origin-left peer-focus:-top-8 peer-focus:left-2.5 peer-focus:text-xl peer-focus:bg-transparent peer-focus:text-green-400 peer-focus:scale-500"
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


    // <div
    //   className={clsx("p-4 gap-3 grid grid-cols-1 md:grid-cols-3", props.className)}
    // >
    //   <div className="md:col-span-3">
    //     <label htmlFor="name" className="block text-sm font-medium">
    //       Name
    //     </label>
    //     <input
    //       {...register("name")}
    //       defaultValue={getValues().name}
    //       id="name"
    //       className={`mt-1 block w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-indigo-600 ${
    //         errors.name ? "border-red-500" : ""
    //       }`}
    //     />
    //     {errors.name && (
    //       <p className="text-sm text-red-500">{errors.name?.message}</p>
    //     )}
    //   </div>

    //   <div className="md:col-span-3">
    //     <label htmlFor="description" className="block text-sm font-medium">
    //       Description
    //     </label>
    //     <textarea
    //       {...register("description")}
    //       defaultValue={getValues().description}
    //       id="description"
    //       className={`mt-1 block w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-indigo-600 ${
    //         errors.description ? "border-red-500" : ""
    //       }`}
    //     />
    //     {errors.description && (
    //       <p className="text-sm text-red-500">{errors.description?.message}</p>
    //     )}
    //   </div>

    //   <div>
    //     <label htmlFor="typeId" className="block text-sm font-medium">
    //       Type
    //     </label>
    //     <select
    //       {...register("typeId")}
    //       id="typeId"
    //       defaultValue={getValues().typeId?.toString() ?? ""}
    //       className={`mt-1 block w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-indigo-600 ${
    //         errors.typeId ? "border-red-500" : ""
    //       }`}
    //     >
    //       {props.types?.map((item) => (
    //         <option key={item.id} value={item.id}>
    //           {item.value}
    //         </option>
    //       ))}
    //     </select>
    //     {errors.typeId && (
    //       <p className="text-sm text-red-500">{errors.typeId?.message}</p>
    //     )}
    //   </div>

    //   <div>
    //     <label htmlFor="statusId" className="block text-sm font-medium">
    //       Status
    //     </label>
    //     <select
    //       {...register("statusId")}
    //       id="statusId"
    //       defaultValue={getValues().statusId?.toString() ?? ""}
    //       className={`mt-1 block w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-indigo-600 ${
    //         errors.statusId ? "border-red-500" : ""
    //       }`}
    //     >
    //       {props.statuses?.map((item) => (
    //         <option key={item.id} value={item.id}>
    //           {item.value}
    //         </option>
    //       ))}
    //     </select>
    //     {errors.statusId && (
    //       <p className="text-sm text-red-500">{errors.statusId?.message}</p>
    //     )}
    //   </div>

    //   <div>
    //     <label htmlFor="price" className="block text-sm font-medium">
    //       Price
    //     </label>
    //     <input
    //       {...register("price")}
    //       defaultValue={getValues().price?.toString()}
    //       id="price"
    //       type="number"
    //       className={`mt-1 block w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-indigo-600 ${
    //         errors.price ? "border-red-500" : ""
    //       }`}
    //     />
    //     {errors.price && (
    //       <p className="text-sm text-red-500">{errors.price?.message}</p>
    //     )}
    //   </div>

    //   <div className="flex justify-center col-span-3 gap-3">
    //     <button
    //       type="button"
    //       disabled
    //       className="w-36 bg-gray-300 text-white rounded-md py-2"
    //     >
    //       <ChevronLeftIcon className="w-6 inline" />
    //       Previous
    //     </button>
    //     <button
    //       type="button"
    //       onClick={handleNext}
    //       className="w-36 bg-indigo-600 text-white rounded-md py-2"
    //     >
    //       Next
    //       <ChevronRightIcon className="w-6 inline" />
    //     </button>
    //   </div>
    // </div>
  );
};

export default Basic;
