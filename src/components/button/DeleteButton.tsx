import React from 'react'
import { Todos } from '@/types/todos'
// import { useRouter } from "next/navigation"; // next/navigation からインポート

type Props = {
    handleDelete: (todo:Todos,isDelete:boolean) => void;
    todo:Todos
    isDelete:boolean
    className?: string;
  };

const DeleteButton = (Props:Props) => {
    const {handleDelete,todo,isDelete} = Props

    return (
        <button 
        onClick={()=>handleDelete(todo,isDelete)} 
        className="px-4 py-2 bg-gray-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300">削除</button>
    )
}

export default DeleteButton