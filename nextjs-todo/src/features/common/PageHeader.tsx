import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  CustomButton,
} from '@/components';
import Link from 'next/link';

function PageHeader() {
  return (
    <header className="w-full h-14 flex justify-between items-center px-4 py-2 border-b">
      <Link href="/" className="font-extrabold text-2xl">
        TODO
      </Link>
      {/* 로그인 상태 분기 */}
      <div className="flex items-center gap-2">
        <Avatar className="w-8 h-8">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <p className="text-sm font-semibold">미소</p>
      </div>
      <div className="flex items-center gap-2">
        <Link href="/join">
          <CustomButton type="ghost">회원가입</CustomButton>
        </Link>
        <Link href="/login">
          <CustomButton type="filled">로그인</CustomButton>
        </Link>
      </div>
    </header>
  );
}

export { PageHeader };
