'use client';
import { CirclePlus } from 'lucide-react';
import { useCreateBoard } from '@/shared/api';
import { useParams } from 'next/navigation';

function NoBoard() {
  const { id } = useParams();
  const [createBoard] = useCreateBoard();

  const onAddBoard = () => {
    createBoard(id);
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
