import React, { ReactNode } from 'react';

interface Props {
  children: ReactNode; 
}

const CreateButton = (props:Props) => {
  const {children} = props
  return (
    <button type="submit">
      {children}
    </button>
  );
};

export default CreateButton;
