import { useAtom } from 'jotai';
import { useRouter } from 'next/navigation';

import { toast } from '@/hooks/use-toast';
import { currentPageAtom, pagesAtom } from '@/store';
import { supabase } from '@/utils/supabase';
import { useAuth } from '../auth';
import { useCallback } from 'react';

export const useTodos = (): {
  fetchAllTodos: () => Promise<void>;
  fetchTodo: (id: string | string[] | undefined) => Promise<void>;
  createTodo: () => Promise<void>;
  updateTodo: (id: string | string[] | undefined) => Promise<void>;
  deleteTodo: (id: string | string[] | undefined) => Promise<void>;
} => {
  const [currentPage, setCurrentPage] = useAtom(currentPageAtom);
  const [pages, setPages] = useAtom(pagesAtom);
  const router = useRouter();

  const { userInfo } = useAuth();

  const fetchAllTodos = useCallback(async () => {
    if (!userInfo) return;
    try {
      const { data, status } = await supabase
        .from('todos')
        .select('*')
        .eq('author_id', userInfo.id)
        .order('created_at', { ascending: true });

      if (status === 200 && data) {
        setPages(data);
      }
    } catch (error) {
      console.error(error);
    }
  }, [setPages, userInfo]);

  const fetchTodo = useCallback(
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

  const createTodo = async () => {
    if (!userInfo) {
      toast({
        variant: 'destructive',
        title: '로그인이 필요합니다.',
      });
      router.push('/login');
      return;
    }
    try {
      const { data, status, error } = await supabase
        .from('todos')
        .insert([
          {
            title: '',
            boards: [],
            from: null,
            to: null,
            author_id: userInfo.id,
          },
        ])
        .select();

      if (status === 201 && data) {
        setPages((prevPages) => [...prevPages, data[0]]);
        toast({
          title: '페이지 생성이 완료되었습니다.',
          description: `/boards/${data[0].id}`,
        });
        router.push(`/boards/${data[0].id}`);
      }

      if (error) {
        toast({
          variant: 'destructive',
          title: '에러가 발생했습니다.',
          description: '개발자 도구 창을 확인하세요.',
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const updateTodo = async (id: string | string[] | undefined) => {
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

  const deleteTodo = async (id: string | string[] | undefined) => {
    try {
      const { status, error } = await supabase
        .from('todos')
        .delete()
        .eq('id', id);

      if (status === 204) {
        const newPages = pages.filter((page) => page.id !== Number(id));
        setPages(newPages);
        toast({
          title: `TODO 삭제가 완료되었습니다.`,
          description: '홈페이지로 이동합니다.',
        });

        router.replace('/');
      }
      if (error) {
        toast({
          variant: 'destructive',
          title: '삭제에 실패했습니다.',
          description: '개발자 도구 창을 확인해주세요.',
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return { fetchAllTodos, fetchTodo, createTodo, updateTodo, deleteTodo };
};
