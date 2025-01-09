import React from 'react'

type Props = {

  handleEdit: {
    handleEditing: (isEditing: boolean) => void;
    handleSetTitle: (title: string) => void;
    handleSetContent: (content: string) => void;
    handleSet:(status:string)=>void;
  };
  isEditing:boolean
  children:string
  title:string
  content:string
  status:string
  className?: string;
  };

const EditButton = (props:Props) => {
  const {handleEdit,isEditing,children,title,content,status} = props
  const {handleEditing,handleSetTitle,handleSetContent,handleSet} = handleEdit

  //親コンポーネント内に関数を置いたほうがいい？
  const handlecClick = () => {
    handleEditing(isEditing)
    handleSetTitle(title)
    handleSetContent(content)
    handleSet(status)
  }

  return (
    <button
    onClick={handlecClick}
    className="px-4 py-2 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
    >{isEditing ? "キャンセル" : children }</button>
  )
}

export default EditButton