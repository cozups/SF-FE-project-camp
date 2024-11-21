'use client';
import { useParams } from 'next/navigation';

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
} from '@/components';
import { useDeletePage } from '@/shared/api/delete';

function DeleteAlertButton() {
  const [deletePage] = useDeletePage();
  const { id } = useParams();

  return (
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
          <AlertDialogAction onClick={() => deletePage(id)}>
            예
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export { DeleteAlertButton };
