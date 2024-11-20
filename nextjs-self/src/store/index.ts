import { BoardData, Page } from '@/app/types';
import { atom } from 'jotai';

export const defaultPage: Page = {
  id: 0,
  title: '',
  from: null,
  to: null,
  boards: [],
};
export const defaultBoard: BoardData = {
  id: 0,
  title: '',
  from: null,
  to: null,
  isCompleted: false,
  contents: '',
};

export const pagesAtom = atom<Page[]>([]);
export const currentPageAtom = atom<Page>(defaultPage);
