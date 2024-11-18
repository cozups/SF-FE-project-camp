import { Header, Nav, PaginationFooter } from '@/components/common';
import { ImageCard } from '@/components/Home';
import { SearchBar } from '@/components/ui';
import { useToast } from '@/hooks/use-toast';
import {
  fetchApi,
  pageAtom,
  searchValueAtom,
  totalImageNumAtom,
} from '@/store';
import { ImageCardType } from '@/types';
import { useAtom } from 'jotai';
import {
  ChangeEvent,
  KeyboardEvent,
  useCallback,
  useEffect,
  useState,
} from 'react';

function HomePage() {
  const [imageList, setImageList] = useState<ImageCardType[]>([]);
  const { toast } = useToast();

  const [page, setPage] = useAtom(pageAtom);
  const [, setTotalImageNum] = useAtom(totalImageNumAtom);
  const [searchValue, setSearchValue] = useAtom(searchValueAtom);
  const [inputValue, setInputValue] = useState('');

  const onKeyDownEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setSearchValue(inputValue);
    }
  };

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const fetchImages = useCallback(async () => {
    try {
      const res = await fetchApi(searchValue, page);

      if (res && res.status === 200 && res.data) {
        console.log(res.data);
        setImageList(res.data.results);
        setTotalImageNum(res.data.total);
        toast({
          title: `${page}번째 페이지의 이미지 호출 성공!`,
        });
      } else {
        toast({
          variant: 'destructive',
          title: '이미지 호출 실패!',
          description: '필수 파라미터 값을 확인해주세요.',
        });
      }
    } catch (error) {
      console.error(error);
    }
  }, [page, searchValue, toast, setTotalImageNum]);

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  return (
    <div className="page">
      <div className="page__container">
        <Header />
        <Nav />
        <div className="page__container__wallpaper">
          <img
            src="/src/assets/images/wallpaper.png"
            alt=""
            className="bg-image"
          />
          <div className="search-box">
            <h3 className="scroll-m-20 text-4xl font-extrabold tracking-tight text-white">
              프로젝트 02: 오픈 API를 활용한 이미지 검색 사이트 만들기
            </h3>
            <div className="flex flex-col w-full mt-5 mb-2">
              <h4 className="scroll-m-20 text-md text-white font-semibold tracking-tight">
                인터넷 시각자료 출처입니다.
              </h4>
              <h4 className="scroll-m-20 text-md text-white font-semibold tracking-tight">
                모든 지역에 있는 크리에이터들의 지원을 받습니다.
              </h4>
            </div>
            <SearchBar
              placeholder="원하는 이미지를 검색하세요."
              onChange={onChangeInput}
              onKeyDown={onKeyDownEnter}
              value={inputValue}
            />
          </div>
        </div>
        <div className="page__container__contents">
          {imageList.map((image) => (
            <ImageCard key={image.id} data={image} />
          ))}
        </div>
      </div>
      <PaginationFooter />
    </div>
  );
}

export default HomePage;
