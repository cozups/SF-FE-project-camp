import { Header, Nav } from '@/components/common';
import { ImageCard } from '@/components/Home';
import { ImageCardType } from '@/types';
import { useEffect, useState } from 'react';

function BookmarkPage() {
  const [bookmark, setBookmark] = useState<ImageCardType[]>([]);

  useEffect(() => {
    const storedBookmark = JSON.parse(localStorage.getItem('bookmark') || '[]');
    setBookmark(storedBookmark);
  }, [bookmark]);

  return (
    <div className="page">
      <div className="page__container">
        <Header />
        <Nav />
        {bookmark.length ? (
          <div className="page__container__contents">
            {bookmark.map((image) => (
              <ImageCard key={image.id} data={image} />
            ))}
          </div>
        ) : (
          <div className="w-full h-[800px] flex items-center justify-center">
            <h3 className="text-2xl font-bold">북마크가 없습니다.</h3>
          </div>
        )}
      </div>
    </div>
  );
}

export default BookmarkPage;
