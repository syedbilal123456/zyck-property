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
      <div className="md:col-span-3">
        <label htmlFor="name" className="block text-sm font-medium">
          Name
        </label>
        <input
          {...register("name")}
          defaultValue={getValues().name}
          id="name"
          className={`mt-1 block w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-indigo-600 ${
            errors.name ? "border-red-500" : ""
          }`}
        />
        {errors.name && (
          <p className="text-sm text-red-500">{errors.name?.message}</p>
        )}
      </div>

      <div className="md:col-span-3">
        <label htmlFor="description" className="block text-sm font-medium">
          Description
        </label>
        <textarea
          {...register("description")}
          defaultValue={getValues().description}
          id="description"
          className={`mt-1 block w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-indigo-600 ${
            errors.description ? "border-red-500" : ""
          }`}
        />
        {errors.description && (
          <p className="text-sm text-red-500">{errors.description?.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="typeId" className="block text-sm font-medium">
          Type
        </label>
        <select
          {...register("typeId")}
          id="typeId"
          defaultValue={getValues().typeId?.toString() ?? ""}
          className={`mt-1 block w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-indigo-600 ${
            errors.typeId ? "border-red-500" : ""
          }`}
        >
          {props.types?.map((item) => (
            <option key={item.id} value={item.id}>
              {item.value}
            </option>
          ))}
        </select>
        {errors.typeId && (
          <p className="text-sm text-red-500">{errors.typeId?.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="statusId" className="block text-sm font-medium">
          Status
        </label>
        <select
          {...register("statusId")}
          id="statusId"
          defaultValue={getValues().statusId?.toString() ?? ""}
          className={`mt-1 block w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-indigo-600 ${
            errors.statusId ? "border-red-500" : ""
          }`}
        >
          {props.statuses?.map((item) => (
            <option key={item.id} value={item.id}>
              {item.value}
            </option>
          ))}
        </select>
        {errors.statusId && (
          <p className="text-sm text-red-500">{errors.statusId?.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="price" className="block text-sm font-medium">
          Price
        </label>
        <input
          {...register("price")}
          defaultValue={getValues().price?.toString()}
          id="price"
          type="number"
          className={`mt-1 block w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-indigo-600 ${
            errors.price ? "border-red-500" : ""
          }`}
        />
        {errors.price && (
          <p className="text-sm text-red-500">{errors.price?.message}</p>
        )}
      </div>

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
          className="w-36 bg-indigo-600 text-white rounded-md py-2"
        >
          Next
          <ChevronRightIcon className="w-6 inline" />
        </button>
      </div>
    </div>
  );
};

export default Basic;
