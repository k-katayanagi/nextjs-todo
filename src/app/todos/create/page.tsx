"use client";

import CreateButton from '@/components/button/CreateButton';
import useInput from '@/hooks/useInput';
import { useTodos } from '@/hooks/useTodos';
import BackButton from '@/components/button/BackButton';
import Input from '@/components/input/input';


const CreateTodos = () => {


    // カスタムフックでフォーム入力を管理
    const { value: title, handleChange: handleChangeTitle} = useInput('');
    const { value: content, handleChange: handleChangeContent} = useInput('');
    const { value: status, handleChange:handleChangeStatus} = useInput('未完了');
    const { addTodo } = useTodos();


  const handleAddTodo = (event: React.FormEvent) => {
    event.preventDefault(); // フォームのデフォルト動作（ページのリロード）を防ぐ
    addTodo({title, content})
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <form onSubmit={handleAddTodo}>
        <Input
          label='タイトル'
          type="text"
          name="title"
          value={title}
          onChange={handleChangeTitle}
          />
        <Input
          label='内容'
          type="text"
          name="title"
          value={content}
          onChange={handleChangeContent}
          />
        <span>{status}</span>
        <CreateButton>追加</CreateButton>
      </form>
      <BackButton/>
    </div>
  );
}

export default CreateTodos
