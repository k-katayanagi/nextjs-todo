import React from 'react'
import { Todos } from '@/types/todos'
// import { useRouter } from "next/navigation"; // next/navigation からインポート

type Props = {
    handleDelete: (todo:Todos) => void;
    todo:Todos
  };

const DeleteButton = (Props:Props) => {
    const {handleDelete,todo} = Props

    return (
        <button onClick={()=>handleDelete(todo)} >削除</button>
    )
}

export default DeleteButton