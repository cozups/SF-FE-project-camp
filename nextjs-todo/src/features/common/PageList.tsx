'use client';

import React, { useEffect, useState } from 'react';
import { PageListItem } from './PageListItem';
import { Page } from '@/app/types';
import { useAuth, useFetchAllPage } from '@/shared/api';
import { useAtom } from 'jotai';
import { searchValueAtom } from '@/store';

function PageList() {
  const [pages, fetchPages] = useFetchAllPage();
  const [filteredPages, setFilteredPages] = useState<Page[]>([]);
  const [searchValue] = useAtom(searchValueAtom);
  const { userInfo } = useAuth();

  useEffect(() => {
    fetchPages();
  }, [fetchPages]);

  useEffect(() => {
    const filtered = pages.filter((page) => page.title.includes(searchValue));
    setFilteredPages(searchValue === '' ? pages : filtered);
  }, [pages, searchValue]);

  return (
    <div className="w-full mt-2">
      <p className="text-neutral-400 font-semibold text-sm">
        {userInfo?.username}&apos;s
      </p>
      {/* 페이지 리스트 */}
      <ul>
        {filteredPages.map((item: Page) => (
          <PageListItem key={item.id} item={item} />
        ))}
      </ul>
    </div>
  );
}

export { PageList };
