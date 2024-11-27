'use client';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogFooter,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from '@/components';
import { useAuth } from '@/hooks/supabase';

const formSchema = z.object({
  email: z.string().email({
    message: '이메일 형식이 아닙니다.',
  }),
});

function ResetForm() {
  const resetForm = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: '' },
  });
  const { resetSendEmail } = useAuth();

  const onReset = (formData: z.infer<typeof formSchema>) => {
    resetSendEmail(formData.email);
  };

  return (
    <Form {...resetForm}>
      <form
        onSubmit={resetForm.handleSubmit(onReset)}
        className="w-full flex flex-col items-center justify-center"
      >
        <FormField
          control={resetForm.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="이메일" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <AlertDialogFooter className="mt-4 self-end">
          <AlertDialogCancel>취소</AlertDialogCancel>
          <AlertDialogAction type="submit">초기화하기</AlertDialogAction>
        </AlertDialogFooter>
      </form>
    </Form>
  );
}

export { ResetForm };
