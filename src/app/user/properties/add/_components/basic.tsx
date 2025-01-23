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
  const selectedStatus = watch("statusId");
  const selectedDetailId = watch('DetailId');



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
    if (await trigger(["typeId", "statusId", "DetailId"])) props.next();
  };

  return (
    <div className={clsx("p-4 gap-3 flex justify-center flex-col space-y-10 bg-neutral-900 border border-green-200 ", props.className)}>
      {/* Type Input */}

      <div className="relative mb-5 border-b border-green-400 ">
        <span className="text-green-300 flex items-center pl-2 mr-2">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 mr-2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg>
          Property Type</span>
        {/* */}
        <div className="flex  m-5  rounded-xl mb-5 text-black">
          {props.statuses?.map((item) => {
            const isSelected = selectedStatus?.toString() === item.id.toString();

            return (
              <label
                key={item.id}
                className={`flex flex-col items-center  justify-center w-20 h-20 border transition duration-300 cursor-pointer ${isSelected
                  ? "bg-green-100 border-green-400 text-green-600"
                  : "bg-white border-slate-200 hover:bg-slate-50"
                  }`}
              >
                <input
                  type="radio"

                  value={item.id}
                  {...register("statusId")}
                  className="hidden "
                />
                {/* SVG Icons */}
                {item.value === "Sell" && (
                  <span className="flex items-center justify-center flex-col text-sm">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-8 h-8"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                      />
                    </svg>
                    {
                      item.value
                    }
                  </span>
                )}
                {item.value === "Rent" && (
                  <span className="flex items-center justify-center flex-col text-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m6.115 5.19.319 1.913A6 6 0 0 0 8.11 10.36L9.75 12l-.387.775c-.217.433-.132.956.21 1.298l1.348 1.348c.21.21.329.497.329.795v1.089c0 .426.24.815.622 1.006l.153.076c.433.217.956.132 1.298-.21l.723-.723a8.7 8.7 0 0 0 2.288-4.042 1.087 1.087 0 0 0-.358-1.099l-1.33-1.108c-.251-.21-.582-.299-.905-.245l-1.17.195a1.125 1.125 0 0 1-.98-.314l-.295-.295a1.125 1.125 0 0 1 0-1.591l.13-.132a1.125 1.125 0 0 1 1.3-.21l.603.302a.809.809 0 0 0 1.086-1.086L14.25 7.5l1.256-.837a4.5 4.5 0 0 0 1.528-1.732l.146-.292M6.115 5.19A9 9 0 1 0 17.18 4.64M6.115 5.19A8.965 8.965 0 0 1 12 3c1.929 0 3.716.607 5.18 1.64" />
                    </svg>

                    {
                      item.value
                    }
                  </span>
                )}


                {/* Button Text */}
              </label>
            );
          })}
          {errors.typeId && (
            <p className="text-sm text-red-500">{errors.typeId?.message}</p>
          )}
        </div>



      </div>

      {/* Property Type Input */}
      <div className="relative mb-5 w-full  max-sm:w-full border-b border-green-400">
        <span className="text-green-300 text-base flex items-center pl-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6 mr-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z"
            />
          </svg>
          Property Details
        </span>

        {/* */}
        <div className="flex flex-wrap    w-full   m-5 max-md:m-1 gap-0 mb-2 text-black">
          {props.types?.map((item) => {
            const isSelected = selectedTypeId?.toString() === item.id.toString();

            return (
              <label
                key={item.id}
                className={`flex border flex-col items-center justify-center w-28 max-sm:h-16   h-20  transition duration-300 cursor-pointer ${isSelected
                  ? "bg-green-100 border-green-400 text-green-600"
                  : "bg-white border-slate-200 hover:bg-slate-50"
                  }`}
              >
                <input
                  type="radio"

                  value={item.id}
                  {...register("typeId")}
                  className="hidden "
                />
                {/* SVG Icons */}
                {item.value === "Home" && (
                  <span className="flex  items-center justify-center flex-col text-sm">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-8 h-8"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                      />
                    </svg>
                    {
                      item.value
                    }
                  </span>
                )}
                {item.value === "Plot" && (
                  <span className="flex items-center justify-center flex-col text-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m6.115 5.19.319 1.913A6 6 0 0 0 8.11 10.36L9.75 12l-.387.775c-.217.433-.132.956.21 1.298l1.348 1.348c.21.21.329.497.329.795v1.089c0 .426.24.815.622 1.006l.153.076c.433.217.956.132 1.298-.21l.723-.723a8.7 8.7 0 0 0 2.288-4.042 1.087 1.087 0 0 0-.358-1.099l-1.33-1.108c-.251-.21-.582-.299-.905-.245l-1.17.195a1.125 1.125 0 0 1-.98-.314l-.295-.295a1.125 1.125 0 0 1 0-1.591l.13-.132a1.125 1.125 0 0 1 1.3-.21l.603.302a.809.809 0 0 0 1.086-1.086L14.25 7.5l1.256-.837a4.5 4.5 0 0 0 1.528-1.732l.146-.292M6.115 5.19A9 9 0 1 0 17.18 4.64M6.115 5.19A8.965 8.965 0 0 1 12 3c1.929 0 3.716.607 5.18 1.64" />
                    </svg>

                    {
                      item.value
                    }
                  </span>
                )}
                {item.value === "Commercial" && (
                  <span className="flex items-center justify-center flex-col text-sm mx-4">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205 3 1m1.5.5-1.5-.5M6.75 7.364V3h-3v18m3-13.636 10.5-3.819" />
                    </svg>

                    {
                      item.value
                    }
                  </span>
                )}
                {item.value === "Co-Work Space" && (
                  <span className="flex items-center justify-center text-nowrap  flex-col text-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205 3 1m1.5.5-1.5-.5M6.75 7.364V3h-3v18m3-13.636 10.5-3.819" />
                    </svg>

                    {
                      item.value
                    }
                  </span>
                )}

                {/* Button Text */}
              </label>
            );
          })}
          {errors.typeId && (
            <p className="text-sm text-red-500">{errors.typeId?.message}</p>
          )}
        </div>


      </div>

      {/* Property Details Input */}


      <div className="relative mb-5   w-full">

        <div className="flex flex-wrap w-full gap-4">
          {(filteredDetails || [])
            // Show only the first item if selectedType is 1
            .map((item) => {
              const isSelected = selectedDetailId?.toString() === item.id.toString();

              return (
                <label
                  key={item.id}
                  className={`flex items-center justify-center px-7 py-3 max-sm:px-4 max-sm:py-2 border rounded-md border-green-300 cursor-pointer transition duration-300 ${isSelected
                    ? "bg-green-100 border-green-400 text-green-600 "
                    : "bg-white border-slate-200 hover:bg-slate-50"
                    }`}
                >
                  <input
                  
                    type="radio"
                    value={item.id}
                    {...register("DetailId")}
                    className="hidden border border-green-200"
                  />
                  <span className="text-sm text-black   ">{item.value}</span>
                </label>
              );
            })}
        </div>




        {errors.DetailId && (
          <p className="text-sm text-red-500">{errors.DetailId?.message}</p>
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
};

export default Basic;
