import { useState } from 'react';


const useOption = (initialValue:string) => {
  const [value, setValue] = useState<string>(initialValue);


const handleSet = (event:string) => {
  setValue(event);
  return event;
};

  return {value,handleSet};
};

export default useOption;
