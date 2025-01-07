import { useState } from 'react';



// フォーム入力を管理するカスタムフック
const useOption = (initialValue: string) => {
  const [value, setValue] = useState(initialValue||"未完了"||"すべて");
//   const [isEditing,setIsEditing] = useState(false)

  const sortStatuses:string[] = [
    "すべて",
    "未完了",
    "進行中",
    "完了"
]

const statuses:string[] = [
    "未完了",
    "進行中",
    "完了"
]


  const handleSet = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setValue(event.target.value);
  };

//   const handleReset = () => {
//     setValue('');
//   };

//   const handleSet = (todo:string) => {
//     setValue(todo);
//   };

//   const handleEditing = (isEditing:boolean) => {
//     setIsEditing(!isEditing);
//   };



  return {sortStatuses,statuses,value,handleSet};
};

export default useOption;
