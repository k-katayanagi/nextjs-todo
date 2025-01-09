"use client";

import DetailsButton from '@/components/button/DetailsButton'
import Link from 'next/link'
import SortStatesOption from '@/components/option/SortStatesOption';
import useOption from '@/hooks/useOption';
import { useTodos } from '@/hooks/useTodos';
import {sortStatuses} from '@/consts/sortStatus';
import OrderTodoOption from '@/components/option/OrderTodoOption';
import { orderItems } from '@/consts/orderItem';


const TodosList = () => {
  //todoリスト取得
  const {handleSortTodo,sortTodos,isDeleted} = useTodos();
  const {value,handleSet} = useOption('3:すべて');


  const handleChangeSort = (event:string) => {
    const setStatus = handleSet(event)
    handleSortTodo(setStatus)
  }

  return (
    <div className="grid items-center justify-items-center p-8 pb-10 gap-8 sm:gap-4 sm:p-10 font-[family-name:var(--font-geist-sans)]">
      {isDeleted &&
        <div className="text-red-500 text-center font-semibold mb-4">
          削除しました
       </div>}
      <div className="flex items-center gap-4">
        <OrderTodoOption
          orderItems={orderItems}
          selectOrder={value}
          onChange={handleChangeSort}/>
        <p>絞込み</p>
        <SortStatesOption
          statuses={sortStatuses}
          selectStatus={value}
          onChange={handleChangeSort}/>
        <Link href={"todos/create"}>
          <button
            className="px-4 py-2 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300">
            作成する
          </button>
        </Link>
      </div>
        <ul className="flex flex-wrap gap-4">
          {sortTodos.length > 0 ? (sortTodos.map((todo)=>
            { const [, statusName] = todo.status.split(":"); 
            return(
            <li key={todo.id} className="flex flex-col items-center p-4 border border-gray-300 rounded-lg shadow-md hover:bg-gray-100 w-full sm:w-auto justify-between h-[200px]"  >
              <div className="flex-grow mb-4 sm:mb-0 sm:mr-4">
                <div className="mb-2">
                  <span>タイトル：{todo.title}</span>
                </div>
                <div className="mb-2">
                  <span>内容：{todo.content}</span>
                </div>
                <div className="mb-2">
                  <span>ステータス：{statusName}</span>
                </div>
              </div> 
              <div className="mt-auto w-full flex justify-center">
                <DetailsButton todo={todo}/>
              </div>
            </li>
            )
        })
        ) : (
          <li>表示するTODOはありません</li>
        )}
        </ul>
    </div>
  )
}

export default TodosList
