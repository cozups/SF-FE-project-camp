'use client';
import { use, useEffect } from 'react';

import { BoardCard, TodoHeader, NoBoard } from '@/features';
import { useFetchCurrentPage } from '@/shared/api';

interface Props {
  params: Promise<{ id: string }>;
}

function BoardPage({ params }: Props) {
  const { id } = use(params);
  const [currentPage, fetchPage] = useFetchCurrentPage();

  useEffect(() => {
    fetchPage(id);
  }, [fetchPage, id]);

  return (
    <div className="w-full h-full flex flex-col overflow-y-scroll">
      <TodoHeader />
      <main className="flex-1 py-7 px-4 flex flex-col gap-5">
        {currentPage.boards?.length ? (
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
