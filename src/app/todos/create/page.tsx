"use client";

import CreateButton from '@/components/button/CreateButton';
import useInput from '@/hooks/useInput';
import { useTodos } from '@/hooks/useTodos';
import BackButton from '@/components/button/BackButton';
import Input from '@/components/input/Input';
import SortStatesOption from '@/components/option/SortStatesOption';
import useOption from '@/hooks/useOption';
import { statuses } from '@/consts/sortStatus';


const CreateTodos = () => {

    // カスタムフックでフォーム入力を管理
    const { value: title, handleChange: handleChangeTitle,handleReset:handleResetTitle} = useInput('');
    const { value: content, handleChange: handleChangeContent,handleReset:handleResetContent} = useInput('');
    const {value:status,handleSet} = useOption('0:未完了');
    const { addTodo,isCompleted } = useTodos();



  const handleAddTodo = (event: React.FormEvent) => {
    event.preventDefault(); // フォームのデフォルト動作（ページのリロード）を防ぐ
    addTodo({title, content,status})
    handleResetTitle()
    handleResetContent()
  };

  return (
    <div className="grid items-center justify-items-center p-8 pb-10 gap-8 sm:gap-4 sm:p-10 font-[family-name:var(--font-geist-sans)]">
      {isCompleted &&
        <div className="text-red-500 text-center font-semibold mb-4">
          追加しました
        </div>
      }
      <form onSubmit={handleAddTodo} className="flex gap-4 items-center">
        <Input
          label='タイトル'
          type="text"
          name="title"
          value={title}
          onChange={handleChangeTitle}
          className="mb-4 flex-grow" 
          />
        <Input
          label='内容'
          type="text"
          name="title"
          value={content}
          onChange={handleChangeContent}
          className="mb-4 flex-grow" 
          />
        <div className="flex gap-4 items-center">
          <SortStatesOption 
            statuses={statuses} 
            selectStatus={status} 
            onChange={handleSet}
            className="mb-4 flex-grow"
            />
          <CreateButton
            className="mb-4" >
              追加
            </CreateButton>
        </div>
      </form>
      <BackButton/>
    </div>
  );
}

export default CreateTodos
