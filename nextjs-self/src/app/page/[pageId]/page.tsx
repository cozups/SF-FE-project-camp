'use client';
import { useEffect, useState } from 'react';

import { BoardData } from '@/app/types';
import { BoardCard, NoBoard } from '@/features';
import { useAtom } from 'jotai';
import { pagesAtom } from '@/store';
import { useParams } from 'next/navigation';

function BoardPage() {
  const [pages] = useAtom(pagesAtom);
  const [boards, setBoards] = useState<BoardData[]>([]);
  const { pageId } = useParams();

  useEffect(() => {
    const currentPage = pages.find((page) => page.id === pageId);
    if (currentPage) {
      setBoards(currentPage.boards);
    }
  }, [pages, pageId]);

  return (
    <main className="flex-1 py-7 px-4 flex flex-col gap-5">
      {boards.length ? (
        // 보드 있을 때
        boards.map((board) => <BoardCard key={board.id} data={board} />)
      ) : (
        // 보드 없을 때
        <NoBoard setBoards={setBoards} />
      )}
    </main>
  );
}

export default BoardPage;
