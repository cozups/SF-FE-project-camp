'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from '@/shared';
import { useAuth } from '@/hooks/supabase';
import { toast } from '@/hooks/use-toast';

const formSchema = z.object({
  newPassword: z.string().min(6, {
    message: '6자 이상의 비밀번호를 입력하세요',
  }),
  newPasswordConfirm: z.string().min(6, {
    message: '6자 이상의 비밀번호를 입력하세요',
  }),
});

function ResetPasswordPage() {
  const resetForm = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { newPassword: '', newPasswordConfirm: '' },
  });
  const { resetPassword } = useAuth();

  const onReset = (formData: z.infer<typeof formSchema>) => {
    if (formData.newPassword !== formData.newPasswordConfirm) {
      toast({
        variant: 'destructive',
        title: '비밀번호가 일치하지 않습니다!',
      });
      return;
    }
    resetPassword(formData);
  };

  return (
    <div className="w-full flex items-center justify-center">
      <Form {...resetForm}>
        <form
          onSubmit={resetForm.handleSubmit(onReset)}
          className="w-56 flex flex-col items-center justify-center gap-2"
        >
          <h3 className="text-2xl font-bold mb-4">비밀번호 재설정</h3>
          <FormField
            control={resetForm.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>새로운 비밀번호</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="새로운 비밀번호"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={resetForm.control}
            name="newPasswordConfirm"
            render={({ field }) => (
              <FormItem>
                <FormLabel>새로운 비밀번호 확인</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="새로운 비밀번호 확인"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full mt-2">
            설정하기
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default ResetPasswordPage;
