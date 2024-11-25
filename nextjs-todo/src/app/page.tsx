'use client';

import { CustomButton } from '@/components';
import { useTodos } from '@/hooks/supabase';

export default function Home() {
  const { createTodo } = useTodos();

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
