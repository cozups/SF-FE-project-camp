import { Page, UserInfo } from '@/app/types';
import { useToast } from '@/hooks/use-toast';
import { currentPageAtom, pagesAtom, userInfoAtom } from '@/store';
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

export const useAuth = (): {
  userInfo: UserInfo | null;
  fetchUser: () => Promise<void>;
  logOutUser: () => Promise<void>;
} => {
  const [userInfo, setUserInfo] = useAtom(userInfoAtom);
  const { toast } = useToast();

  const fetchUser = async () => {
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession(); // getSession 속 user를 쓰는 것이 클라이언트 사이드에서 더 빠르다고 합니다.

      if (session) {
        const userInfo: UserInfo = {
          username: session.user.user_metadata.username,
          email: session.user.email || '',
        };
        setUserInfo(userInfo);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const logOutUser = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        toast({
          variant: 'destructive',
          title: '로그아웃 실패!',
          description: '개발자 도구 창을 확인하세요.',
        });
      } else {
        toast({
          title: '로그아웃 되었습니다.',
        });
        setUserInfo(null);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return { userInfo, fetchUser, logOutUser };
};
