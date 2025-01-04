import React from "react";
import { ChevronLeftIcon, PlusCircleIcon } from "@heroicons/react/16/solid";
import { useFormContext } from "react-hook-form";
import { AddPropertyInputType } from "./AddPropertyForm";

interface Props {
  prev: () => void;
  className?: string;
}

const Contact = ({ prev, className }: Props) => {
  const {
    register,
    formState: { errors },
    getValues,
  } = useFormContext<AddPropertyInputType>();

  return (
    <div className={`grid grid-cols-1 md:grid-cols-3 gap-3 p-2 ${className}`}>
      <div className="input-group">
        <label htmlFor="contact-name" className="block">Contact Name</label>
        <input
          {...register("contact.name")}
          id="contact-name"
          defaultValue={getValues("contact.name")}
          className={`form-input w-full p-2 border rounded-md ${errors.contact?.name ? 'border-red-500' : ''}`}
        />
        {errors.contact?.name && <div className="text-red-500">{errors.contact?.name?.message}</div>}
      </div>

      <div className="input-group">
        <label htmlFor="contact-phone" className="block">Phone</label>
        <input
          {...register("contact.phone")}
          id="contact-phone"
          defaultValue={getValues("contact.phone")}
          className={`form-input w-full p-2 border rounded-md ${errors.contact?.phone ? 'border-red-500' : ''}`}
        />
        {errors.contact?.phone && <div className="text-red-500">{errors.contact?.phone?.message}</div>}
      </div>

      <div className="input-group">
        <label htmlFor="contact-email" className="block">Email</label>
        <input
          {...register("contact.email")}
          id="contact-email"
          defaultValue={getValues("contact.email")}
          className={`form-input w-full p-2 border rounded-md ${errors.contact?.email ? 'border-red-500' : ''}`}
        />
        {errors.contact?.email && <div className="text-red-500">{errors.contact?.email?.message}</div>}
      </div>

      <div className="flex justify-center col-span-3 gap-3">
        <button
          onClick={prev}
          className="bg-blue-500 text-white p-2 rounded-md w-36 flex items-center justify-center gap-2"
        >
          <ChevronLeftIcon className="w-6" /> Previous
        </button>
        <button
          type="submit"
          className="bg-green-500 text-white p-2 rounded-md w-36 flex items-center justify-center gap-2"
        >
          <PlusCircleIcon className="w-6" /> Save
        </button>
      </div>
    </div>
  );
};

export default Contact;
