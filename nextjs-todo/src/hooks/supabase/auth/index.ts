import { useCallback } from 'react';
import { useAtom } from 'jotai';

import { UserInfo } from '@/app/types';
import { toast } from '@/hooks/use-toast';
import { userInfoAtom } from '@/store';
import { supabase } from '@/utils/supabase';
import { useRouter } from 'next/navigation';

export const useAuth = (): {
  userInfo: UserInfo | null;
  setUserInfo: React.Dispatch<React.SetStateAction<UserInfo | null>>;
  fetchUser: () => Promise<void>;
  logOutUser: () => Promise<void>;
  joinUser: (formData: {
    username: string;
    email: string;
    password: string;
  }) => Promise<void>;
  logInUser: (formData: { email: string; password: string }) => Promise<void>;
  logInWithKakao: () => Promise<void>;
  updateUser: (inputData: { username: string }) => Promise<void>;
} => {
  const [userInfo, setUserInfo] = useAtom(userInfoAtom);
  const router = useRouter();

  const fetchUser = useCallback(async () => {
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession(); // getSession 속 user를 쓰는 것이 클라이언트 사이드에서 더 빠르다고 합니다.

      if (session) {
        const userInfo: UserInfo = {
          id: session.user.id,
          username: session.user.user_metadata.user_name,
          email: session.user.email || '',
        };
        console.log(session);
        setUserInfo(userInfo);
      }
    } catch (error) {
      console.error(error);
    }
  }, [setUserInfo]);

  const joinUser = async (formData: {
    username: string;
    email: string;
    password: string;
  }) => {
    const { username, email, password } = formData;

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            user_name: username,
          },
        },
      });

      if (data.user && data.session) {
        toast({
          title: '회원가입에 성공했습니다.',
        });
        fetchUser();
        router.replace('/boards');
      }
      if (error) {
        if (error.code === 'user_already_exists') {
          toast({
            variant: 'destructive',
            title: '이미 존재하는 이메일입니다.',
            description: '다른 이메일을 사용해주세요.',
          });
        } else {
          toast({
            variant: 'destructive',
            title: '회원가입에 실패했습니다.',
            description: '입력 정보를 확인해주세요.',
          });
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const logInUser = async (formData: { email: string; password: string }) => {
    const { email, password } = formData;
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (data.user && data.session) {
        toast({
          title: '로그인에 성공하였습니다.',
        });
        fetchUser();
        router.replace('/boards');
      }
      if (error) {
        toast({
          variant: 'destructive',
          title: '로그인에 실패하였습니다.',
          description: '입력 정보를 확인하세요.',
        });
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

  const logInWithKakao = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'kakao',
      });

      if (data) {
        toast({
          title: '카카오 로그인 완료',
          description: 'boards 페이지로 이동합니다.',
        });
      }
      if (error) {
        toast({
          variant: 'destructive',
          title: '카카오 로그인 실패!',
          description: '개발자 도구 창을 확인해주세요.',
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const updateUser = async (inputData: { username: string }) => {
    try {
      const { data, error } = await supabase.auth.updateUser({
        data: inputData,
      });

      if (data) {
        toast({
          title: '프로필이 업데이트 되었습니다.',
        });
        fetchUser();
      }
      if (error) {
        toast({
          title: '프로필 업데이트에 실패했습니다.',
          description: '개발자 도구 창을 확인하세요.',
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return {
    userInfo,
    setUserInfo,
    fetchUser,
    logOutUser,
    joinUser,
    logInUser,
    logInWithKakao,
    updateUser,
  };
};