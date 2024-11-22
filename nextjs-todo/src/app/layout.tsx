import type { Metadata } from 'next';
import { Noto_Sans_KR } from 'next/font/google';
import './styles/globals.css';
import './styles/main.scss';
import { PageHeader, SideBar } from '@/features';
import { Toaster } from '@/components';

const NOTO_SANS_KR = Noto_Sans_KR({
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'NEXT.js 프로젝트',
  description: 'Shadcn UI + NEXT.js TODO-BOARD 만들기',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${NOTO_SANS_KR.className}`}>
        <Toaster />
        <div className="page">
          <PageHeader />
          <div className="w-full h-[calc(100%-56px)] flex items-center">
            <div className="page__aside">
              <SideBar />
            </div>
            <div className="page__main">
              <div className="w-full h-full flex justify-center">
                {children}
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
