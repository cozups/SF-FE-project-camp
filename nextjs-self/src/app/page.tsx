'use client';
import { useAtom } from 'jotai';
import { nanoid } from 'nanoid';
import { useRouter } from 'next/navigation';

import { CustomButton } from '@/components';
import { defaultPage, pagesAtom } from '@/store';

export default function Home() {
  const router = useRouter();
  const [pages, setPages] = useAtom(pagesAtom);

  const onAddPage = () => {
    const newId = nanoid(8);
    pages.push({ ...defaultPage, id: newId });
    setPages([...pages]);
    router.push(`/page/${newId}`);
  };

  return (
    <div className="w-fit h-full flex flex-col items-center justify-center text-center gap-5">
      <h1 className="font-bold text-3xl">How to start:</h1>
      <div className="text-lg font-medium">
        <p>1. Create a page</p>
        <p>2. Add boards to page</p>
      </div>
      <CustomButton type="secondary" onClick={onAddPage}>
        Add new page
      </CustomButton>
    </div>
  );
}
