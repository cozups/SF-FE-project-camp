'use client';

import Link from 'next/link';
import { Page } from '@/app/types';
import { useParams } from 'next/navigation';

interface Props {
  item: Page;
}

function PageListItem({ item }: Props) {
  const { pageId } = useParams();

  const isFocussed = pageId === item.id;

  return (
    <li>
      <Link
        className={`w-full pl-3 py-2  text-black flex items-center justify-start gap-2 rounded-md ${
          isFocussed ? 'bg-[#F5F5F5]' : 'bg-white'
        }`}
        href={`/page/${item.id}`}
      >
        {/* 아이콘 영역 */}
        <div
          className={`w-[6px] h-[6px] rounded-full ${
            isFocussed ? 'bg-[#00F38D]' : 'bg-neutral-400'
          }`}
        />
        {/* 페이지 타이틀 */}
        {item.title || 'Enter Title Here'}
      </Link>
    </li>
  );
}

export { PageListItem };
