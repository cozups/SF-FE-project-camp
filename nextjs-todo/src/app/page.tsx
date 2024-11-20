'use client';
import { useAtom } from 'jotai';
import { nanoid } from 'nanoid';
import { useRouter } from 'next/navigation';

import { CustomButton } from '@/components';
import { defaultPage, pagesAtom } from '@/store';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/utils/supabase';

export default function Home() {
  const router = useRouter();
  const [pages, setPages] = useAtom(pagesAtom);
  const { toast } = useToast();

  const onAddPage = async () => {
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

  return (
    <div className="w-fit h-full flex flex-col items-center justify-center text-center gap-5">
      <h1 className="font-bold text-3xl">How to start:</h1>
      <div className="text-lg font-medium">
        <p>1. Create a page</p>
        <p>2. Add boards to page</p>
      </div>
      <CustomButton type="secondary" onClick={onAddPage}>
        Add new page
      </CustomButton>
    </div>
  );
}
