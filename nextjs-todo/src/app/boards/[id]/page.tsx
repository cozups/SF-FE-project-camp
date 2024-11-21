'use client';
import { use, useEffect } from 'react';

import { BoardCard, TodoHeader, NoBoard } from '@/features';
import { useAtom } from 'jotai';
import { currentPageAtom } from '@/store';
import { supabase } from '@/utils/supabase';

interface Props {
  params: Promise<{ id: string }>;
}

function BoardPage({ params }: Props) {
  const [currentPage, setCurrentPage] = useAtom(currentPageAtom);
  const { id } = use(params);

  useEffect(() => {
    const fetchPage = async () => {
      try {
        const { data, status } = await supabase
          .from('todos')
          .select()
          .eq('id', id);

        if (status === 200 && data) {
          setCurrentPage(data[0]);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchPage();
  }, [id, setCurrentPage]);

  return (
    <div className="w-full h-full flex flex-col">
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
