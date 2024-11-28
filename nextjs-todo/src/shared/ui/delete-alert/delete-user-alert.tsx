'use client';

import { useAuth } from '@/hooks/supabase';
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
} from '../dialogs/alert-dialog';
import { Button } from '../buttons/button';

function DeleteUserAlert() {
  const { deleteUser } = useAuth();

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className={`bg-red-50 text-red-500 hover:bg-red-200`}>
          회원 탈퇴
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>정말로 탈퇴하시겠습니까?</AlertDialogTitle>
          <AlertDialogDescription>
            이 서비스는 가입해야 사용할 수 있습니다.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>아니오</AlertDialogCancel>
          <AlertDialogAction onClick={deleteUser}>예</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export { DeleteUserAlert };
