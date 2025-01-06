"use client";

import DetailsButton from '@/components/button/DetailsButton'
import Link from 'next/link'


import { useTodos } from '@/hooks/useTodos';


const TodosList = () => {
  //todoリスト取得
  const { todos } = useTodos();

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div>
        <p>並び替え</p>
        <p>絞込み</p>
        <Link href={"todos/create"}> <button>作成する</button></Link>
      </div>
      <ul>
        {todos.map((todo)=>(
          <li key={todo.id}>
            <span>{todo.title}</span>
            <span>{todo.content}</span>
            <span>{todo.status}</span>
           <DetailsButton todo={todo}/>
          </li>
        ))
        }
      </ul>
    </div>
  )
}

export default TodosList
