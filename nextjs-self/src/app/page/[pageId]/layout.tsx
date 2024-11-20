import { DetailPageHeader } from '@/features';
import React from 'react';

function DetailPageLayout({
  params,
  children,
}: Readonly<{
  params: Promise<{ pageId: string }>;
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full h-full flex flex-col">
      <DetailPageHeader params={params} />
      {children}
    </div>
  );
}

export default DetailPageLayout;
