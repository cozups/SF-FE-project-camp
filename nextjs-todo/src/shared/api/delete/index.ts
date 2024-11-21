import { useToast } from '@/hooks/use-toast';
import { currentPageAtom, pagesAtom } from '@/store';
import { supabase } from '@/utils/supabase';
import { useAtom } from 'jotai';
import { useRouter } from 'next/navigation';
import { useFetchCurrentPage } from '../read';

export const useDeletePage = () => {
  const [pages, setPages] = useAtom(pagesAtom);
  const { toast } = useToast();
  const router = useRouter();

  const deletePage = async (id: string | string[] | undefined) => {
    try {
      const { status, error } = await supabase
        .from('todos')
        .delete()
        .eq('id', id);

      if (status === 204) {
        const newPages = pages.filter((page) => page.id !== Number(id));
        setPages(newPages);
        toast({
          title: `TODO 삭제가 완료되었습니다.`,
          description: '홈페이지로 이동합니다.',
        });

        router.replace('/');
      }
      if (error) {
        toast({
          variant: 'destructive',
          title: '삭제에 실패했습니다.',
          description: '개발자 도구 창을 확인해주세요.',
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return [deletePage];
};

export const useDeleteBoard = () => {
  const [currentPage] = useAtom(currentPageAtom);
  const currentBoard = currentPage.boards;
  const { toast } = useToast();
  const [, fetchPage] = useFetchCurrentPage();

  const deleteBoard = async (
    pageId: string | string[] | undefined,
    boardId: string
  ) => {
    try {
      const deletedBoard = currentBoard.filter((board) => board.id !== boardId);
      const { status, error } = await supabase
        .from('todos')
        .update({ boards: deletedBoard })
        .eq('id', pageId)
        .select();

      if (status === 200) {
        toast({
          title: '보드가 삭제되었습니다.',
        });
        fetchPage(pageId);
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

  return [deleteBoard];
};
