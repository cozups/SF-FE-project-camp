'use client';

import { CustomButton } from '@/components';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <h3 className="scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-5xl my-4">
        안녕하세요🤚🏻
      </h3>
      <div className="text-center mb-4">
        <p className="leading-7">
          <span>TODO 관리 앱</span>에 방문해주셔서 감사합니다.
        </p>
        <p className="leading-7">서비스를 이용하려면 로그인 해주세요.</p>
      </div>
      <div className="flex items-center gap-2">
        <CustomButton
          type="filled"
          onClick={() => {
            router.push('/login');
          }}
        >
          로그인하기
        </CustomButton>
        <CustomButton
          type="ghost"
          onClick={() => {
            router.push('/join');
          }}
        >
          회원 가입하기
        </CustomButton>
      </div>
    </div>
  );
}
