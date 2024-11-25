import { BoardData } from '@/app/types';
import { useToast } from '@/hooks/use-toast';
import { currentPageAtom, pagesAtom } from '@/store';
import { supabase } from '@/utils/supabase';
import { useAtom } from 'jotai';
import { nanoid } from 'nanoid';
import { useRouter } from 'next/navigation';
import { useAuth, useFetchCurrentPage } from '../read';

export const useCreatePage = () => {
  const [, setPages] = useAtom(pagesAtom);
  const { toast } = useToast();
  const router = useRouter();

  const { userInfo } = useAuth();

  const createPage = async () => {
    if (!userInfo) return;
    try {
      const { data, status, error } = await supabase
        .from('todos')
        .insert([
          { title: '', boards: [], from: null, to: null, author: userInfo.id },
        ])
        .select();

      if (status === 201 && data) {
        setPages((prevPages) => [...prevPages, data[0]]);
        toast({
          title: '페이지 생성이 완료되었습니다.',
          description: `/boards/${data[0].id}`,
        });
        router.push(`/boards/${data[0].id}`);
      }

      if (error) {
        toast({
          variant: 'destructive',
          title: '에러가 발생했습니다.',
          description: '개발자 도구 창을 확인하세요.',
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return [createPage];
};

export const useCreateBoard = () => {
  const [currentPage] = useAtom(currentPageAtom);
  const { toast } = useToast();
  const [, fetchPage] = useFetchCurrentPage();

  const createBoard = async (id: string | string[] | undefined) => {
    const boardContent = {
      id: nanoid(8),
      isCompleted: false,
      title: '',
      from: null,
      to: null,
      contents: '',
    };
    const newBoards: BoardData[] = [
      ...(currentPage.boards || []),
      boardContent,
    ];

    try {
      const { status, error } = await supabase
        .from('todos')
        .update({ boards: newBoards })
        .eq('id', id)
        .select();

      if (status === 200) {
        toast({ title: '보드가 생성되었습니다.' });
        fetchPage(id);
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

  return [createBoard];
};
