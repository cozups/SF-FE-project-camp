import { BoardData, Page, UserInfo } from '@/app/types';
import { atom } from 'jotai';

export const defaultPage: Page = {
  id: 0,
  title: '',
  from: null,
  to: null,
  boards: [],
};
export const defaultBoard: BoardData = {
  id: '',
  title: '',
  from: null,
  to: null,
  isCompleted: false,
  contents: '',
};

export const pagesAtom = atom<Page[]>([]);
export const currentPageAtom = atom<Page>(defaultPage);
export const searchValueAtom = atom<string>('');
export const userInfoAtom = atom<UserInfo | null>(null);
