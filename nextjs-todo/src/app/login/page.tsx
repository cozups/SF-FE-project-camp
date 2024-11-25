'use client';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from '@/hooks/use-toast';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { supabase } from '@/utils/supabase';
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
import { useAuth } from '@/shared/api';

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
  const router = useRouter();
  const { fetchUser } = useAuth();

  const onSubmit = async (formData: z.infer<typeof formSchema>) => {
    const { email, password } = formData;
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (data.user && data.session) {
        toast({
          title: '로그인에 성공하였습니다.',
        });
        fetchUser();
        router.replace('/');
      }
      if (error) {
        toast({
          variant: 'destructive',
          title: '로그인에 실패하였습니다.',
          description: '입력 정보를 확인하세요.',
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex justify-center items-center">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="h-fit px-8 py-4 bg-white rounded-xl flex flex-col items-center justify-center gap-2"
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
        </form>
      </Form>
    </div>
  );
}

export default LoginPage;
