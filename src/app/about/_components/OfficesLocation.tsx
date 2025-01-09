// "use client"
// import React, { useState } from 'react';

// const OfficeLocations = () => {
//   const [activeLocation, setActiveLocation] = useState('Headquarter');

//   const locations = [
//     { id: 'Headquarter', label: 'Headquarter' },
//     { id: 'NewYork', label: 'New York Office' },
//     { id: 'California', label: 'California Office' }
//   ];

//   return (
//     <div className="max-w-6xl mx-auto p-8">
//       {/* Title */}
//       <h2 className="text-3xl font-semibold text-gray-800 mb-8">
//         Offices Location
//       </h2>

//       {/* Navigation Tabs */}
//       <div className="flex gap-4 mb-8">
//         {locations.map((location) => (
//           <button
//             key={location.id}
//             onClick={() => setActiveLocation(location.id)}
//             className={`px-4 py-2 rounded-md transition-colors ${
//               activeLocation === location.id
//                 ? 'bg-emerald-500 text-white'
//                 : 'text-gray-600 hover:bg-gray-100'
//             }`}
//           >
//             {location.label}
//           </button>
//         ))}
//       </div>

//       {/* Content Section */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//         {/* Left Column - Text Content */}
//         <div className="space-y-6">
//           <p className="text-gray-600 leading-relaxed">
//             Etiam placerat, nunc et consequat ullamcorper, risus ligula luctus nibh,
//             quis ultrices felis massa varius odio. Pellentesque feugiat mi congue
//             vehicula pellentesque. Aliquam sagittis velit tellus, cursus porttitor turpis
//             fringilla quis. Donec venenatis tincidunt sapien, at porta nisl consectetur
//             ac. Aliquam maximus lectus id neque dignissim, nec molestie magna
//             consequat. Sed convallis sem diam.
//           </p>
          
//           <div className="text-gray-600">
//             Vacancies Inquiries:{' '}
//             <a 
//               href="mailto:info@stylemixthemes.com" 
//               className="text-blue-500 hover:underline"
//             >
//               info@stylemixthemes.com
//             </a>
//           </div>
//         </div>

//         {/* Right Column - Map */}
//         <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden">
//           {/* Map Header */}
//           <div className="absolute top-0 left-0 right-0 bg-gray-700 text-white p-4 flex justify-between items-center z-10">
//             <div className="flex items-center gap-2">
//               <span>Real Estate</span>
//               <span className="text-gray-400 text-sm">★</span>
//             </div>
//             <div className="flex gap-2">
//               <button className="p-2 hover:bg-gray-600 rounded">
//                 <ShareIcon className="w-5 h-5" />
//               </button>
//               <button className="p-2 hover:bg-gray-600 rounded">
//                 <ExpandIcon className="w-5 h-5" />
//               </button>
//             </div>
//           </div>
          
//           {/* Map Placeholder */}
//           <div className="absolute inset-0 bg-gray-200">
//             <img 
//               src="/api/placeholder/800/600"
//               alt="Map location"
//               className="w-full h-full object-cover"
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// // Simple icon components
// const ShareIcon = ({ className }: { className: string }) => (
//   <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor">
//     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
//   </svg>
// );

// const ExpandIcon = ({ className }: { className: string }) => (
//   <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor">
//     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-2V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
//   </svg>
// );

// export default OfficeLocations;
"use client"
import React, { useState } from 'react';

const OfficeLocations = () => {
  const [activeLocation, setActiveLocation] = useState<'Headquarter' | 'NewYork' | 'California'>('Headquarter');

  const locationContent: { [key in 'Headquarter' | 'NewYork' | 'California']: { text: string; inquiryType: string; email: string; mapUrl: string } } = {
    Headquarter: {
      text: "Morbi mollis elit vitae elit molestie lobortis. Cras eu purus ipsum. Aliquam et ullamcorper nisl. Nam sem justo, sagittis sit amet sem at, mollis congue eros. Quisque vel mattis eros. Proin euismod massa id est finibus, rutrum ornare velit pellentesque. Ut arcu magna, interdum eget egestas eget, sagittis a libero. Donec felis tellus, vehicula at purus condimentum, hendrerit dictum odio. Vivamus et condimentum sapien.",
      inquiryType: "Press & Media Inquiries",
      email: "info@stylemixthemes.com",
      mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193595.25280814725!2d-74.11976341508278!3d40.70583158628177!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY!5e0!3m2!1sen!2sus"
    },
    NewYork: {
      text: "Donec et tincidunt eros. Nunc auctor justo eu ante laoreet malesuada. Maecenas euismod, quam in semper rhoncus, orci nunc egestas diam, nec ultrices urna turpis vel neque. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nam interdum justo sed faucibus ullamcorper. Duis ut leo vitae lacus mattis vulputate. Morbi elit felis, auctor eu tempor pretium, fringilla sed metus.",
      inquiryType: "Business Inquiries",
      email: "info@stylemixthemes.com",
      mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387193.30596552044!2d-74.25987701513004!3d40.69714941680757!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2s"
    },
    California: {
      text: "Etiam placerat, nunc et consequat ullamcorper, risus ligula luctus nibh, quis ultrices felis massa varius odio. Pellentesque feugiat mi congue vehicula pellentesque. Aliquam sagittis velit tellus, cursus porttitor turpis fringilla quis. Donec venenatis tincidunt sapien, at porta nisl consectetur ac. Aliquam maximus lectus id neque dignissim, nec molestie magna consequat. Sed convallis sem diam.",
      inquiryType: "Vacancies Inquiries",
      email: "info@stylemixthemes.com",
      mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6502594.616364798!2d-123.79641085736093!3d37.19308893317917!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808fb9fe5f285e3d%3A0x8b5109a227086f55!2sCalifornia%2C%20USA!5e0!3m2!1sen!2s"
    }
  };

  const locations: { id: 'Headquarter' | 'NewYork' | 'California'; label: string }[] = [
    { id: 'Headquarter', label: 'Headquarter' },
    { id: 'NewYork', label: 'New York Office' },
    { id: 'California', label: 'California Office' }
  ];

  return (
    <section id='offices-location'>
    <div className="max-w-6xl mx-auto p-8">
      {/* Title */}
      <h2 className="text-3xl font-semibold text-gray-100 mb-8">
        Offices Location
      </h2>

      {/* Navigation Tabs */}
      <div className="flex gap-4 mb-8">
        {locations.map((location) => (
          <button
            key={location.id}
            onClick={() => setActiveLocation(location.id)}
            className={`px-4 py-2 rounded-md transition-colors ${
              activeLocation === location.id
                ? 'bg-emerald-500 text-white'
                : 'text-gray-400 hover:bg-gray-100'
            }`}
          >
            {location.label}
          </button>
        ))}
      </div>

      {/* Content Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Column - Text Content */}
        <div className="space-y-6 flex flex-col justify-center">
          <p className="text-gray-100 leading-relaxed">
            {locationContent[activeLocation].text}
          </p>
          
          <div className="text-gray-100">
            {locationContent[activeLocation].inquiryType}:{' '}
            <a 
              href={`mailto:${locationContent[activeLocation].email}`}
              className="text-primary hover:underline"
            >
              {locationContent[activeLocation].email}
            </a>
          </div>
        </div>

        {/* Right Column - Map */}
        <div className="relative h-[400px] bg-gray-100 rounded-lg overflow-hidden">
          {/* Map Header */}
          <div className="absolute top-0 left-0 right-0 bg-gray-700 text-white p-4 flex justify-between items-center z-10">
            <div className="flex items-center gap-2">
              <span>Real Estate</span>
              <span className="text-gray-400 text-sm">★</span>
            </div>
            <div className="flex gap-2">
              <button className="p-2 hover:bg-gray-600 rounded">
                <ShareIcon className="w-5 h-5" />
              </button>
              <button className="p-2 hover:bg-gray-600 rounded">
                <ExpandIcon className="w-5 h-5" />
              </button>
            </div>
          </div>
          
          {/* Map Iframe */}
          <iframe
            src={locationContent[activeLocation].mapUrl}
            className="absolute inset-0 w-full h-full border-0"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
    </section>
  );
};

// Simple icon components
const ShareIcon = ({ className }: { className: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
  </svg>
);

const ExpandIcon = ({ className }: { className : string}) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-2V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
  </svg>
);

export default OfficeLocations;