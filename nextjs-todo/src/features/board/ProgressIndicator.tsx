import { useAtom } from 'jotai';
import { useMemo } from 'react';

import { Progress } from '@/components';
import { currentTodoAtom } from '@/entities/todos';

function ProgressIndicator() {
  const [currentTodo] = useAtom(currentTodoAtom);

  const boardsCount = useMemo(() => {
    return currentTodo.boards ? currentTodo.boards.length : 0;
  }, [currentTodo]);

  const completedCount = useMemo(() => {
    return currentTodo.boards
      ? currentTodo.boards.reduce(
          (acc, cur) => (cur.isCompleted ? acc + 1 : acc),
          0
        )
      : 0;
  }, [currentTodo]);

  const progressRate =
    boardsCount === 0 ? 0 : (completedCount / boardsCount) * 100;

  return (
    <div className="flex items-center gap-3">
      <span className="font-semibold text-lg text-neutral-500">
        {completedCount}/{boardsCount} completed
      </span>
      <Progress value={progressRate} className="w-[238px] h-[6px]" />
    </div>
  );
}

export { ProgressIndicator };
