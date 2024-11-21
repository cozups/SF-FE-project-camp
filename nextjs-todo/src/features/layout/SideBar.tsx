'use client';

import { SearchBar, CustomButton } from '@/components';
import { PageList } from './PageList';
import { useCreatePage } from '@/shared/api';

function SideBar() {
  const [createPage] = useCreatePage();

  return (
    <div className="w-full h-full flex flex-col justify-start items-center gap-4 ">
      {/* 검색창 영역 */}
      <SearchBar placeholder="검색어를 입력하세요." className="w-full" />
      {/* 버튼 */}
      <CustomButton type="secondary" className="w-full" onClick={createPage}>
        Add New Page
      </CustomButton>
      {/* 페이지 컨테이너 영역 */}
      <PageList />
    </div>
  );
}

export { SideBar };
