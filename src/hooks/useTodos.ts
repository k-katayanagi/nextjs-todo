"use client";

import { useState, useEffect } from 'react';
import { getTodos, addTodos, deleteTodos, updateTodos,} from '@/app/api/supabase/todos/route';
import { useRouter } from "next/navigation"; // next/navigation からインポート
import { Todos } from '@/types/todos'
import { useTodoContext } from '@/contexts/TodoContext';
import { orderItem } from '@/types/todos';

export const useTodos = () => {
  const [todos, setTodos] = useState<Todos[]>([]);
  const [sortTodos, setSortTodos] = useState<Todos[]>([]);
  const [isDelete, setIsDelete] = useState<boolean>(false)
  const { isDeleted, setIsDeleted } = useTodoContext();
  const [isCompleted, SetIsCompleted] = useState<boolean>(false)
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

  const handleChangeComplete = () => {
    SetIsCompleted(true);
    setTimeout(() => {
      SetIsCompleted(false);
    }, 1000);

  }

  const addTodo = async (newTodo: { title: string; content: string; status: string }) => {
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
      const updatedTodo = await updateTodos(id, updatedData);
      setTodos((prevTodos) => prevTodos.map(todo => todo.id === updatedTodo.id ? updatedTodo : todo)); // 新しいTODOに置き換え
      handleChangeComplete()
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };


  const handleSortTodo = async (setSortStatus: string,setOrderStatus: string) => {
    try {
          let filteredTodos = [...todos];
          // ソート条件によるソート
          switch (setOrderStatus) {
            case "id昇順":
              filteredTodos.sort((a, b) => a.id - b.id);
              break;
            case "id降順":
              filteredTodos.sort((a, b) => b.id - a.id);
              break;
            case "タイトル昇順":
              filteredTodos.sort((a, b) => a.title.localeCompare(b.title));
              break;
            case "タイトル降順":
              filteredTodos.sort((a, b) => b.title.localeCompare(a.title));
              break;
            case "内容昇順":
              filteredTodos.sort((a, b) => a.content.localeCompare(b.content));
              break;
            case "内容降順":
              filteredTodos.sort((a, b) => b.content.localeCompare(a.content));
              break;
            case "ステータス昇順":
              filteredTodos.sort((a, b) => a.status.localeCompare(b.status));
              break;
            case "ステータス降順":
              filteredTodos.sort((a, b) => b.status.localeCompare(a.status));
              break;
            case "登録日昇順":
              filteredTodos.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
              break;
            case "登録日降順":
              filteredTodos.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
              break;
            default:
              break;
          }
          if (setSortStatus !== "3:すべて") {
            filteredTodos = filteredTodos.filter(todo => todo.status === setSortStatus);
          }
          // ソートされたTODOをセット
          setSortTodos(filteredTodos);

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
      router.back();  // 削除後にページ遷移
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const ToggleDelete = (isDelete: boolean) => {
    setIsDelete(isDelete);
  };

  useEffect(() => {
    if (isDeleted) {
      console.log(isDeleted);
      // メッセージを表示する処理
      setTimeout(() => {
        ToggleDelete(false);
        setIsDeleted(false)
      }, 1000); // 3秒後に消す
    }
  }, [isDeleted]); // isDelete に依存

  return { todos, addTodo, deleteTodo, updateTodo, handleChangeComplete, isCompleted, sortTodos, handleSortTodo, isDelete, ToggleDelete };
};