import { useState } from 'react';

// フォーム入力を管理するカスタムフック
const useInput = (initialValue: string) => {
  const [value, setValue] = useState(initialValue);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return { value, handleChange };
};

export default useInput;
