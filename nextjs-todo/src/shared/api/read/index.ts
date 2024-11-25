import { Page, UserInfo } from '@/app/types';
import { useToast } from '@/hooks/use-toast';
import { currentPageAtom, pagesAtom, userInfoAtom } from '@/store';
import { supabase } from '@/utils/supabase';
import { useAtom } from 'jotai';
import { useCallback } from 'react';

export const useFetchAllPage = (): [Page[], () => Promise<void>] => {
  const [pages, setPages] = useAtom(pagesAtom);
  const { userInfo } = useAuth();

  const fetchAllPages = useCallback(async () => {
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
  setUserInfo: React.Dispatch<React.SetStateAction<UserInfo | null>>;
  fetchUser: () => Promise<void>;
  logOutUser: () => Promise<void>;
} => {
  const [userInfo, setUserInfo] = useAtom(userInfoAtom);
  const { toast } = useToast();

  const fetchUser = useCallback(async () => {
    console.log('fetchUser called');
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession(); // getSession 속 user를 쓰는 것이 클라이언트 사이드에서 더 빠르다고 합니다.

      if (session) {
        const userInfo: UserInfo = {
          id: session.user.id,
          username: session.user.user_metadata.username,
          email: session.user.email || '',
        };
        setUserInfo(userInfo);
      }
    } catch (error) {
      console.error(error);
    }
  }, [setUserInfo]);

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

  return { userInfo, setUserInfo, fetchUser, logOutUser };
};
