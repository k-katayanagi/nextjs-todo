import React, { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  className?: string;
}

const CreateButton = (props:Props) => {
  const {children,className} = props
  return (
    <button
    type="submit"
    className={`px-4 py-2 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 ${className}`}>
      {children}
    </button >
  );
};

export default CreateButton;
