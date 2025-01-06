"use client";
import { useParams } from 'next/navigation'; 
import { useTodos } from '@/hooks/useTodos';
import BackButton from '@/components/button/BackButton';
import EditButton from '@/components/button/EditButton';
import DeleteButton from '@/components/button/DeleteButton';
import useInput from '@/hooks/useInput';
import Input from '@/components/input/input';
import CreateButton from '@/components/button/CreateButton';

const TodoDetail = () => {

  const { id } = useParams();  // URLからIDを取得
  // idをnumberに変換
  const todoId = Number(id);
  const { todos,deleteTodo,updateTodo} = useTodos();
    // カスタムフックでフォーム入力を管理
    const { value: title, handleChange: handleChangeTitle, isEditing: isEditingTitle,handleEditing:handleEditTitle } = useInput('');
    const { value: content, handleChange: handleChangeContent,isEditing: isEditingContent,handleEditing:handleEditContent} = useInput('');
    const { value: status, handleChange: handleChangeStatus,isEditing: isEditingStatus } = useInput('未完了');



  const selectTodo = todos.filter((todo)=>
    todo.id === todoId 
  )

    // 更新処理
    const handleUpdateTitle = (event: React.FormEvent) => {
      event.preventDefault();
      updateTodo(todoId, { title, content, status });
    };
  
    const handleUpdateContent = (event: React.FormEvent) => {
      event.preventDefault();
      updateTodo(todoId, { title, content, status });
    };
  
    // const handleUpdateStatus = (event: React.FormEvent) => {
    //   event.preventDefault();
    //   updateTodo(todoId, { title, content, status });
    // };

  return (
    <div>
      <h1>アイテム詳細</h1>
      {selectTodo.map((todo)=>
      <div key={todo.id}>
      <p>ID: {todo.id}</p>
      {isEditingTitle ? (
        <form onSubmit={handleUpdateTitle}>
          <Input
            label="タイトル"
            type="text"
            name="title"
            value={title}
            onChange={handleChangeTitle}
          />
         <CreateButton>更新</CreateButton>
        </form>
      ) : (
        <div>
          <p>タイトル: {todo.title}</p>
          <EditButton handleIsEdit={handleEditTitle} isEditing={isEditingTitle} />
        </div>
      )}
      

      {isEditingContent ? (
      <form onSubmit={handleUpdateContent}>
        <Input
          label="内容"
          type="text"
          name="content"
          value={content}
          onChange={handleChangeContent}
        />
        <CreateButton>更新</CreateButton>
      </form>
    ) : (
      <div>
        <p>内容: {todo.content}</p> 
        <EditButton handleIsEdit={handleEditContent} isEditing={isEditingContent} />
      </div>
    )}



      <p>ステータス: {todo.status}</p>
            </div>
            )}
            <BackButton/>
            <DeleteButton handleDelete={deleteTodo} todo={selectTodo[0]}/>
    </div>
  );
};

export default TodoDetail;
