import React from 'react';
import { IoDocumentsSharp, IoHomeOutline } from "react-icons/io5";
import { FaCalculator } from 'react-icons/fa';
import { BsPersonSquare } from "react-icons/bs";
const ChooseUs = () => {
  return (
    <div className='p-10 md:py-20 bg-foreground text-background'>
        <h1 className='text-2xl text-center  md:text-3xl lg:text-4xl font-bold '>Why Choose Us?</h1>
      <div className="mx-auto grid grid-cols-1 lg:grid-cols-3 gap-5  mt-10 max-w-7xl">
        {/* Section 1 */}
        <div className="border-t-2 border-primary p-8 sm:p-10 w-full flex gap-2    hover:bg-primary  hover:bg-opacity-50">
        <BsPersonSquare size={30} className='w-36'/>
        <div>

          <h1 className="mb-3 text-xl md:text-2xl font-semibold">
          Trusted by Thousands
          </h1>
          <p className="text-sm md:text-base leading-relaxed">
          10 new offers every day. 350 offers on site, trusted by a community of thousands of users.
          </p>
        </div>
        </div>

        {/* Section 2 */}
        <div className="border-t-2 border-primary p-8 sm:p-10 flex gap-2  w-full   hover:bg-primary  hover:bg-opacity-50">
        <IoDocumentsSharp size={30}  className='w-36'/>
         <div>
         <h1 className="mb-3 text-xl md:text-2xl font-semibold">
            Wide Range of Properties
          </h1>
          <p className="text-sm md:text-base leading-relaxed">
          With a robust selection of popular properties on hand, as well as leading properties from real estate experts.
          </p>
         </div>
        </div>
        <div className="border-t-2 border-primary p-8 sm:p-10 flex gap-2  w-full  hover:bg-primary hover:bg-opacity-50">
        <FaCalculator size={30}  className='w-36'/>
         <div>
         <h1 className="mb-3 text-xl md:text-2xl font-semibold">
          Financing Made Easy
          </h1>
          <p className="text-sm md:text-base leading-relaxed">
          Our stress-free finance department that can find financial solutions to save you money.          </p>
         </div>
        </div>
      </div>
    </div>
  );
};

export default ChooseUs;
