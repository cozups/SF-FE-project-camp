'use client';
import React, { useEffect, useState } from 'react';
import { useAtom, useAtomValue } from 'jotai';

import { useAuth, useTodos } from '@/hooks/supabase';
import { PageListItem } from './PageListItem';
import { Skeleton } from '@/components';
import { searchValueAtom } from '@/store';
import { Todo, todosAtom } from '@/entities/todos';

function PageList() {
  const { fetchAllTodos } = useTodos();
  const { userInfo } = useAuth();

  const todos = useAtomValue(todosAtom);
  const [filteredPages, setFilteredPages] = useState<Todo[]>([]);
  const [searchValue] = useAtom(searchValueAtom);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchAllTodos();
    setIsLoading(false);
  }, [fetchAllTodos]);

  useEffect(() => {
    const filtered = todos.filter((todo) => todo.title.includes(searchValue));
    setFilteredPages(searchValue === '' ? todos : filtered);
  }, [todos, searchValue]);

  return (
    <div className="w-full mt-2">
      {isLoading ? (
        <Skeleton className="w-20 h-6" />
      ) : (
        userInfo && (
          <p className="text-neutral-400 font-semibold text-sm">
            {userInfo.user_name}&apos;s
          </p>
        )
      )}

      {/* 페이지 리스트 */}
      <ul className="w-full">
        {isLoading
          ? Array.from({ length: 3 }, (_, index) => index + 1).map((item) => (
              <Skeleton key={`page-${item}`} className="w-full h-8 my-2" />
            ))
          : userInfo &&
            filteredPages.map((item: Todo) => (
              <PageListItem key={item.id} item={item} />
            ))}
      </ul>
    </div>
  );
}

export { PageList };
