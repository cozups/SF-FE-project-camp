'use client';

import { BoardData } from '@/app/types';
import { defaultBoard } from '@/store';
import { CirclePlus } from 'lucide-react';
import { nanoid } from 'nanoid';
import { Dispatch, SetStateAction } from 'react';

interface Props {
  setBoards: Dispatch<SetStateAction<BoardData[]>>;
}

function NoBoard({ setBoards }: Props) {
  const onClickAddBoard = () => {
    setBoards((prev) => [...prev, { ...defaultBoard, id: nanoid(8) }]);
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
        onClick={onClickAddBoard}
      />
    </div>
  );
}

export { NoBoard };
