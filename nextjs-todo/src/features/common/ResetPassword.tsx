import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components';
import { ResetForm } from './ResetForm';

function ResetPassword() {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button className="text-xs text-gray-500 mt-2 underline">
          비밀번호를 잊으셨나요? 비밀번호 찾기
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent className="flex flex-col items-center justify-center">
        <AlertDialogHeader className="self-start">
          <AlertDialogTitle>비밀번호 다시 설정하기</AlertDialogTitle>
          <AlertDialogDescription>
            변경할 비밀번호를 입력하세요
          </AlertDialogDescription>
        </AlertDialogHeader>
        <ResetForm />
      </AlertDialogContent>
    </AlertDialog>
  );
}

export { ResetPassword };
