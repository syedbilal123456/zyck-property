import React from 'react';

const Page = ({ params }: { params: { id: string } }) => {
  return (
    <div>
    
      <p>Dynamic ID: {params.id}</p>
      
    </div>
  );
};

export default Page;
