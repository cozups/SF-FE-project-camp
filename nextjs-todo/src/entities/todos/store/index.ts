import { atom } from 'jotai';
import { Board, Todo } from '../types';

export const defaultTodo: Todo = {
  id: 0,
  title: '',
  from: null,
  to: null,
  boards: [],
  author_id: '',
};

export const defaultBoard: Board = {
  id: '',
  title: '',
  from: null,
  to: null,
  isCompleted: false,
  contents: '',
};

export const todosAtom = atom<Todo[]>([]);
export const currentTodoAtom = atom<Todo>(defaultTodo);
