'use client';
import { ChangeEvent } from 'react';
import { useAtom } from 'jotai';

import { SearchBar, CustomButton } from '@/components';
import { PageList } from './PageList';
import { useTodos } from '@/hooks/supabase';
import { searchValueAtom } from '@/store';

function SideBar() {
  const { createTodo } = useTodos();
  const [, setSearchValue] = useAtom(searchValueAtom);

  const onSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setSearchValue(input);
  };

  return (
    <aside
      className={`w-full h-full flex flex-col justify-start items-center gap-4 `}
    >
      {/* 검색창 영역 */}
      <SearchBar
        placeholder="검색어를 입력하세요."
        className="w-full"
        onChange={onSearch}
      />
      {/* 버튼 */}
      <CustomButton type="secondary" className="w-full" onClick={createTodo}>
        Add New Page
      </CustomButton>
      {/* 페이지 컨테이너 영역 */}
      <PageList />
    </aside>
  );
}

export { SideBar };
