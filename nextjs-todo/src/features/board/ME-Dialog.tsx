'use client';

import { ReactNode, useState } from 'react';
import MarkdownEditor from '@uiw/react-markdown-editor';

import {
  Checkbox,
  CustomButton,
  DatePicker,
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components';
import { BoardData, Page } from '@/app/types';
import { useAtom } from 'jotai';
import { currentPageAtom } from '@/store';
import { calculateTimeOffset } from './lib';

interface Props {
  children: ReactNode;
  data: BoardData;
}

function MarkDownEditorDialog({ children, data }: Props) {
  const [markdown, setMarkdown] = useState<string>(data.contents);
  const [currentPage, setCurrentPage] = useAtom<Page>(currentPageAtom);
  const currentBoardIndex = currentPage.boards.findIndex(
    (board) => board.id === data.id
  );

  const onSelectDate = (label: 'from' | 'to', date: Date) => {
    // 시간 오프셋 계산
    const koreaTime = calculateTimeOffset(date);

    const changedBoards = currentPage.boards.map((board) =>
      board.id === data.id ? { ...board, [label]: koreaTime } : board
    );
    setCurrentPage({ ...currentPage, boards: changedBoards });
  };

  const onClickDone = () => {
    currentPage.boards[currentBoardIndex].contents = markdown;
    setCurrentPage({ ...currentPage });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <div className="flex items-center mb-2 gap-2">
            {/* 체크박스 */}
            <Checkbox
              className="w-5 h-5 border-neutral-400"
              // onCheckedChange={(checked) => onCheck(checked)}
              checked={data.isCompleted}
            />
            <DialogTitle className="font-semibold text-2xl">
              {data.title || 'title'}
            </DialogTitle>
          </div>
          <div className="flex items-center gap-2">
            <DatePicker label="From" data={data.from} onSelect={onSelectDate} />
            <DatePicker label="To" data={data.to} onSelect={onSelectDate} />
          </div>
        </DialogHeader>
        <div className="flex items-center justify-center">
          {/* 에디터 영역 */}
          <MarkdownEditor
            value={markdown}
            height="320px"
            onChange={(value) => setMarkdown(value)}
            className="w-full"
          />
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <CustomButton type="text">Cancel</CustomButton>
          </DialogClose>
          <DialogClose asChild>
            <CustomButton type="filled" onClick={onClickDone}>
              Done
            </CustomButton>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export { MarkDownEditorDialog };
