import { useState } from 'react';
import { sortStatus } from '@/types/todos';

// フォーム入力を管理するカスタムフック
const useOption = (initialValue:sortStatus) => {
  const [value, setValue] = useState(initialValue||"未完了"||"すべて");

  const sortStatuses: sortStatus[] = initialValue === "すべて"
  ? ["すべて", "未完了", "進行中", "完了"]
  : ["未完了", "進行中", "完了"];

//   const sortStatuses:string[] = [
//     "すべて",
//     "未完了",
//     "進行中",
//     "完了"
// ]

// const statuses:string[] = [
//     "未完了",
//     "進行中",
//     "完了"
// ]

const handleSet = (event: React.ChangeEvent<HTMLSelectElement>) => {
  const newValue = event.target.value as sortStatus;
  setValue(newValue);
  return newValue;
};

  return {sortStatuses,statuses,value,handleSet};
};

export default useOption;
