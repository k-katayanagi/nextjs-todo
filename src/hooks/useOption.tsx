import { useState } from 'react';
import { sortStatus } from '@/types/todos';
import { Todos } from '@/types/todos';
import { sortStatuses,statuses} from '@/consts/sortStatus';


// フォーム入力を管理するカスタムフック
const useOption = (initialValue:sortStatus) => {
  const [value, setValue] = useState(initialValue||"未完了"||"すべて");


const handleSet = (event: React.ChangeEvent<HTMLSelectElement>) => {
  const newValue = event.target.value   ;
  setValue(newValue);
  return newValue;
};

  return {value,handleSet};
};

export default useOption;
