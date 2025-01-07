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

const TodoDetail = () => {
  const { id } = useParams();  // URLからIDを取得
  const todoId = Number(id);
  const { value: title, handleChange: handleChangeTitle,handleReset:handleResetTitle,handleSet:handleSetTitle} = useInput('');
  const { value: content, handleChange: handleChangeContent,handleReset:handleResetContent, handleSet:handleSetContent} = useInput('');
  const { isEditing, handleEditing} = useInput('');
  const { todos, deleteTodo, updateTodo,isCompleted } = useTodos();
  const selectTodo = todos.filter((todo) => todo.id === todoId);
  const {value:status,statuses,handleSet} = useOption(selectTodo[0]?.status||'未完了');


  const handleUpdate = (event: React.FormEvent) => {
    event.preventDefault();
    updateTodo(todoId, { title, content, status });
    handleResetTitle();
    handleResetContent();
  };

  return (
    <div>
      <h1>アイテム詳細</h1>
      {isCompleted ? "更新しました":""}
      {selectTodo.map((todo) => (
        <div key={todo.id}>
          <p>ID: {todo.id}</p>
          <form onSubmit={handleUpdate}>
            {isEditing ? (
              <>
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
                <SortStatesOption statuses={statuses} selectStatus={status}  onChange={handleSet}/>
                <CreateButton>更新</CreateButton>
              </>
            ) : (
              <div>
                <p>タイトル: {todo.title}</p>
                <p>内容: {todo.content}</p>
                <p>ステータス: {todo.status}</p>
              </div>
            )}
          </form>
          <BackButton />
          <EditButton
          handleEdit={{
              handleEditing: handleEditing,
              handleSetTitle: handleSetTitle,
              handleSetContent: handleSetContent,
              }}
              isEditing={isEditing}
              title={selectTodo[0].title}
              content={selectTodo[0].content}>編集</EditButton>
          <DeleteButton handleDelete={deleteTodo} todo={selectTodo[0]} />
        </div>
      ))}
    </div>
  );
};

export default TodoDetail;
