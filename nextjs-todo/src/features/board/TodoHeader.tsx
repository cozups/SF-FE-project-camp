'use client';
import { ChangeEvent } from 'react';
import { useAtom } from 'jotai';
import { useParams } from 'next/navigation';

import {
  CardHeaderSkeleton,
  CustomButton,
  DatePicker,
  DeleteAlertButton,
} from '@/components';
import { ProgressIndicator } from '@/features';
import { calculateTimeOffset } from './lib';
import { useBoards, useTodos } from '@/hooks/supabase';
import { currentTodoAtom } from '@/entities/todos';

interface Props {
  loading: boolean;
}

function TodoHeader({ loading }: Props) {
  const { id } = useParams();
  const [currentTodo, setCurrentTodo] = useAtom(currentTodoAtom);
  const { updateTodo } = useTodos();
  const { createBoard } = useBoards();

  const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setCurrentTodo((prev) => ({ ...prev, title: input }));
  };

  const onSelectDate = (label: 'from' | 'to', date: Date) => {
    // 시간 오프셋 계산
    const koreaTime = calculateTimeOffset(date);

    setCurrentTodo((prev) => ({ ...prev, [label]: koreaTime }));
  };

  const onAddBoard = () => {
    createBoard(id);
  };

  return (
    <header className="w-full bg-white  py-4 px-7 flex items-end justify-between">
      <div className="w-full flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <CustomButton
            type="ghost"
            className={`w-fit`}
            onClick={() => updateTodo(id)}
          >
            저장
          </CustomButton>
          <DeleteAlertButton />
        </div>
        {/* 제목 입력 영역 */}
        {loading ? (
          <CardHeaderSkeleton />
        ) : (
          <>
            <input
              placeholder="Enter Title Here"
              className="font-extrabold text-5xl h-16 w-[80%] outline-none"
              value={currentTodo.title}
              onChange={onChangeTitle}
            />
            {/* 진행도 영역 */}
            <ProgressIndicator />
            {/* 기한 및 버튼 영역 */}
            <div className="w-full flex items-center justify-between gap-5">
              <div className="flex items-center gap-2">
                <DatePicker
                  label="From"
                  data={currentTodo.from}
                  onSelect={onSelectDate}
                />
                <DatePicker
                  label="To"
                  data={currentTodo.to}
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
          </>
        )}
      </div>
    </header>
  );
}

export { TodoHeader };
