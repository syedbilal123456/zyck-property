import React from "react";
import { ChevronLeftIcon, PlusCircleIcon } from "@heroicons/react/20/solid";
import { useFormContext } from "react-hook-form";
import { AddPropertyInputType } from "./AddPropertyForm";
import { Mail, Phone, User } from "lucide-react";
import { MdEmail } from "react-icons/md";

interface Props {
  prev: () => void;
  className?: string;
}

const Contact: React.FC<Props> = ({ prev, className }) => {
  const {
    register,
    formState: { errors },
    getValues,
  } = useFormContext<AddPropertyInputType>();

  return (
    <div className={`w-full max-w-[1200px] mx-auto p-4 sm:p-6    ${className || ""}`}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-neutral-900 border-green-100 p-4 border">
        {/* Contact Name */}
        <div className="relative">
        <span className="text-green-300 flex items-center  mb-2 text-sm">
      <User className="mr-2"  />
           Contact Name</span>
          <input
            {...register("contact.name")}
            id="contact-name"
            defaultValue={getValues("contact.name")}
            placeholder="Contact Name"
            className={`peer w-full bg-transparent placeholder:text-slate-400 text-green-700 text-sm border border-slate-200 rounded-md px-3 py-2.5 transition duration-300 ease focus:outline-none focus:border-green-600 hover:border-slate-300 shadow-sm ${
              errors.contact?.name ? "border-red-500" : ""
            }`}
          />
        
          {errors.contact?.name && (
            <div className="text-red-500 text-xs mt-1">{errors.contact.name.message}</div>
          )}
        </div>

        {/* Phone */}
        <div className="relative">
        <span className="text-green-300 flex items-center  mb-2 text-sm">
      <Phone className="mr-2"  />
           Phone</span>
          <input
            {...register("contact.phone")}
            id="contact-phone"
            defaultValue={getValues("contact.phone")}
            placeholder="Phone"
            className={`peer w-full bg-transparent placeholder:text-slate-400 text-green-700 text-sm border border-slate-200 rounded-md px-3 py-2.5 transition duration-300 ease focus:outline-none focus:border-green-600 hover:border-slate-300 shadow-sm ${
              errors.contact?.phone ? "border-red-500" : ""
            }`}
          />
          
          {errors.contact?.phone && (
            <div className="text-red-500 text-xs mt-1">{errors.contact.phone.message}</div>
          )}
        </div>

        {/* Email */}
        <div className="relative col-span-full sm:col-span-2">
        <span className="text-green-300 flex items-center  mb-2 text-sm">
        <Mail className="mr-2" />
           Email</span>
          <input
            {...register("contact.email")}
            id="contact-email"
            type="email"
            defaultValue={getValues("contact.email")}
            placeholder="Email"
            className={`peer w-full bg-transparent placeholder:text-slate-400 text-green-700 text-sm border border-slate-200 rounded-md px-3 py-2.5 transition duration-300 ease focus:outline-none focus:border-green-600 hover:border-slate-300 shadow-sm ${
              errors.contact?.email ? "border-red-500" : ""
            }`}
          />
          
          {errors.contact?.email && (
            <div className="text-red-500 text-xs mt-1">{errors.contact.email.message}</div>
          )}
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-3 mt-6">
        <button
          onClick={prev}
          className="w-full sm:w-36 bg-green-500 text-white rounded-md py-2 px-4 flex items-center justify-center gap-2"
        >
          <ChevronLeftIcon className="w-5 h-5" />
          <span>Previous</span>
        </button>
        <button
          type="submit"
          className="w-full sm:w-36 bg-green-500 text-white rounded-md py-2 px-4 flex items-center justify-center gap-2 transition-colors hover:bg-green-600"
        >
          <PlusCircleIcon className="w-5 h-5" />
          <span>Save</span>
        </button>
      </div>
    </div>
  );
};

export default Contact;
