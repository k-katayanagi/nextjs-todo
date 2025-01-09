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
    <button 
    onClick={() => handleClick(todo.id)}
    className="px-4 py-2 bg-yellow-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
    >詳細
    </button>
  )
}

export default DetailsButton
