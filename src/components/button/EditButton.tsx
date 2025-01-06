import React from 'react'
// import { Todos } from '@/types/todos'
// import { useRouter } from "next/navigation"; // next/navigation からインポート


type Props = {
  handleIsEdit: (isEditing:boolean) =>void;
  isEditing:boolean
  };

const EditButton = (props:Props) => {
  const {handleIsEdit,isEditing} = props

  return (
    <button onClick={()=>handleIsEdit(isEditing)}>編集</button>
  )
}

export default EditButton