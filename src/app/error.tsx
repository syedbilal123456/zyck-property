// app/error.tsx
'use client';  // Mark this as a client component

import React from 'react';

// Define the props type
interface ErrorPageProps {
  error: Error;
  reset: () => void;
}

const ErrorPage: React.FC<ErrorPageProps> = ({ error, reset }) => {
  console.error('Caught error:', error);

  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1>Something went wrong!</h1>
      <p>Sorry, an error occurred on the server. Please try again later.</p>
      <button onClick={() => reset()}>Try Again</button>
    </div>
  );
};

export default ErrorPage;
