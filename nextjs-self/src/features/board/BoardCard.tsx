'use client';

import { BoardData, Page } from '@/app/types';
import { Checkbox, CustomButton, DatePicker, Separator } from '@/components';
import { currentPageAtom, pagesAtom } from '@/store';
import { useAtom } from 'jotai';
import { ChevronUp } from 'lucide-react';
import { nanoid } from 'nanoid';
import { useParams } from 'next/navigation';
import { ChangeEvent, MouseEvent, useEffect, useState } from 'react';
import { MarkDownEditorDialog } from './ME-Dialog';
import MarkdownEditor from '@uiw/react-markdown-editor';

interface Props {
  data: BoardData;
}

function BoardCard({ data }: Props) {
  const [currentPage, setCurrentPage] = useAtom<Page>(currentPageAtom);
  const [boardData, setBoardData] = useState<BoardData>(data);
  const currentBoardIndex = currentPage.boards.findIndex(
    (board) => board.id === data.id
  );

  const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setBoardData((prev) => ({ ...prev, title: input }));
    currentPage.boards[currentBoardIndex] = boardData;
    setCurrentPage({ ...currentPage });
  };

  const onCheck = (checked: boolean | string) => {
    console.log(checked);
    if (checked) {
      data.isCompleted = true;
      setBoardData({ ...data });
    } else {
      data.isCompleted = false;
      setBoardData({ ...data });
    }
    currentPage.boards[currentBoardIndex] = { ...data };
    setCurrentPage({ ...currentPage });
  };

  const onClickDuplicate = () => {
    const newBoards = [...currentPage.boards];
    newBoards.push({
      ...data,
      id: nanoid(8),
      isCompleted: false,
    });
    const page = { ...currentPage, boards: newBoards };
    setCurrentPage(page);
  };

  const onClickDelete = () => {
    const newBoards = currentPage.boards.filter(
      (board) => board.id !== data.id
    );
    const page = { ...currentPage, boards: newBoards };
    setCurrentPage(page);
  };

  const onSelectDate = (label: 'from' | 'to', date: Date) => {
    // 시간 오프셋 계산
    const offsetInMinutes = date.getTimezoneOffset();
    const koreaTime = new Date(date.getTime() - offsetInMinutes * 60 * 1000);

    currentPage.boards[currentBoardIndex][label] = koreaTime;
    setCurrentPage({ ...currentPage });
  };

  return (
    <div className="w-full bg-white flex flex-col gap-3 p-5 shadow-lg border border-neutral-100 rounded">
      <div className="w-full flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          {/* 체크박스 */}
          <Checkbox
            className="w-5 h-5 border-neutral-400"
            onCheckedChange={(checked) => onCheck(checked)}
            checked={boardData.isCompleted}
          />
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
          <DatePicker
            label="From"
            value={boardData.from}
            onSelect={onSelectDate}
          />
          <DatePicker label="To" value={boardData.to} onSelect={onSelectDate} />
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
      {/* 컨텐츠 영역 */}
      <div>
        <MarkdownEditor.Markdown source={boardData.contents} />
      </div>
      {/* Add contents 버튼 */}
      <MarkDownEditorDialog data={boardData} setData={setBoardData}>
        <CustomButton className="w-full">Add Contents</CustomButton>
      </MarkDownEditorDialog>
    </div>
  );
}

export { BoardCard };
