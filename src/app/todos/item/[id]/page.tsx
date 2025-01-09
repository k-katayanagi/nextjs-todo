"use client";
import { useParams } from 'next/navigation'; 
import { useTodos } from '@/hooks/useTodos';
import BackButton from '@/components/button/BackButton';
import EditButton from '@/components/button/EditButton';
import DeleteButton from '@/components/button/DeleteButton';
import useInput from '@/hooks/useInput';
import Input from '@/components/input/Input';
import CreateButton from '@/components/button/CreateButton';
import SortStatesOption from '@/components/option/SortStatesOption';
import useOption from '@/hooks/useOption';
import { statuses } from '@/consts/sortStatus';
import { Todos } from '@/types/todos'
import { useEffect } from 'react';

const TodoDetail = () => {
  const { id } = useParams();  // URLからIDを取得
  const todoId = Number(id);
  const { value: title, handleChange: handleChangeTitle,handleSet:handleSetTitle} = useInput('');
  const { value: content, handleChange: handleChangeContent,handleSet:handleSetContent} = useInput('');
  const { isEditing, handleEditing} = useInput('');
  const { todos, deleteTodo, updateTodo,isCompleted,isDelete,ToggleDelete } = useTodos();
  const selectTodo = todos.filter((todo) => todo.id === todoId);
  const {value:status,handleSet} = useOption(selectTodo[0]?.status||'0:未完了');


  const handleUpdate = (event: React.FormEvent) => {
    event.preventDefault();
    updateTodo(todoId, { title, content, status });
    handleSetTitle(title);
    handleSetContent(content);
  };

  const handleDelete = (todo:Todos,isDelete:boolean) =>{
    ToggleDelete(true)
    const userConfirmed = window.confirm('削除しますか？');
     if (userConfirmed) {
      deleteTodo(todo); // ユーザーが「OK」をクリックした場合に削除処理を実行
    } else {
      ToggleDelete(false)
      console.log('削除がキャンセルされました。'); // ユーザーが「キャンセル」をクリックした場合
    }
  }


return (
  <div className="grid items-center justify-items-center p-8 pb-10 gap-8 sm:gap-4 sm:p-10 font-[family-name:var(--font-geist-sans)]">
    <h1>アイテム詳細</h1>
    {isCompleted &&
      <div className="text-red-500 text-center font-semibold mb-4">
        更新しました
      </div>}
    {selectTodo.length > 0 && selectTodo.map((todo) => {
      const [, statusName] = todo.status.split(":");

      return (
        <div key={todo.id}>
          <form onSubmit={handleUpdate}>
            {isEditing ? (
              <div className="flex flex-col items-center p-4 border border-gray-300 rounded-lg shadow-md hover:bg-gray-100 w-full sm:w-auto justify-between">
                <div className="mb-1">
                  <span>ID: {todo.id}</span>
                </div>
                <div className="flex gap-4 mb-2">
                  <Input
                    label="タイトル"
                    type="text"
                    name="title"
                    value={title}
                    onChange={handleChangeTitle}
                  />
                  <Input
                    label="内容"
                    type="text"
                    name="content"
                    value={content}
                    onChange={handleChangeContent}
                  />
                  <SortStatesOption  statuses={statuses} selectStatus={status} onChange={handleSet} />
                  <CreateButton>更新</CreateButton>
                </div>
              </div>

            ) : (
              <div  className="flex flex-col items-center p-4 border border-gray-300 rounded-lg shadow-md hover:bg-gray-100 w-full sm:w-auto justify-between h-[200px]" >
                <div className="mb-2">
                  <span>ID: {todo.id}</span>
                </div>
                <div className="mb-2">
                  <span>タイトル: {todo.title}</span>
                </div>
                <div className="mb-2">
                  <span>内容: {todo.content}</span>
                </div>
                <div className="mb-2">
                  <span>ステータス: {statusName}</span>
                </div>
              </div>
            )}
          </form>
          <div className="mt-4 flex justify-center gap-4">
            <BackButton />
            <EditButton
              handleEdit={{
                handleEditing: handleEditing,
                handleSetTitle: handleSetTitle,
                handleSetContent: handleSetContent,
                handleSet:handleSet,
              }}
              isEditing={isEditing}
              title={selectTodo[0].title}
              content={selectTodo[0].content}
              status={selectTodo[0].status}
            >
              編集
            </EditButton>
            {isEditing && (<DeleteButton handleDelete={handleDelete} todo={selectTodo[0]} isDelete={isDelete}/>)}
          </div>
        </div>
      );
    })}
  </div>
);
};

export default TodoDetail;
