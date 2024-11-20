'use client';
import { useAtom } from 'jotai';
import { nanoid } from 'nanoid';

import { BoardData } from '@/app/types';
import { currentPageAtom } from '@/store';
import { CirclePlus } from 'lucide-react';

function NoBoard() {
  const [currentPage, setCurrentPage] = useAtom(currentPageAtom);

  const onAddBoard = async () => {
    const newBoards: BoardData[] = [...(currentPage.boards || [])];
    const boardContent = {
      id: nanoid(8),
      isCompleted: false,
      title: '',
      from: null,
      to: null,
      contents: '',
    };
    newBoards.push(boardContent);
    setCurrentPage({ ...currentPage, boards: newBoards });
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-7">
      {/* 텍스트 영역 */}
      <div className="text-center">
        <p className="text-2xl font-bold">There is no board yet.</p>
        <p className="text-lg font-medium">
          Click the button and start flashing!
        </p>
      </div>
      {/* 버튼 */}
      <CirclePlus
        className="text-orange-400 active:text-orange-700 w-20 h-20 cursor-pointer"
        onClick={onAddBoard}
      />
    </div>
  );
}

export { NoBoard };
