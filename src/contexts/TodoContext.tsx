'use client';

import { createContext, useContext, useState } from 'react';

const TodoContext = createContext({
  isDeleted: false,
  setIsDeleted: (value: boolean) => { },
});

export const TodoProvider = ({ children }: { children: React.ReactNode }) => {
  const [isDeleted, setIsDeleted] = useState(false);

  return (
    <TodoContext.Provider value={{ isDeleted, setIsDeleted }}>
      {children}
    </TodoContext.Provider>
  );
};

export const useTodoContext = () => useContext(TodoContext); 