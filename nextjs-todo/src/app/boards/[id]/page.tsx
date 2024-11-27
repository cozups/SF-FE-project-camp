'use client';
import { use, useEffect, useState } from 'react';
import { useAtom } from 'jotai';

import { BoardCard, TodoHeader, NoBoard } from '@/features';
import { Button, Skeleton } from '@/components';
import { useTodos } from '@/hooks/supabase';
import { currentPageAtom } from '@/store';
import { useRouter } from 'next/navigation';

interface Props {
  params: Promise<{ id: string }>;
}

function BoardPage({ params }: Props) {
  const { id } = use(params);
  const { fetchTodo } = useTodos();
  const [currentPage] = useAtom(currentPageAtom);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    fetchTodo(id);
    setIsLoading(false);
  }, [fetchTodo, id]);

  return (
    <div className="w-full h-full flex flex-col overflow-y-scroll">
      {currentPage && (
        <>
          <TodoHeader loading={isLoading} />
          <main className="flex-1 py-7 px-4 flex flex-col gap-5">
            {isLoading && (
              <div>
                <Skeleton className="w-full h-56" />
              </div>
            )}
            {!isLoading &&
              (currentPage.boards?.length ? (
                // 보드 있을 때
                currentPage.boards.map((board) => (
                  <BoardCard key={board.id} data={board} />
                ))
              ) : (
                // 보드 없을 때
                <NoBoard />
              ))}
          </main>
        </>
      )}
      {!currentPage && (
        <div className="w-full h-full flex flex-col items-center justify-center gap-4">
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
            Error!
          </h1>
          <p>TODO가 존재하지 않거나 접근 권한이 없습니다.</p>
          <Button onClick={() => router.back()}>뒤로 가기</Button>
        </div>
      )}
    </div>
  );
}

export default BoardPage;
