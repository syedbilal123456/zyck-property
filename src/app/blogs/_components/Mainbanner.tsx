import Image from 'next/image';
import React from 'react';

const Mainbanner = () => {
    return (
        <div className="mt-5">
            <div className="w-[80vw] h-auto rounded-md mx-auto relative overflow-hidden group">
                {/* Background Image */}
                <Image
                    src={'/Grand-Orchard_Blog-Cover.jpg'}
                    width={9000}
                    height={900}
                    alt="Main_Banner"
                    className="w-full h-full object-cover"
                />

                {/* Overlay */}
                <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-70 group-hover:bg-opacity-10 transition-all duration-300 flex flex-col justify-center items-center text-white p-6">
                    {/* Logo Section */}
                    <div className="absolute top-8 left-8 group-hover:opacity-10 transition-all duration-300">
                        <h1 className="text-3xl font-bold">Grand Orchard</h1>
                        <p className="text-sm font-light">Mall & Luxury Apartments</p>
                    </div>

                    {/* Main Content */}
                    <div className="text-center group-hover:opacity-60 transition-all duration-300">
                        <h1 className="text-4xl font-extrabold mb-4">
                            Grand Orchard in DHA Islamabad – A Goldmine for Investors
                        </h1>
                        <p className="text-lg mb-6">
                            Residential & Serviced Apartments | Commercial Outlets
                        </p>

                        {/* Buttons */}
                        <div className="flex gap-4">
                            <button className="bg-yellow-500 text-black px-6 py-2 rounded-md font-semibold hover:bg-yellow-600">
                                Read More
                            </button>
                            <button className="bg-transparent border border-white px-6 py-2 rounded-md font-semibold hover:bg-white hover:text-black">
                                Contact Us
                            </button>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="absolute bottom-8 left-8 text-sm group-hover:opacity-40 transition-all duration-300">
                        <p>3 Min Read | Samra Zulfiqar | January 13, 2025</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Mainbanner;
