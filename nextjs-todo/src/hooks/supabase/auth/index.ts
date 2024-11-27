import { useCallback } from 'react';
import { useAtom } from 'jotai';

import { UserInfo } from '@/app/types';
import { toast } from '@/hooks/use-toast';
import { userInfoAtom } from '@/store';
import { adminSupabase, supabase } from '@/utils/supabase';
import { useRouter } from 'next/navigation';

const findUserByEmail = async (email: string) => {
  try {
    const { data, error } = await adminSupabase.auth.admin.listUsers();

    if (data && data.users) {
      const user = data.users.find((user) => user.email === email);
      return user;
    }
    if (error) {
      return undefined;
    }
  } catch (error) {
    console.error(error);
  }
};

export const useAuth = (): {
  userInfo: UserInfo | null;
  setUserInfo: React.Dispatch<React.SetStateAction<UserInfo | null>>;
  fetchUser: () => Promise<void>;
  logOutUser: () => Promise<void>;
  joinUser: (formData: {
    user_name: string;
    email: string;
    password: string;
  }) => Promise<void>;
  logInUser: (formData: { email: string; password: string }) => Promise<void>;
  logInWithKakao: () => Promise<void>;
  updateUser: (inputData: {
    user_name: string;
    phone_number: string;
  }) => Promise<void>;
  resetSendEmail: (email: string) => Promise<void>;
  resetPassword: ({
    newPassword,
  }: {
    newPassword: string;
    newPasswordConfirm: string;
  }) => Promise<void>;
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
          user_name: session.user.user_metadata.user_name,
          email: session.user.email || '',
          phone_number: session.user.user_metadata.phone_number,
        };
        document.cookie = `user=${JSON.stringify(
          userInfo
        )}; path=/; max-age=3600;`;
        setUserInfo(userInfo);
      }
    } catch (error) {
      console.error(error);
    }
  }, [setUserInfo]);

  const joinUser = async (formData: {
    user_name: string;
    email: string;
    password: string;
  }) => {
    const { user_name, email, password } = formData;

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            user_name: user_name,
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
        const user = await findUserByEmail(email);

        if (!user) {
          // 계정 없음 - 이메일 오류
          toast({
            variant: 'destructive',
            title: '로그인에 실패하였습니다.',
            description: '계정이 존재하지 않습니다.',
          });
        } else {
          // 계정 있음 - 비밀번호 오류
          toast({
            variant: 'destructive',
            title: '로그인에 실패하였습니다.',
            description: '비밀번호가 일치하지 않습니다.',
          });
        }
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
        document.cookie = `user=; path=/; max-age=0;`;
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

  const updateUser = async (inputData: { user_name: string }) => {
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

  const resetSendEmail = async (email: string) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: 'http://localhost:3000/reset-password',
      });
      if (error) {
        toast({
          variant: 'destructive',
          title: '비밀번호 재설정 이메일 발송 실패!',
          description: '개발자 도구 창을 확인하세요.',
        });
      } else {
        toast({
          title: '비밀번호 재설정 이메일을 발송하였습니다.',
          description: `${email}에서 메일을 확인하세요.`,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const resetPassword = async ({
    newPassword,
  }: {
    newPassword: string;
    newPasswordConfirm: string;
  }) => {
    try {
      const { data, error } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (data) {
        toast({
          title: '비밀번호 재설정 완료!',
          description: '재설정 된 비밀번호로 로그인 되었습니다.',
        });
        router.replace('/boardsr');
      }
      if (error) {
        toast({
          variant: 'destructive',
          title: '비밀번호 재설정에 실패했습니다.',
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
    resetSendEmail,
    resetPassword,
  };
};
