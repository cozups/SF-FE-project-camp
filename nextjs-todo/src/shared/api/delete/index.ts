import { useToast } from '@/hooks/use-toast';
import { pagesAtom } from '@/store';
import { supabase } from '@/utils/supabase';
import { useAtom } from 'jotai';
import { useRouter } from 'next/navigation';

export const useDeletePage = (id: string | string[] | undefined) => {
  const [pages, setPages] = useAtom(pagesAtom);
  const { toast } = useToast();
  const router = useRouter();

  const deletePage = async () => {
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
