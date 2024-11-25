'use client';
import { use, useEffect, useState } from 'react';
import { useAtom } from 'jotai';

import { BoardCard, TodoHeader, NoBoard } from '@/features';
import { Skeleton } from '@/components';
import { useTodos } from '@/hooks/supabase';
import { currentPageAtom } from '@/store';

interface Props {
  params: Promise<{ id: string }>;
}

function BoardPage({ params }: Props) {
  const { id } = use(params);
  const { fetchTodo } = useTodos();
  const [currentPage] = useAtom(currentPageAtom);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchTodo(id);
    setIsLoading(false);
  }, [fetchTodo, id]);

  return (
    <div className="w-full h-full flex flex-col overflow-y-scroll">
      <TodoHeader loading={isLoading} />
      <main className="flex-1 py-7 px-4 flex flex-col gap-5">
        {isLoading ? (
          <div>
            <Skeleton className="w-full h-56" />
          </div>
        ) : currentPage.boards?.length ? (
          // 보드 있을 때
          currentPage.boards.map((board) => (
            <BoardCard key={board.id} data={board} />
          ))
        ) : (
          // 보드 없을 때
          <NoBoard />
        )}
      </main>
    </div>
  );
}

export default BoardPage;
