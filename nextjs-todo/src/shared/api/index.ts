import { useToast } from '@/hooks/use-toast';
import { pagesAtom } from '@/store';
import { supabase } from '@/utils/supabase';
import { useAtom } from 'jotai';
import { useRouter } from 'next/navigation';

export const useCreatePage = () => {
  const [pages, setPages] = useAtom(pagesAtom);
  const { toast } = useToast();
  const router = useRouter();

  const addPage = async () => {
    try {
      const { data, status, error } = await supabase
        .from('todos')
        .insert([{ title: '', boards: [], from: null, to: null }])
        .select();

      if (status === 201 && data) {
        setPages([...pages, data[0]]);
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

  return [addPage];
};
