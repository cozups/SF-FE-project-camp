'use client';

import { Todo } from '@/entities/todos';
import Link from 'next/link';
import { useParams } from 'next/navigation';

interface Props {
  item: Todo;
}

function PageListItem({ item }: Props) {
  const { id } = useParams();

  const isFocussed = Number(id) === item.id;

  return (
    <li>
      <Link
        className={`w-full pl-3 py-2  text-black flex items-center justify-start gap-2 rounded-md ${
          isFocussed ? 'bg-[#F5F5F5]' : 'bg-white'
        }`}
        href={`/boards/${item.id}`}
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
