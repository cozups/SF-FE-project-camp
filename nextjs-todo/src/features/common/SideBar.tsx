'use client';

import { SearchBar, CustomButton } from '@/components';
import { PageList } from './PageList';
import { useAuth, useCreatePage } from '@/shared/api';
import { useAtom } from 'jotai';
import { searchValueAtom } from '@/store';
import { ChangeEvent } from 'react';

function SideBar() {
  const [createPage] = useCreatePage();
  const [, setSearchValue] = useAtom(searchValueAtom);
  const { userInfo } = useAuth();

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
      <CustomButton type="secondary" className="w-full" onClick={createPage}>
        Add New Page
      </CustomButton>
      {/* 페이지 컨테이너 영역 */}
      {userInfo && <PageList />}
    </aside>
  );
}

export { SideBar };