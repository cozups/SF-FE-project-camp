'use client';

import { BoardData } from '@/app/types';
import { CustomButton, DatePicker, Progress } from '@/components';
import { currentPageAtom, defaultBoard } from '@/store';
import { supabase } from '@/utils/supabase';
import { useAtom } from 'jotai';
import { nanoid } from 'nanoid';
import { ChangeEvent, use, useEffect, useMemo } from 'react';

interface Props {
  params: Promise<{ id: string }>;
}

function DetailPageHeader({ params }: Props) {
  const { id } = use(params);
  const [currentPage, setCurrentPage] = useAtom(currentPageAtom);

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

  const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setCurrentPage((prev) => ({ ...prev, title: input }));
  };

  const onSelectDate = (label: 'from' | 'to', date: Date) => {
    const page = { ...currentPage };

    // 시간 오프셋 계산
    const offsetInMinutes = date.getTimezoneOffset();
    const koreaTime = new Date(date.getTime() - offsetInMinutes * 60 * 1000);

    page[label] = koreaTime;
    setCurrentPage(page);
  };

  const onSave = async () => {
    try {
      const { data, status } = await supabase
        .from('todos')
        .update(currentPage)
        .eq('id', id)
        .select();
      if (status === 200 && data) {
        setCurrentPage(data[0]);
      }
    } catch (error) {
      console.error(error);
    }
  };

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
  console.log(currentPage);

  const boardsCount = useMemo(() => {
    return currentPage.boards ? currentPage.boards.length : 0;
  }, [currentPage]);

  const completedCount = useMemo(() => {
    return currentPage.boards
      ? currentPage.boards.reduce(
          (acc, cur) => (cur.isCompleted ? acc + 1 : acc),
          0
        )
      : 0;
  }, [currentPage]);

  const progressRate =
    boardsCount === 0 ? 0 : (completedCount / boardsCount) * 100;

  return (
    <header className="w-full bg-white  py-4 px-7 flex items-end justify-between">
      <div className="w-full flex flex-col gap-4">
        <CustomButton type="ghost" className={`w-fit`} onClick={onSave}>
          저장
        </CustomButton>
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
            {completedCount}/{boardsCount} completed
          </span>
          <Progress value={progressRate} className="w-[238px] h-[6px]" />
        </div>
        {/* 기한 및 버튼 영역 */}
        <div className="w-full flex items-center justify-between gap-5">
          <div className="flex items-center gap-2">
            <DatePicker
              label="From"
              value={currentPage.from}
              onSelect={onSelectDate}
            />
            <DatePicker
              label="To"
              value={currentPage.to}
              onSelect={onSelectDate}
            />
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
