import { currentPageAtom, pagesAtom } from '@/store';
import { supabase } from '@/utils/supabase';
import { useAtom } from 'jotai';

export const useUpdatePage = (id: string | string[] | undefined) => {
  const [currentPage, setCurrentPage] = useAtom(currentPageAtom);
  const [pages, setPages] = useAtom(pagesAtom);

  const updatePage = async () => {
    try {
      const { data, status } = await supabase
        .from('todos')
        .update(currentPage)
        .eq('id', id)
        .select();
      if (status === 200 && data) {
        // 현재 페이지 상태 반영
        setCurrentPage({
          ...data[0],
        });

        // 사이드바에 반영하기 위해 전체 페이지에 반영
        const newPageList = pages.map((page) =>
          page.id === Number(id) ? data[0] : page
        );
        setPages(newPageList);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return [updatePage];
};
