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
} from '@/components';
import { useAuth } from '@/hooks/supabase';
import Link from 'next/link';

const formSchema = z.object({
  username: z.string().min(1, {
    message: '1글자 이상의 이름이 필요합니다.',
  }),
  email: z.string().email({
    message: '이메일 형식이 아닙니다.',
  }),
  password: z.string().min(6, {
    message: '6글자 이상의 비밀번호가 필요합니다.',
  }),
});

function JoinPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { username: '', email: '', password: '' },
  });
  const { joinUser } = useAuth();

  return (
    <div className="w-full h-full flex justify-center items-center">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(joinUser)}
          className="h-fit px-8 py-4 bg-neutral-50 rounded-xl flex flex-col items-center justify-center gap-2 shadow-md"
        >
          <h3 className="text-2xl font-bold mb-4">회원가입</h3>
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>이름</FormLabel>
                <FormControl>
                  <Input placeholder="사용할 이름을 입력하세요." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
                  <Input
                    type="password"
                    placeholder="6자 이상의 비밀번호"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full mt-4">
            회원가입
          </Button>
          <Link href="/login" className="text-xs text-gray-500 my-2 underline">
            로그인하러 가기
          </Link>
        </form>
      </Form>
    </div>
  );
}

export default JoinPage;
