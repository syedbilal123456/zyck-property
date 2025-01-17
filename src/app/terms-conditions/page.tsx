import React from 'react'
import TermsPage from './_components/terms'

const page = () => {
  return (
    <div>

<div className="relative w-full min-h-[280px] flex items-center bg-gradient-to-r from-emerald-50 to-rose-50 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 w-full h-full">
        {/* Diamond */}
        <div className="absolute top-10 left-10 w-16 h-16 bg-emerald-200/20 rotate-45" />
        
        {/* Circle */}
        <div className="absolute top-40 right-20 w-20 h-20 rounded-full border-2 border-emerald-200/20" />
        
        {/* Dots pattern */}
        <div className="absolute bottom-10 left-1/4 w-40 h-40">
          {[...Array(16)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1.5 h-1.5 rounded-full bg-emerald-200/30"
              style={{
                top: `${Math.floor(i / 4) * 20}px`,
                left: `${(i % 4) * 20}px`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="relative w-full px-[10%] py-[3%]">
        <div className="max-w-4xl">
          <div className="text-sm text-slate-600 mb-2">
            ZYCK Property &gt; Terms & Privacy Policy
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-600 sm:leading-tight">
            Terms of Use
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-slate-600 leading-relaxed max-w-xl">
            Find the step-by-step usage criteria below and any additional conditions which may apply.
          </p>
        </div>
      </div>
      
      {/* Right side decorative elements */}
      <div className="absolute right-0 top-0 h-full w-1/3">
        <div className="relative h-full w-full">
          <div className="absolute right-10 top-20 w-32 h-32 opacity-20">
            <svg viewBox="0 0 24 24" fill="none" className="w-full h-full text-emerald-400">
              <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
            </svg>
          </div>
          <div className="absolute right-20 bottom-20 w-40 h-40 opacity-20">
            <svg viewBox="0 0 24 24" fill="none" className="w-full h-full text-emerald-400">
              <path d="M12 4v16m8-8H4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
        </div>
      </div>
    </div>

    <div className="w-full h-full mt-10">
      <div className="flex justify-center items-center w-full h-full">
        <div className="p-8 w-[80vw] bg-[#dffbee] opacity-95 rounded-lg">
          {/* Effective Date */}
          <div className="text-xl text-slate-400 mb-6">
            11th January 2022 (the "Effective Date")
          </div>

          {/* Terms Content */}
          <div className="space-y-6 text-slate-600">
            <p className="leading-relaxed">
              By using <span className="text-blue-500">www.zyckproperty.com</span> or the ZYCK Property mobile application of the online platform (collectively, the "Website"), you confirm that you have read, understood and accept these terms of use along with the privacy policy (the "Terms") as the terms which govern your access to and use of the Website and the Service and you agree to comply with them. If you do not accept or agree to comply with these Terms, you must not use this Website. Additionally, when using a portion of the Service, you agree to conform to any applicable posted guidelines for such Service, which may change or be updated from time to time at our sole discretion.
            </p>

            <p className="leading-relaxed">
              These Terms are made between ZYCK Property Media (Private) Limited ("we" "us" "our", the "Company", as applicable) and you ("you" or the "User"). The Company is part of the Dubizzle Group (formerly EMPG Group) which operates various websites including the Website.
            </p>

            <p className="leading-relaxed">
              If you are a company advertising on our Website, you will be required to enter into additional terms and conditions set out in our Advertising Agreement, however, please note that these Terms will still apply and must be read in conjunction with any other agreement you enter into with the Company.
            </p>
          </div>
        </div>
      </div>
    </div>
    <div className='p-10 '>
    <TermsPage/>
    </div>
    </div>
  )
}

export default page
