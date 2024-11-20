'use client';

import { Page } from '@/app/types';
import { CustomButton, DatePicker, Progress } from '@/components';
import { defaultBoard, defaultPage, pagesAtom } from '@/store';
import { useAtom } from 'jotai';
import { nanoid } from 'nanoid';
import { ChangeEvent, use, useEffect, useMemo, useState } from 'react';

interface Props {
  params: Promise<{ pageId: string }>;
}

function DetailPageHeader({ params }: Props) {
  const [pages, setPages] = useAtom(pagesAtom);
  const [currentPage, setCurrentPage] = useState<Page>(defaultPage);
  const [currentIdx, setCurrentIdx] = useState(0);
  const { pageId } = use(params);

  const boardCompletedNum = useMemo(() => {
    return currentPage.boards.reduce(
      (acc, cur) => (cur.isCompleted ? acc + 1 : acc),
      0
    );
  }, [currentPage]);
  const completedRate = useMemo(() => {
    return currentPage.boards.length > 0
      ? (boardCompletedNum / currentPage.boards.length) * 100
      : 0;
  }, [boardCompletedNum, currentPage]);

  const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setCurrentPage((prev) => ({ ...prev, title: input }));
  };

  const onAddBoard = () => {
    const changedPages = [...pages];
    changedPages[currentIdx].boards.push({ ...defaultBoard, id: nanoid(8) });
    setPages(changedPages);
  };

  const onSaveTitle = () => {
    const changed = [...pages];
    changed[currentIdx] = currentPage;
    setPages(changed);
  };

  useEffect(() => {
    const foundIdx = pages.findIndex((page) => page.id === pageId);
    if (foundIdx > -1) {
      setCurrentIdx(foundIdx);
      setCurrentPage(pages[foundIdx]);
    }
  }, [setCurrentIdx, pageId, pages]);

  return (
    <header className="w-full bg-white  py-4 px-7 flex items-end justify-between">
      <div className="w-full flex flex-col gap-4">
        {/* 제목 입력 영역 */}
        <input
          placeholder="Enter Title Here"
          className="font-extrabold text-5xl h-18 w-[80%] outline-none"
          value={currentPage.title}
          onChange={onChangeTitle}
        />

        {/* 진행도 영역 */}
        <div className="flex items-center gap-3">
          <span className="font-semibold text-lg text-neutral-500">
            {boardCompletedNum}/{currentPage.boards.length} completed
          </span>
          <Progress value={completedRate} className="w-[238px] h-[6px]" />
        </div>
        {/* 기한 및 버튼 영역 */}
        <div className="w-full flex items-center justify-between gap-5">
          <div className="flex items-center gap-2">
            <DatePicker
              label="From"
              value={currentPage.from}
              onSelect={() => {}}
            />
            <DatePicker label="To" value={currentPage.to} onSelect={() => {}} />
            <CustomButton
              type="ghost"
              className={`w-fit`}
              onClick={onSaveTitle}
            >
              저장
            </CustomButton>
          </div>
          <CustomButton
            type="filled"
            className="w-fit justify-self-end"
            onClick={onAddBoard}
          >
            Add New Board
          </CustomButton>
        </div>
      </div>
    </header>
  );
}

export { DetailPageHeader };
