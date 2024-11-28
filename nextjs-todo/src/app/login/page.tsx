'use client';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

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
import Link from 'next/link';
import { Separator } from '@radix-ui/react-separator';
import { ResetPassword } from '@/features';

const formSchema = z.object({
  email: z.string().email({
    message: '이메일 형식이 아닙니다.',
  }),
  password: z.string().min(6, {
    message: '6자 이상의 비밀번호를 입력하세요.',
  }),
});

function LoginPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: '', password: '' },
  });

  const { logInUser, logInWithKakao } = useAuth();

  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <div className="w-72 h-fit px-8 py-4 bg-neutral-50 rounded-xl flex flex-col items-center justify-center gap-2 shadow-md">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(logInUser)}
            className="w-56 flex flex-col items-center justify-center"
          >
            <h3 className="text-2xl font-bold mb-4">로그인</h3>
            <FormField
              control={form.control}
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
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="비밀번호" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full mt-4">
              로그인
            </Button>
            <Separator />
          </form>
        </Form>
        <div className="w-56 flex flex-col items-center justify-center">
          <button
            className="bg-yellow-300 w-full rounded py-2 text-sm"
            onClick={logInWithKakao}
          >
            카카오 로그인하기
          </button>
          <ResetPassword />
          <Link href="/join" className="text-xs text-gray-500 my-2 underline">
            계정이 없으신가요? 회원 가입하기
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
