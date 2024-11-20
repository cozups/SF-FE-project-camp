import { BoardData, Page } from '@/app/types';
import { atom } from 'jotai';

export const defaultPage: Page = {
  id: '',
  title: '',
  from: '',
  to: '',
  boards: [],
};
export const defaultBoard: BoardData = {
  id: '',
  title: '',
  from: '',
  to: '',
  isCompleted: false,
  contents: '',
};

export const pagesAtom = atom<Page[]>([]);
