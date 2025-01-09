import { useState } from 'react';

// フォーム入力を管理するカスタムフック
const useOption = (initialValue:string) => {
  const [value, setValue] = useState(initialValue);


const handleSet = (event:string) => {
  setValue(event);
  return event;
};

  return {value,handleSet};
};

export default useOption;
