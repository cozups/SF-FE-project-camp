'use client';

import React, { useEffect } from 'react';
import { PageListItem } from './PageListItem';
import { Page } from '@/app/types';
import { useAtom } from 'jotai';
import { pagesAtom } from '@/store';
import { supabase } from '@/utils/supabase';

function PageList() {
  const [pages, setPages] = useAtom(pagesAtom);

  useEffect(() => {
    const fetchPages = async () => {
      try {
        const { data, status } = await supabase
          .from('todos')
          .select('*')
          .order('created_at', { ascending: true });

        if (status === 200 && data) {
          setPages(data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchPages();
  }, [setPages]);

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
