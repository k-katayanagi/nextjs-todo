import { useState } from 'react';

// フォーム入力を管理するカスタムフック
const useInput = (initialValue: string) => {
  const [value, setValue] = useState(initialValue);
  const [isEditing,setIsEditing] = useState(false)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleEditing = () => {
    setIsEditing(!isEditing);
  };


  return { value, handleChange,isEditing,handleEditing};
};

export default useInput;
