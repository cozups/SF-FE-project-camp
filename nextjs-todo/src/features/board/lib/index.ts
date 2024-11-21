import { BoardData } from '@/app/types';
import { currentPageAtom } from '@/store';
import { useAtom } from 'jotai';
import { nanoid } from 'nanoid';

export const onAddBoard = async () => {
  const [currentPage, setCurrentPage] = useAtom(currentPageAtom);
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

export const calculateTimeOffset = (date: Date) => {
  const offsetInMinutes = date.getTimezoneOffset();
  const calculatedTime = new Date(date.getTime() - offsetInMinutes * 60 * 1000);

  return calculatedTime;
};
