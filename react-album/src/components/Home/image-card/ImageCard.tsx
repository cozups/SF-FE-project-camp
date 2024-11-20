import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui';
import { useToast } from '@/hooks/use-toast';
import { bookmarkAtom } from '@/store';
import { ImageCardType } from '@/types';
import { useAtom } from 'jotai';
import {
  AlignLeft,
  Bookmark,
  ClipboardPenLine,
  FolderOpen,
  Heart,
  Pin,
  Trash,
} from 'lucide-react';
import { useEffect } from 'react';

interface Props {
  data: ImageCardType;
}

function ImageCard({ data }: Props) {
  const { toast } = useToast();
  const [bookmark, setBookmark] = useAtom(bookmarkAtom);

  useEffect(() => {
    setBookmark(JSON.parse(localStorage.getItem('bookmark') || '[]'));
  }, [setBookmark]);

  const isIncluded =
    bookmark.findIndex((item: ImageCardType) => item.id === data.id) > -1;

  const onAddBookmark = () => {
    if (!bookmark.length) {
      localStorage.setItem('bookmark', JSON.stringify([data]));
      setBookmark([data]);
      toast({
        title: '북마크 추가 성공하였습니다.',
      });
    } else {
      if (isIncluded) {
        toast({
          variant: 'destructive',
          title: '이미지가 이미 북마크 되어 있습니다.',
        });
      } else {
        localStorage.setItem('bookmark', JSON.stringify([...bookmark, data]));
        setBookmark([...bookmark, data]);
        toast({
          title: '북마크 추가 성공하였습니다.',
        });
      }
    }
  };

  const onClickDeleteBookmark = () => {
    const deletedBookmark = bookmark.filter((item) => item.id !== data.id);

    localStorage.setItem('bookmark', JSON.stringify(deletedBookmark));
    setBookmark(deletedBookmark);
    toast({
      title: '북마크가 삭제되었습니다.',
    });
  };

  return (
    <div className="w-64 h-64 flex flex-col justify-between cursor-pointer space-y-3">
      <div className="relative flex flex-col gap-3">
        {isIncluded && (
          <Button
            size="icon"
            className=" absolute bg-neutral-500 bg-opacity-50 top-2 right-16 z-10"
            onClick={onClickDeleteBookmark}
          >
            <Trash className="h-5" />
          </Button>
        )}
        <Dialog>
          <DialogTrigger asChild>
            <Button
              size={'icon'}
              className="absolute top-2 right-4 z-10 bg-neutral-500 bg-opacity-50 hover:bg-opacity-50"
            >
              <FolderOpen className="h-5" />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-xl">
            <DialogHeader className="flex flex-row items-center justify-between">
              <div>
                <DialogTitle>이미지 상세 정보</DialogTitle>
                <DialogDescription>
                  선택한 이미지의 상세 정보를 확인하세요.
                </DialogDescription>
              </div>
            </DialogHeader>
            <div className="flex flex-col items-center space-x-2 gap-3">
              <img
                src={data.urls.full}
                alt={data.alt_description}
                className="w-full h-80 rounded-xl object-cover"
              />
              {/* <Skeleton className="w-full h-80 rounded-xl" /> */}
              <div className="flex flex-col justify-start gap-2 w-full">
                <div className="flex items-center gap-2">
                  <Avatar>
                    <AvatarImage
                      src={data.user.profile_image.small}
                      alt={data.user.username}
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <small className="text-sm font-medium leading-none">
                    {data.user.username}
                  </small>
                </div>
                <div className="flex flex-col w-full gap-2">
                  <div className="flex items-center">
                    <Pin className="h-4 w-4 mt-[2px] mr-1 min-w-4" />
                    <span className="text-sm">{data.alternative_slugs.ko}</span>
                  </div>
                  <div className="flex items-center">
                    <ClipboardPenLine className="h-4 w-4 mt-[2px] mr-1 min-w-4" />
                    <span className="text-sm">{data.alt_description}</span>
                  </div>
                  <div className="flex items-center">
                    <AlignLeft className="h-4 w-4 mt-[2px] mr-1 min-w-4" />
                    <span className="text-sm">
                      {data.description || '등록된 묘사 및 설명글이 없습니다.'}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between w-full">
                {/* 북마크 추가 */}
                <Bookmark
                  className={`cursor-pointer active:text-blue-500`}
                  fill={isIncluded ? 'black' : 'white'}
                  onClick={onAddBookmark}
                />
                <div className="flex items-center gap-4">
                  {/* 게시일 */}
                  <div className="flex items-center gap-1 text-sm">
                    <span>게시일:</span>
                    2024-11-15
                  </div>
                  {/* 좋아요 수 */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-sm">
                      <Heart
                        className="h-[14px] mt-[2px] text-rose-600"
                        fill="#e11d48"
                      />
                      550
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
        {/* 이미지 데이터 불러오기 전 */}
        {/* <Skeleton className="w-[250px] h-[150px] rounded-xl" /> */}
        {/* 이미제 데이터 불러온 후 */}
        <img
          src={data.urls.small}
          alt={data.alt_description}
          className="w-[250px] h-[150px] rounded-xl object-cover"
        />
        <small className="w-full gap-1 text-sm font-medium line-clamp-2">
          {data.alt_description || '등록된 묘사 및 설명글이 없습니다.'}
        </small>
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between w-full">
          {/* 게시일 */}
          <div className="flex items-center gap-1 text-sm">
            <span>게시일:</span>
            {data.created_at.split('T')[0]}
          </div>
          {/* 좋아요 수 */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1 text-sm">
              <Heart
                className="h-[14px] mt-[2px] text-rose-600"
                fill="#e11d48"
              />
              {data.likes.toLocaleString()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export { ImageCard };
