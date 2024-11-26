'use client';

import React, { useEffect } from 'react';

import { CustomButton } from '@/components';
import { useAuth, useTodos } from '@/hooks/supabase';
import { useRouter } from 'next/navigation';
import { toast } from '@/hooks/use-toast';

function BoardsPage() {
  const { createTodo } = useTodos();
  const { userInfo } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!userInfo) {
      toast({
        variant: 'destructive',
        title: '로그인이 필요합니다.',
        description: '로그인 페이지로 이동합니다.',
      });
      router.replace('/login');
    }
  }, [userInfo, router]);

  return (
    <div className="w-fit h-full flex flex-col items-center justify-center text-center gap-5">
      <h1 className="font-bold text-3xl">How to start:</h1>
      <div className="text-lg font-medium">
        <p>1. Create a page</p>
        <p>2. Add boards to page</p>
      </div>
      <CustomButton type="secondary" onClick={createTodo}>
        Add new page
      </CustomButton>
    </div>
  );
}

export default BoardsPage;
