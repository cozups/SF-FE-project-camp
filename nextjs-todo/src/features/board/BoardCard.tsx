'use client';
import { ChangeEvent } from 'react';
import { useAtom } from 'jotai';
import { nanoid } from 'nanoid';
import { useParams } from 'next/navigation';

import { ChevronUp } from 'lucide-react';
import MarkdownEditor from '@uiw/react-markdown-editor';
import { Checkbox, CustomButton, DatePicker, Separator } from '@/components';
import { MarkDownEditorDialog } from '@/features';
import { calculateTimeOffset } from '@/features/board/lib';
import { useBoards } from '@/hooks/supabase';
import { Board, currentTodoAtom, Todo } from '@/entities/todos';

interface Props {
  data: Board;
}

function BoardCard({ data }: Props) {
  const { id } = useParams();
  const [currentTodo, setCurrentTodo] = useAtom<Todo>(currentTodoAtom);
  const { deleteBoard } = useBoards();

  const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;

    const changedBoards = currentTodo.boards.map((board) =>
      board.id === data.id ? { ...board, title: input } : board
    );
    setCurrentTodo({ ...currentTodo, boards: changedBoards });
  };

  const onCheck = (checked: boolean | string) => {
    const changedBoards = currentTodo.boards.map((board) =>
      board.id === data.id
        ? { ...board, isCompleted: checked === true ? true : false }
        : board
    );
    setCurrentTodo({ ...currentTodo, boards: changedBoards });
  };

  const onClickDuplicate = () => {
    const newBoards = [...currentTodo.boards];
    newBoards.push({
      ...data,
      id: nanoid(8),
      isCompleted: false,
    });
    const page = { ...currentTodo, boards: newBoards };
    setCurrentTodo(page);
  };

  const onClickDelete = () => {
    deleteBoard(id, data.id);
  };

  const onSelectDate = (label: 'from' | 'to', date: Date) => {
    // 시간 오프셋 계산
    const koreaTime = calculateTimeOffset(date);

    const changedBoards = currentTodo.boards.map((board) =>
      board.id === data.id ? { ...board, [label]: koreaTime } : board
    );
    setCurrentTodo({ ...currentTodo, boards: changedBoards });
  };

  return (
    <div className="w-full bg-white flex flex-col gap-3 p-5 shadow-lg border border-neutral-100 rounded">
      <div className="w-full flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          {/* 체크박스 */}
          <Checkbox
            className="w-5 h-5 border-neutral-400"
            onCheckedChange={(checked) => onCheck(checked)}
            checked={data.isCompleted}
          />
          <input
            type="text"
            placeholder="Board Title Here..."
            className="font-semibold text-2xl outline-none"
            value={data.title}
            onChange={onChangeTitle}
          />
        </div>
        <ChevronUp className="w-5 text-neutral-400" />
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <DatePicker label="From" data={data.from} onSelect={onSelectDate} />
          <DatePicker label="To" data={data.to} onSelect={onSelectDate} />
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
        <MarkdownEditor.Markdown source={data.contents} />
      </div>
      {/* Add contents 버튼 */}
      <MarkDownEditorDialog data={data}>
        <CustomButton className="w-full" type="text">
          Add Contents
        </CustomButton>
      </MarkDownEditorDialog>
    </div>
  );
}

export { BoardCard };
