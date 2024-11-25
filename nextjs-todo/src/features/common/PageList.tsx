'use client';

import React, { useEffect, useState } from 'react';
import { PageListItem } from './PageListItem';
import { Page } from '@/app/types';
import { useAuth, useFetchAllPage } from '@/shared/api';
import { useAtom } from 'jotai';
import { searchValueAtom } from '@/store';
import { Skeleton } from '@/components';

function PageList() {
  const [pages, fetchPages] = useFetchAllPage();
  const [filteredPages, setFilteredPages] = useState<Page[]>([]);
  const [searchValue] = useAtom(searchValueAtom);
  const { userInfo } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchPages();
    setIsLoading(false);
  }, [fetchPages]);

  useEffect(() => {
    const filtered = pages.filter((page) => page.title.includes(searchValue));
    setFilteredPages(searchValue === '' ? pages : filtered);
  }, [pages, searchValue]);

  return (
    <div className="w-full mt-2">
      {isLoading ? (
        <Skeleton className="w-20 h-6" />
      ) : (
        userInfo && (
          <p className="text-neutral-400 font-semibold text-sm">
            {userInfo.username}&apos;s
          </p>
        )
      )}

      {/* 페이지 리스트 */}
      <ul className="w-full">
        {isLoading
          ? Array.from({ length: 3 }, (_, index) => index + 1).map((item) => (
              <Skeleton key={`page-${item}`} className="w-full h-8 my-2" />
            ))
          : userInfo &&
            filteredPages.map((item: Page) => (
              <PageListItem key={item.id} item={item} />
            ))}
      </ul>
    </div>
  );
}

export { PageList };
