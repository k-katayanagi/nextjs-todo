"use client";

import React, { useEffect, useState } from 'react'
import DetailsButton from '@/components/button/DetailsButton'
import Link from 'next/link'
import { getTodos } from '../api/supabase/todos/route'
import { Todos } from '@/types/todos'

const TodosList = () => {
  const [todos,setTodos] = useState<Todos[]>([])

  useEffect(()=>{

    const fetchTodos = async () => {
      try {
        const todos = await getTodos(); // getTodos の結果を取得
        setTodos(todos)
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    };
    fetchTodos()

  },[])

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
            <Link href={"todos"}><DetailsButton/></Link>
          </li>
        ))
        }
      </ul>
    </div>
  )
}

export default TodosList
