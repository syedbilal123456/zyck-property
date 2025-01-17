"use client";
import React, { JSX, useState } from "react";
import { Menu, X } from "lucide-react";

type ContentType = {
  [key: string]: JSX.Element;
};

type NavigationItem = {
  id: string;
  icon: string;
  title: string;
};

const TermsPage = () => {
  const [activeSection, setActiveSection] = useState<string>("1");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const navigationItems: NavigationItem[] = [
    { id: "1", icon: "📋", title: "Definitions" },
    { id: "2", icon: "👥", title: "General Terms" },
    { id: "3", icon: "💰", title: "Paid Postings" },
    { id: "4", icon: "🎭", title: "Posting Agents" },
    { id: "5", icon: "✉️", title: "No Spam Policy" },
    { id: "6", icon: "⚖️", title: "Limitation of Liability" },
    { id: "7", icon: "🛡️", title: "Indemnity" },
    { id: "8", icon: "🏠", title: "Property" },
    { id: "9", icon: "📞", title: "Call Recordings/Brokers" },
    { id: "10", icon: "📱", title: "Ad Services Package" },
    { id: "11", icon: "📄", title: "General" },
  ];

  const content: ContentType = {
    "1": (
      <div className="space-y-6">
        <h2 className="text-xl md:text-2xl font-bold mb-4 text-green-500">1. DEFINITIONS</h2>
        <p className="text-sm md:text-base text-gray-700 mb-4">
          The following capitalized terms shall have the following meaning, except where the context otherwise requires:
        </p>
        <div className="space-y-4">
          <div>
            <p className="text-sm md:text-base font-semibold text-slate-500">1.1. "Advertising Agreement"</p>
            <p className="text-sm md:text-base ml-4 md:ml-6 text-slate-500">
              – an agreement for the provision of advertising services or products entered into between the Company and
              the Client.
            </p>
          </div>
          {/* Other content sections remain the same */}
        </div>
      </div>
    ),
    "2": (
      <div>
        <h2 className="text-xl md:text-2xl font-bold mb-4 text-green-500">2. GENERAL TERMS</h2>
        <p className="text-sm md:text-base text-slate-500">Content for General Terms section...</p>
      </div>
    ),
    // Other content sections...
  };

  return (
    <div className="lg:flex sm:relative min-h-[90vh] rounded-lg">

      {/* Mobile Header */}
      <div className="bg-green-300 shadow-md rounded-lg md:hidden">
        <div className="flex items-center justify-between p-4">
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 rounded-lg text-green-500">
            {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <h1 className="text-lg font-semibold text-slate-700 mx-6">Terms & Conditions</h1>
        </div>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed top-2 lg:left-2 left-0 rounded-lg z-40 h-full w-[80%] max-w-[300px] bg-slate-900 transition-transform duration-300 ease-in-out
          md:relative md:translate-x-0 md:w-1/4 md:max-w-none
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="h-full overflow-y-auto p-4">
          {navigationItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveSection(item.id);
                setIsSidebarOpen(false);
              }}
              className={`w-full flex items-center p-3 mb-2 rounded-lg transition-colors text-left ${
                activeSection === item.id ? "bg-green-500 text-green-bg-green-300" : "hover:bg-green-500 text-slate-100"
              }`}
            >
              <span className="mr-3">{item.icon}</span>
              <span className="text-sm md:text-base">{item.title}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Overlay for Mobile */}
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-30 md:hidden" onClick={() => setIsSidebarOpen(false)} ></div> 
      )}

      {/* Main Content */}
      <main className="p-4 md:p-8 md:ml-1/4 w-full">
        <div className="bg-[#dffbee] opacity-95 rounded-lg shadow-sm p-4 md:p-8">
          {content[activeSection] || (
            <div>
              <h2 className="text-xl md:text-2xl text-green-500 font-bold mb-4">Content Coming Soon</h2>
              <p className="text-sm md:text-base text-slate-500">This section is under development.</p>
            </div>
          )}
        </div>
      </main>
        </div>
  );
};

export default TermsPage;
