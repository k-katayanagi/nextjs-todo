"use client";

import { useState, useEffect } from 'react';
import { getTodos,addTodos,deleteTodos,updateTodos,getTOrderTodos } from '@/app/api/supabase/todos/route';
import { useRouter } from "next/navigation"; // next/navigation からインポート
import { Todos } from '@/types/todos'

export const useTodos = () => {
  const [todos, setTodos] = useState<Todos[]>([]);
  const [sortTodos, setSortTodos] = useState<Todos[]>([]);
  const [isDelete,setIsDelete] = useState<boolean>(false)
  const [isDeleted,setIsDeleted] = useState<boolean>(false)
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

  const addTodo = async (newTodo:{ title: string; content: string; status: string }) => {
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


  const handleSortTodo = async (setStatus: string) => {
    try {
      // 昇順または降順の文字列が含まれているか確認
      if (/昇順|降順/.test(setStatus)) {
        const orderedTodo = await getTOrderTodos(setStatus);
        setSortTodos(orderedTodo)
      } else {
        // ステータスが「すべて」の場合
        if (setStatus === "3:すべて") {
          // ステータスが「すべて」の場合はフィルタリングせず、全てのTODOを表示
          setSortTodos(todos);
        } else {
          // その他の場合はステータスでフィルタリング
          const sorted = todos.filter(todo => todo.status === setStatus);

          setSortTodos(sorted);
        }
      }
    } catch (error) {
      console.error('Error sorting todo:', error);
    }
  };


  //delete関連
  const deleteTodo = async (deleteTodo: Todos) => {
    try {
      const deletedTodo = await deleteTodos(deleteTodo.id);
      setTodos(prevTodos => prevTodos.filter(todo => todo.id !== deletedTodo.id)); // 削除したTODOをリストから除外
      setIsDeleted(true);
      debugger
      router.back();  // 削除後にページ遷移
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const ToggleDelete = (isDelete:boolean) => {
    setIsDelete(isDelete);
  };

  useEffect(() => {
    if (isDeleted) {
      console.log(isDeleted);
      debugger
      // メッセージを表示する処理
      setTimeout(() => {
        ToggleDelete(false);
        setIsDeleted(false)
      }, 3000); // 3秒後に消す
    }
  }, [isDeleted]); // isDelete に依存



  return {todos,addTodo,deleteTodo,updateTodo,handleChangeComplete,isCompleted,sortTodos,handleSortTodo,isDelete,ToggleDelete,isDeleted};
};
