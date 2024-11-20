import { useAtom } from 'jotai';
import { useMemo } from 'react';

import { currentPageAtom } from '@/store';
import { Progress } from '@/components';

function ProgressIndicator() {
  const [currentPage] = useAtom(currentPageAtom);

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
    <div className="flex items-center gap-3">
      <span className="font-semibold text-lg text-neutral-500">
        {completedCount}/{boardsCount} completed
      </span>
      <Progress value={progressRate} className="w-[238px] h-[6px]" />
    </div>
  );
}

export { ProgressIndicator };
