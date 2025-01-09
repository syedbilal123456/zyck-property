import React from 'react';
import { IoHomeOutline } from "react-icons/io5";
import { HiOutlineMagnifyingGlass } from "react-icons/hi2";
const Heroend = () => {
  return (
    <div
      className="bg-cover bg-center"
      style={{ backgroundImage: "url(/bg.jpg)" }}
    >
      <div className="mx-auto flex flex-wrap justify-evenly gap-5 p-5 md:py-20 mt-10 max-w-7xl">
        {/* Section 1 */}
        <div className="bg-blue-900 bg-opacity-90 p-8 sm:p-10 w-full md:w-5/12 flex gap-2  text-white ">
        <HiOutlineMagnifyingGlass size={30} className='w-36'/>
        <div>

          <h1 className="mb-3 text-xl md:text-2xl font-semibold">
            Looking for a New Home?
          </h1>
          <p className="text-sm md:text-base leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam
            totam nam commodi facere consequuntur praesentium.
          </p>
        </div>
        </div>

        {/* Section 2 */}
        <div className="bg-blue-900 bg-opacity-90 p-8 sm:p-10 flex gap-2  w-full md:w-5/12  text-white ">
        <IoHomeOutline size={30}  className='w-36'/>
         <div>
         <h1 className="mb-3 text-xl md:text-2xl font-semibold">
            Want to Sell Your Home?
          </h1>
          <p className="text-sm md:text-base leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam
            totam nam commodi facere consequuntur praesentium.
          </p>
         </div>
        </div>
      </div>
    </div>
  );
};

export default Heroend;
