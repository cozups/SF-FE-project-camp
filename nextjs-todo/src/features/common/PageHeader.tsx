'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { CustomButton, Skeleton } from '@/components';
import { useAuth } from '@/hooks/supabase';
import { Profile } from './Profile';

function PageHeader() {
  const { userInfo, logOutUser, fetchUser } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchUser();
    setIsLoading(false);
  }, [fetchUser]);

  const onLogOut = async () => {
    await logOutUser();
    router.push('/');
  };

  return (
    <header className="w-full h-14 flex justify-between items-center px-4 py-2 border-b">
      <Link href="/" className="font-extrabold text-2xl">
        TODO
      </Link>
      {/* 로그인 상태 분기 */}
      {isLoading ? (
        <Skeleton className="w-40 h-10" />
      ) : userInfo ? (
        <div className="flex items-center gap-2">
          <Profile userInfo={userInfo} />
          <CustomButton type="filled" onClick={onLogOut}>
            로그아웃
          </CustomButton>
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <Link href="/join">
            <CustomButton type="ghost">회원가입</CustomButton>
          </Link>
          <Link href="/login">
            <CustomButton type="filled">로그인</CustomButton>
          </Link>
        </div>
      )}
    </header>
  );
}

export { PageHeader };
