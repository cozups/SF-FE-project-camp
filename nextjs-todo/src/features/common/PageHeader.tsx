'use client';
import Link from 'next/link';
import { useEffect } from 'react';

import { CustomButton } from '@/components';
import { useAuth } from '@/shared/api';
import { Profile } from './Profile';
import { AlignJustify } from 'lucide-react';
import { useRouter } from 'next/navigation';

function PageHeader() {
  const { userInfo, fetchUser, logOutUser } = useAuth();
  const router = useRouter();

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const onLogOut = async () => {
    await logOutUser();
    router.push('/');
  };

  return (
    <header className="w-full h-14 flex justify-between items-center px-4 py-2 border-b">
      <div className="flex items-center gap-4">
        <AlignJustify className="cursor-pointer" />
        <Link href="/" className="font-extrabold text-2xl">
          TODO
        </Link>
      </div>
      {/* 로그인 상태 분기 */}
      {userInfo ? (
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
