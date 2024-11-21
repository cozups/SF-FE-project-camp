import { Page } from '@/app/types';
import { currentPageAtom, pagesAtom } from '@/store';
import { supabase } from '@/utils/supabase';
import { useAtom } from 'jotai';
import { useCallback } from 'react';

export const useFetchAllPage = (): [Page[], () => Promise<void>] => {
  const [pages, setPages] = useAtom(pagesAtom);

  const fetchAllPages = useCallback(async () => {
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
  }, [setPages]);

  return [pages, fetchAllPages];
};

export const useFetchCurrentPage = (): [
  Page,
  (id: string | string[] | undefined) => Promise<void>
] => {
  const [currentPage, setCurrentPage] = useAtom(currentPageAtom);

  const fetchPage = useCallback(
    async (id: string | string[] | undefined) => {
      try {
        const { data, status } = await supabase
          .from('todos')
          .select()
          .eq('id', id);

        if (status === 200 && data) {
          setCurrentPage(data[0]);
        }
      } catch (error) {
        console.error(error);
      }
    },
    [setCurrentPage]
  );

  return [currentPage, fetchPage];
};
