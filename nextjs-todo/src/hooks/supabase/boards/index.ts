import { useAtom } from 'jotai';
import { nanoid } from 'nanoid';

import { toast } from '@/hooks/use-toast';
import { supabase } from '@/utils/supabase';
import { useTodos } from '../todos';
import { Board, currentTodoAtom } from '@/entities/todos';

export const useBoards = (): {
  createBoard: (id: string | string[] | undefined) => Promise<void>;
  deleteBoard: (
    todoId: string | string[] | undefined,
    boardId: string
  ) => Promise<void>;
} => {
  const [currentTodo] = useAtom(currentTodoAtom);
  const { fetchTodo } = useTodos();
  const currentBoard = currentTodo.boards;

  const createBoard = async (id: string | string[] | undefined) => {
    const boardContent = {
      id: nanoid(8),
      isCompleted: false,
      title: '',
      from: null,
      to: null,
      contents: '',
    };
    const newBoards: Board[] = [...(currentTodo.boards || []), boardContent];

    try {
      const { status, error } = await supabase
        .from('todos')
        .update({ ...currentTodo, boards: newBoards })
        .eq('id', id)
        .select();

      if (status === 200) {
        toast({ title: '보드가 생성되었습니다.' });
        fetchTodo(id);
      }
      if (error) {
        toast({
          variant: 'destructive',
          title: '보드 생성에 실패했습니다.',
          description: '개발자 도구 창을 확인하세요.',
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const deleteBoard = async (
    todoId: string | string[] | undefined,
    boardId: string
  ) => {
    try {
      const deletedBoard = currentBoard.filter((board) => board.id !== boardId);
      const { status, error } = await supabase
        .from('todos')
        .update({ boards: deletedBoard })
        .eq('id', todoId)
        .select();

      if (status === 200) {
        toast({
          title: '보드가 삭제되었습니다.',
        });
        fetchTodo(todoId);
      }
      if (error) {
        toast({
          variant: 'destructive',
          title: '보드 삭제에 실패했습니다.',
          description: '개발자 도구 창을 확인하세요.',
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return { createBoard, deleteBoard };
};
