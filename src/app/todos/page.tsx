"use client";

import DetailsButton from '@/components/button/DetailsButton'
import Link from 'next/link'
import SortStatesOption from '@/components/option/SortStatesOption';
import useOption from '@/hooks/useOption';
import { useTodos } from '@/hooks/useTodos';

const TodosList = () => {
  //todoリスト取得
  const { todos } = useTodos();
  const {value,sortStatuses,handleSortTodo} = useOption('すべて');

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div>
        <p>並び替え</p>
        <p>絞込み</p>
        <SortStatesOption statuses={sortStatuses} selectStatus={value}/>
        <Link href={"todos/create"}> <button>作成する</button></Link>
      </div>
      <ul>
        {todos.map((todo)=>(
          <li key={todo.id}>
            <span>タイトル：{todo.title}</span>
            <span>内容：{todo.content}</span>
            <span>ステータス：{todo.status}</span>
           <DetailsButton todo={todo}/>
          </li>
        ))
        }
      </ul>
    </div>
  )
}

export default TodosList
