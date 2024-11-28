import { SideBar } from '@/widgets';
import { ReactNode } from 'react';

function BoardLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <div className="page__aside">
        <SideBar />
      </div>
      <div className="page__main">
        <div className="w-full h-full flex justify-center">{children}</div>
      </div>
    </>
  );
}

export default BoardLayout;
