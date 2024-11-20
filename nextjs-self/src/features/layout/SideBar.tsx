'use client';

import { useAtom } from 'jotai';

import { SearchBar, CustomButton } from '@/components';
import { PageList } from './PageList';
import { pagesAtom } from '@/store';
import { useRouter } from 'next/navigation';
import { supabase } from '@/utils/supabase';
import { useToast } from '@/hooks/use-toast';

function SideBar() {
  const [pages, setPages] = useAtom(pagesAtom);
  const router = useRouter();
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
    <div className="w-full h-full flex flex-col justify-start items-center gap-4 ">
      {/* 검색창 영역 */}
      <SearchBar placeholder="검색어를 입력하세요." className="w-full" />
      {/* 버튼 */}
      <CustomButton type="secondary" className="w-full" onClick={onAddPage}>
        Add New Page
      </CustomButton>
      {/* 페이지 컨테이너 영역 */}
      <PageList />
    </div>
  );
}

export { SideBar };
