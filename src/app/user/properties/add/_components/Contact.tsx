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
        <input
          {...register("contact.name")}
          id="contact-name"
          defaultValue={getValues("contact.name")}
          className={`peer w-full bg-transparent placeholder:text-slate-400 text-green-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none hover:border-slate-300 shadow-sm focus:shadow focus:border-green-600 ${errors.contact?.name ? 'border-red-500' : ''}`}
        />
        <label htmlFor="contact-name" className="absolute cursor-text px-1 left-2.5 top-2.5 text-slate-400 text-sm transition-all transform origin-left peer-focus:-top-8 peer-focus:left-2.5 peer-focus:text-xl peer-focus:bg-transparent peer-focus:text-green-400 peer-focus:scale-500">Contact Name</label>
        {errors.contact?.name && <div className="text-red-500">{errors.contact?.name?.message}</div>}
      </div>

      <div className="input-group">
        <input
          {...register("contact.phone")}
          id="contact-phone"
          defaultValue={getValues("contact.phone")}
          className="peer w-full bg-transparent placeholder:text-slate-400 text-green-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none hover:border-slate-300 shadow-sm focus:shadow focus:border-green-600"
        />
        <label htmlFor="contact-phone" className="absolute cursor-text px-1 left-2.5 top-2.5 text-slate-400 text-sm transition-all transform origin-left peer-focus:-top-8 peer-focus:left-2.5 peer-focus:text-xl peer-focus:bg-transparent peer-focus:text-green-400 peer-focus:scale-500">Phone</label>
        {errors.contact?.phone && <div className="text-red-500">{String(errors.contact?.phone?.message)}</div>}
      </div>

      <div className="input-group">
        <input
          {...register("contact.email")}
          id="contact-email"
          defaultValue={getValues("contact.email")}
          className={`peer w-full bg-transparent placeholder:text-slate-400 text-green-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none hover:border-slate-300 shadow-sm focus:shadow focus:border-green-600 ${errors.contact?.email ? 'border-red-500' : ''}`}
        />
        <label htmlFor="contact-email" className="absolute cursor-text px-1 left-2.5 top-2.5 text-slate-400 text-sm transition-all transform origin-left peer-focus:-top-8 peer-focus:left-2.5 peer-focus:text-xl peer-focus:bg-transparent peer-focus:text-green-400 peer-focus:scale-500">Email</label>
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
