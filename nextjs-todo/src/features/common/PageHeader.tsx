'use client';
import Link from 'next/link';
import { useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  CustomButton,
} from '@/components';
import { useAuth } from '@/shared/api';

function PageHeader() {
  const { userInfo, fetchUser, logOutUser } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return (
    <header className="w-full h-14 flex justify-between items-center px-4 py-2 border-b">
      <Link href="/" className="font-extrabold text-2xl">
        TODO
      </Link>
      {/* 로그인 상태 분기 */}
      {userInfo ? (
        <div className="flex items-center gap-2">
          <Avatar className="w-8 h-8">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <p className="text-sm font-semibold">{userInfo.username}</p>
          <CustomButton type="filled" onClick={logOutUser}>
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
