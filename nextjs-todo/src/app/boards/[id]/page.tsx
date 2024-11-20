'use client';
import { use, useEffect, useState } from 'react';

import { BoardData } from '@/app/types';
import { BoardCard, NoBoard } from '@/features';
import { useAtom } from 'jotai';
import { currentPageAtom, pagesAtom } from '@/store';
import { useParams } from 'next/navigation';
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
  );
}

export default BoardPage;
