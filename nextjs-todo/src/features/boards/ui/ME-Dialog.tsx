'use client';

import { ReactNode, useState } from 'react';
import { useAtom } from 'jotai';
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
} from '@/shared';
import { calculateTimeOffset } from '@/shared';
import { Board, currentTodoAtom, Todo } from '@/entities/todos';

interface Props {
  children: ReactNode;
  data: Board;
}

function MarkDownEditorDialog({ children, data }: Props) {
  const [markdown, setMarkdown] = useState<string>(data.contents);
  const [currentTodo, setCurrentTodo] = useAtom<Todo>(currentTodoAtom);

  const onSelectDate = (label: 'from' | 'to', date: Date) => {
    // 시간 오프셋 계산
    const koreaTime = calculateTimeOffset(date);

    const changedBoards = currentTodo.boards.map((board) =>
      board.id === data.id ? { ...board, [label]: koreaTime } : board
    );
    setCurrentTodo({ ...currentTodo, boards: changedBoards });
  };

  const onClickDone = () => {
    const changedBoards = currentTodo.boards.map((board) =>
      board.id === data.id ? { ...board, contents: markdown } : board
    );
    setCurrentTodo({ ...currentTodo, boards: changedBoards });
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
