import React from 'react'

const Breadcrumb = () => {
    return (
        <div>
            <div className="relative w-full min-h-[280px] flex items-center bg-gradient-to-r from-green-50 to-rose-50 overflow-hidden">
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
                            ZYCK Property &gt; Blogs
                        </div>
                        <h1 className="text-4xl sm:text-5xl font-bold text-slate-600 sm:leading-tight">
                            Blogs
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
                            <svg viewBox="0 0 24 24" fill="none" className="w-full h-full text-emerald-900">
                                <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                            </svg>
                        </div>
                        <div className="absolute right-20 bottom-20 w-40 h-40 opacity-20">
                            <svg viewBox="0 0 24 24" fill="none" className="w-full h-full text-green-900">
                                <path d="M12 4v16m8-8H4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Breadcrumb
