import React from "react";
import Image from "next/image";
import { MdRealEstateAgent } from "react-icons/md";// Import Button from shadcn/ui

const PartnersSection = () => {
  return (
    <section>
        {/* headersection */}
        <div className="bg-primary text-foreground flex items-center justify-around p-5 md:p-10 ">
         <div className="flex  gap-2 items-center">
            <MdRealEstateAgent size={30}  className=""/> 
            <h1 className="lg:text-3xl md:text-2xl text-xl font-bold  ">Become A Real Estate Agent</h1>
            </div> 
            <button className=" py-4 px-8 border border-black hover:bg-foreground hover:text-black">
            

                Register Now
                
                </button>   
    
        </div>

        {/* partner section */}
        <div className="bg-black text-foreground p-10 md:py-20 mx-auto">
        <h1 className="lg:text-4xl md:text-2xl text-xl font-bold text-center  ">Our Partners</h1>
         <div className=" p-5 w-3/4 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 md:py-10">
         <Image
              src="/logo.png"
              alt="Real Estate Experts"
              width={120}
              height={50}
              className="object-contain"
            />
         <Image
              src="/logo.png"
              alt="Real Estate Experts"
              width={120}
              height={50}
              className="object-contain"
            />
         <Image
              src="/logo.png"
              alt="Real Estate Experts"
              width={120}
              height={50}
              className="object-contain"
            />
         <Image
              src="/logo.png"
              alt="Real Estate Experts"
              width={120}
              height={50}
              className="object-contain"
            />
         </div>

        </div>
     
    </section>
  );
};

export default PartnersSection;
