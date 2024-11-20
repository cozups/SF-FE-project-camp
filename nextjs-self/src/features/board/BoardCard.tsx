'use client';

import { BoardData } from '@/app/types';
import {
  Checkbox,
  CustomButton,
  DatePicker,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Separator,
} from '@/components';
import { pagesAtom } from '@/store';
import { useAtom } from 'jotai';
import { ChevronUp } from 'lucide-react';
import { nanoid } from 'nanoid';
import { useParams } from 'next/navigation';
import { ChangeEvent, useEffect, useState } from 'react';

interface Props {
  data: BoardData;
}

function BoardCard({ data }: Props) {
  const { pageId } = useParams();
  const [pages, setPages] = useAtom(pagesAtom);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [boardData, setBoardData] = useState(data);

  const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setBoardData((prev) => ({ ...prev, title: e.target.value }));
  };

  const onCheck = (e: ChangeEvent<HTMLInputElement>) => {
    const currentPage = pages[currentIdx];

    const currentBoardIdx = currentPage.boards.findIndex(
      (board) => board.id === data.id
    );
    if (currentBoardIdx > -1) {
      const currentBoard = currentPage.boards[currentBoardIdx];
      currentPage.boards[currentBoardIdx] = {
        ...currentBoard,
        isCompleted: e.target.checked,
      };
    }

    pages[currentIdx] = currentPage;
    setPages([...pages]);
    setBoardData({ ...boardData, isCompleted: e.target.checked });
  };

  const onClickDuplicate = () => {
    pages[currentIdx].boards.push({ ...data, id: nanoid(8) });
    setPages([...pages]);
  };

  const onClickDelete = () => {
    const currentPageBoards = pages[currentIdx].boards;
    const deletedBoards = currentPageBoards.filter(
      (board) => board.id !== data.id
    );
    pages[currentIdx].boards = deletedBoards;
    setPages([...pages]);
  };

  useEffect(() => {
    const current = pages.findIndex((page) => page.id === pageId);
    if (current > -1) {
      setCurrentIdx(current);
    }
  }, [pages, pageId]);

  return (
    <div className="w-full bg-white flex flex-col gap-3 p-5 shadow-lg border border-neutral-100 rounded">
      <div className="w-full flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          {/* 체크박스 */}
          <Checkbox className="w-5 h-5 border-neutral-400" />
          <input
            type="text"
            placeholder="Board Title Here..."
            className="font-semibold text-2xl outline-none"
            value={boardData.title}
            onChange={onChangeTitle}
          />
        </div>
        <ChevronUp className="w-5 text-neutral-400" />
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <DatePicker label="From" value={boardData.from} />
          <DatePicker label="To" value={boardData.to} />
        </div>
        <div className="flex items-center">
          <CustomButton onClick={onClickDuplicate}>Duplicate</CustomButton>
          <CustomButton
            onClick={onClickDelete}
            className="text-red-500 hover:bg-red-100"
          >
            Delete
          </CustomButton>
        </div>
      </div>
      <Separator orientation="horizontal" />
      {/* Add contents 버튼 */}
      <Dialog>
        <DialogTrigger asChild>
          <CustomButton className="w-full">Add Contents</CustomButton>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <div className="flex items-center mb-2 gap-2">
              {/* 체크박스 */}
              <input
                type="checkbox"
                className={`w-6 h-6 appearance-none border border-neutral-300 rounded
                            hover:border-neutral-400
                            active: bg-neutral-100 
                            checked:bg-emerald-300 checked:rounded-full checked:border-0
                            checked:hover:bg-emerald-400
                            checked:active:bg-emerald-500`}
                onChange={onCheck}
                checked={data.isCompleted}
              />
              <DialogTitle className="font-semibold text-2xl">
                {boardData.title || 'title'}
              </DialogTitle>
            </div>
            <div className="flex items-center gap-2">
              <DatePicker label="From" value={boardData.from} />
              <DatePicker label="To" value={boardData.to} />
            </div>
          </DialogHeader>
          <div>{/* 에디터 영역 */}</div>
          <DialogFooter>
            <CustomButton type="text">Cancel</CustomButton>
            <CustomButton type="filled">Done</CustomButton>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {/* 컨텐츠 영역 */}
      <div></div>
    </div>
  );
}

export { BoardCard };
