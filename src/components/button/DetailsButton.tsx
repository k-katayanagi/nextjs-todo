import React from 'react'
import { Todos } from '@/types/todos'
import { useRouter } from "next/navigation"; // next/navigation からインポート

type Props = {
  todo: Todos;
  };

const DetailsButton = (props:Props) => {
  const {todo} = props
  const router = useRouter();
  const handleClick = (id:number) => {
    // アイテムのIDをURLに追加して遷移
    router.push(`todos/item/${id}`);
  };
  return (
    <button onClick={() => handleClick(todo.id)}>詳細</button>
  )
}

export default DetailsButton
