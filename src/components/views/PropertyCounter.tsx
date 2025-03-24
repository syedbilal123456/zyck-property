"use client"
import { useState, useEffect, useRef } from 'react';

interface Props {
  initialCounts: {
     sellProperties: string,
     rentProperties: string,
     projects: string,
     agents: string,
     agencies: string
  }
}

const PropertyCounters = ({ initialCounts }: Props) => {
  // Convert string values to numbers for animation (removing any '+' sign)
  const getNumericValue = (value: string) => {
    return parseInt(value.replace(/\+/g, ''), 10);
  };

  // Set up display state (what's actually shown)
  const [displayCounts, setDisplayCounts] = useState({
    sellProperties: '0',
    rentProperties: '0',
    projects: '0',
    agents: '0',
    agencies: '0'
  });

  // Store target values (what we're counting up to)
  const targetCounts = useRef({
    sellProperties: initialCounts?.sellProperties || '100+',
    rentProperties: initialCounts?.rentProperties || '100+',
    projects: initialCounts?.projects || '100+',
    agents: initialCounts?.agents || '100+',
    agencies: initialCounts?.agencies || '100+'
  });

  // Track if animation has completed
  const [animationComplete, setAnimationComplete] = useState(false);

  useEffect(() => {
    // Only run the animation once
    if (animationComplete) return;

    const hasPlus = Object.values(targetCounts.current).some(value => value.includes('+'));
    const duration = 2000; // Animation duration in ms
    const steps = 50; // Number of steps for animation
    const interval = duration / steps;

    // Get start time for the animation
    const startTime = Date.now();

    const timer = setInterval(() => {
      const elapsedTime = Date.now() - startTime;
      const progress = Math.min(elapsedTime / duration, 1); // Value between 0-1

      // Update each counter based on animation progress
      const newCounts = Object.entries(targetCounts.current).reduce((acc, [key, targetValue]) => {
        const isPlus = targetValue.includes('+');
        const target = getNumericValue(targetValue);
        const current = Math.round(target * progress);
        
        // Add plus sign back if original had it
        acc[key as keyof typeof displayCounts] = isPlus ? `${current}+` : `${current}`;
        return acc;
      }, {} as typeof displayCounts);

      setDisplayCounts(newCounts) ;

      // End animation when complete
      if (progress >= 1) {
        clearInterval(timer);
        setAnimationComplete(true);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [animationComplete]);

  return (
    <div className="flex flex-wrap justify-center gap-5 bg-transparent py-10 px-5">
      <div className="bg-white rounded-lg shadow-md p-6 text-center w-44 transition-transform duration-300 hover:-translate-y-1">
        <div className="text-3xl text-gray-800 mb-4">🏠</div>
        <div className="text-4xl font-bold text-blue-500 mb-2">{displayCounts.sellProperties}</div>
        <div className="text-sm text-gray-500 uppercase tracking-wider">Properties For Sale</div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6 text-center w-44 transition-transform duration-300 hover:-translate-y-1">
        <div className="text-3xl text-gray-800 mb-4">🔑</div>
        <div className="text-4xl font-bold text-blue-500 mb-2">{displayCounts.rentProperties}</div>
        <div className="text-sm text-gray-500 uppercase tracking-wider">Properties For Rent</div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6 text-center w-44 transition-transform duration-300 hover:-translate-y-1">
        <div className="text-3xl text-gray-800 mb-4">🏗️</div>
        <div className="text-4xl font-bold text-blue-500 mb-2">{displayCounts.projects}</div>
        <div className="text-sm text-gray-500 uppercase tracking-wider">Projects</div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6 text-center w-44 transition-transform duration-300 hover:-translate-y-1">
        <div className="text-3xl text-gray-800 mb-4">👤</div>
        <div className="text-4xl font-bold text-blue-500 mb-2">{displayCounts.agents}</div>
        <div className="text-sm text-gray-500 uppercase tracking-wider">Property Agents</div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6 text-center w-44 transition-transform duration-300 hover:-translate-y-1">
        <div className="text-3xl text-gray-800 mb-4">🏢</div>
        <div className="text-4xl font-bold text-blue-500 mb-2">{displayCounts.agencies}</div>
        <div className="text-sm text-gray-500 uppercase tracking-wider">Property Agencies</div>
      </div>
    </div>
  );
};

export default PropertyCounters;