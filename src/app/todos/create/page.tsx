"use client";

import CreateButton from '@/components/button/CreateButton';
// import DetailsButton from '@/components/button/DetailsButton'
// import CreateButton from '@/components/button/CreateButton'
// import Link from 'next/link'
// import { getTodos } from '../api/supabase/todos/route'
import useInput from '@/hooks/useInput';


const CreateTodos = () => {


    // カスタムフックでフォーム入力を管理
    const { value: addTitle, handleChange: handleChangeTitle } = useInput('');
    const { value: addContent, handleChange: handleChangeContent } = useInput('');
    const { value: addStatus, handleChange: handleChangeStatus } = useInput('未完了');

  // const addTodo:Omit<Todos, 'id' | 'created_at'> = {
  //   title:addTitle,
  //   content:addContent,
  //   status:addStatus
  // }

  const handleAddTodo = (event: React.FormEvent) => {
    event.preventDefault(); // フォームのデフォルト動作（ページのリロード）を防ぐ
    console.log('Todo added:', { addTitle, addContent, addStatus });
  };


  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <form onSubmit={handleAddTodo}>
        <label>
          タイトル
          <input 
            type="text"
            name="title" 
            value={addTitle}
            onChange={handleChangeTitle}
          />
        </label>
        <label>
          内容
          <input 
            type="text"
            name="content" 
            value={addContent}
            onChange={handleChangeContent}
          />
        </label>
        <span>{addStatus}</span>
        <CreateButton/>
      </form>
    </div>
  );
}

export default CreateTodos
