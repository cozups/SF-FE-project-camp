'use client';

import React, { useEffect } from 'react';
import { PageListItem } from './PageListItem';
import { Page } from '@/app/types';
import { useFetchAllPage } from '@/shared/api';

function PageList() {
  const [pages, fetchPages] = useFetchAllPage();

  useEffect(() => {
    fetchPages();
  }, [fetchPages]);

  return (
    <div className="w-full mt-2">
      <p className="text-neutral-400 font-semibold text-sm">미소&apos;s</p>
      {/* 페이지 리스트 */}
      <ul>
        {pages.map((item: Page) => (
          <PageListItem key={item.id} item={item} />
        ))}
      </ul>
    </div>
  );
}

export { PageList };
