'use client';

import { BoardData } from '@/app/types';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  CustomButton,
  DatePicker,
} from '@/components';
import { currentPageAtom, pagesAtom } from '@/store';
import { supabase } from '@/utils/supabase';
import { useAtom } from 'jotai';
import { nanoid } from 'nanoid';
import { ChangeEvent } from 'react';
import { ProgressIndicator } from '@/features';
import { useParams, useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { calculateTimeOffset } from './lib';

function TodoHeader() {
  const { id } = useParams();
  const [currentPage, setCurrentPage] = useAtom(currentPageAtom);
  const [pages, setPages] = useAtom(pagesAtom);
  const { toast } = useToast();
  const router = useRouter();

  const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setCurrentPage((prev) => ({ ...prev, title: input }));
  };

  const onSelectDate = (label: 'from' | 'to', date: Date) => {
    const page = { ...currentPage };

    // 시간 오프셋 계산
    const koreaTime = calculateTimeOffset(date);

    page[label] = koreaTime;
    setCurrentPage(page);
  };

  const onSave = async () => {
    try {
      const { data, status } = await supabase
        .from('todos')
        .update(currentPage)
        .eq('id', id)
        .select();
      if (status === 200 && data) {
        // 현재 페이지 상태 반영
        setCurrentPage({
          ...data[0],
        });

        // 사이드바에 반영하기 위해 전체 페이지에 반영
        const newPageList = pages.map((page) =>
          page.id === Number(id) ? data[0] : page
        );
        setPages(newPageList);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onAddBoard = () => {
    const newBoards: BoardData[] = [...(currentPage.boards || [])];
    const boardContent = {
      id: nanoid(8),
      isCompleted: false,
      title: '',
      from: null,
      to: null,
      contents: '',
    };
    newBoards.push(boardContent);
    setCurrentPage({ ...currentPage, boards: newBoards });
  };

  const onDeletePage = async () => {
    try {
      const { status, error } = await supabase
        .from('todos')
        .delete()
        .eq('id', id);

      if (status === 204) {
        const newPages = pages.filter((page) => page.id !== Number(id));
        setPages(newPages);
        toast({
          title: `${currentPage.title} TODO 삭제가 완료되었습니다.`,
          description: '홈페이지로 이동합니다.',
        });

        router.replace('/');
      }
      if (error) {
        toast({
          variant: 'destructive',
          title: '삭제에 실패했습니다.',
          description: '개발자 도구 창을 확인해주세요.',
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <header className="w-full bg-white  py-4 px-7 flex items-end justify-between">
      <div className="w-full flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <CustomButton type="ghost" className={`w-fit`} onClick={onSave}>
            저장
          </CustomButton>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <CustomButton
                type="text"
                className={`bg-red-100 text-red-500 hover:bg-red-200`}
              >
                전체 삭제
              </CustomButton>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>정말로 삭제하시겠습니까?</AlertDialogTitle>
                <AlertDialogDescription>
                  삭제되면 되돌릴 수 없습니다.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>아니오</AlertDialogCancel>
                <AlertDialogAction onClick={onDeletePage}>예</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
        {/* 제목 입력 영역 */}
        <input
          placeholder="Enter Title Here"
          className="font-extrabold text-5xl h-18 w-[80%] outline-none"
          value={currentPage.title}
          onChange={onChangeTitle}
        />

        {/* 진행도 영역 */}
        <ProgressIndicator />
        {/* 기한 및 버튼 영역 */}
        <div className="w-full flex items-center justify-between gap-5">
          <div className="flex items-center gap-2">
            <DatePicker
              label="From"
              data={currentPage.from}
              onSelect={onSelectDate}
            />
            <DatePicker
              label="To"
              data={currentPage.to}
              onSelect={onSelectDate}
            />
          </div>
          <CustomButton
            type="filled"
            className="w-fit justify-self-end"
            onClick={onAddBoard}
          >
            Add New Board
          </CustomButton>
        </div>
      </div>
    </header>
  );
}

export { TodoHeader };
