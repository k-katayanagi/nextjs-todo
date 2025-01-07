import React from 'react'

type Props = {

  handleEdit: {
    handleEditing: (isEditing: boolean) => void;
    handleSetTitle: (title: string) => void;
    handleSetContent: (content: string) => void;
  };
  isEditing:boolean
  children:string
  title:string
  content:string
  };

const EditButton = (props:Props) => {
  const {handleEdit,isEditing,children,title,content} = props
  const {handleEditing,handleSetTitle,handleSetContent} = handleEdit

  //親コンポーネント内に関数を置いたほうがいい？
  const handlecClick = () => {
    handleEditing(isEditing)
    handleSetTitle(title)
    handleSetContent(content)
  }

  return (
    <button onClick={handlecClick}>{isEditing ? "キャンセル" : children }</button>
  )
}

export default EditButton