"use client";

import { useState, useEffect } from 'react';
import { getTodos,addTodos,deleteTodos,updateTodos } from '@/app/api/supabase/todos/route';
import { useRouter } from "next/navigation"; // next/navigation からインポート
import { Todos } from '@/types/todos'

export const useTodos = () => {
  const [todos, setTodos] = useState<Todos[]>([]);
  const [sortTodos, setSortTodos] = useState<Todos[]>([]);

  const [isCompleted,SetIsCompleted] = useState<boolean>(false)
  const router = useRouter();

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const fetchedTodos = await getTodos();
        setTodos(fetchedTodos);
        setSortTodos(fetchedTodos);
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    };
    fetchTodos();
  }, []);

  const handleChangeComplete = () =>{
    SetIsCompleted(true);
    setTimeout(() => {
      SetIsCompleted(false);
    }, 1000);
  }

  const addTodo = async (newTodo: Omit<Todos, 'id' |'created_at'>) => {
    try {
      const addedTodo = await addTodos(newTodo);
      setTodos(prevTodos => [...prevTodos, addedTodo]); // 新しいTODOをリストに追加
      handleChangeComplete()
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };


  const updateTodo = async (id: number, updatedData: { title: string; content: string; status: string }) => {
    try {
      const updatedTodo = await updateTodos(id,updatedData);
      setTodos((prevTodos) => prevTodos.map(todo => todo.id === updatedTodo.id ? updatedTodo : todo)); // 新しいTODOに置き換え
      handleChangeComplete()
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  const deleteTodo = async (deleteTodo:Todos) => {
    try {
      const deletedTodo = await deleteTodos(deleteTodo.id);
      setTodos(prevTodos => prevTodos.filter(todo => todo.id !== deletedTodo.id)); // 削除したTODOをリストから除外
      router.back(); // 前のページに戻る

    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const handleSortTodo = (setStatus:string) => {
    if (setStatus === "すべて") {
      // ステータスが「すべて」の場合はフィルタリングせず、全てのTODOを表示
      setSortTodos(todos);
    } else {
      // その他の場合はステータスでフィルタリング
      const sorted = todos.filter(todo => todo.status === setStatus);
      setSortTodos(sorted);
    }
  }

  return {todos,addTodo,deleteTodo,updateTodo,handleChangeComplete,isCompleted,sortTodos,handleSortTodo};
};
