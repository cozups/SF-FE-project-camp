'use client';

import { useAtom } from 'jotai';
import { nanoid } from 'nanoid';

import { SearchBar, CustomButton } from '@/components';
import { PageList } from './PageList';
import { pagesAtom } from '@/store';
import { useRouter } from 'next/navigation';
import { supabase } from '@/utils/supabase';

function SideBar() {
  const [pages, setPages] = useAtom(pagesAtom);
  const router = useRouter();

  const onAddPage = async () => {
    try {
      const newId = nanoid(8);
      const { data, status, error } = await supabase
        .from('pages')
        .insert([{ id: newId, title: '', boards: [], from: null, to: null }])
        .select();

      if (status === 201 && data) {
        setPages([...pages, ...data]);

        router.push(`/page/${newId}`);
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
