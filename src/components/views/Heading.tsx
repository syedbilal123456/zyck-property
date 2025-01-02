import React from 'react';

interface Props {
  title: string;
}

const Heading = ({ title }: Props) => {
  return (
    <div className="px-6 py-12 sm:px-10 sm:py-16">
      <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold ">
        {title}
      </h1>
    </div>
  );
};

export default Heading;
