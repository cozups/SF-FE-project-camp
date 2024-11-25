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
  const router = useRouter();
  const { fetchUser } = useAuth();

  const onSubmit = async (formData: z.infer<typeof formSchema>) => {
    const { username, email, password } = formData;

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            username,
          },
        },
      });

      if (data.user && data.session) {
        toast({
          title: '회원가입에 성공했습니다.',
        });
        fetchUser();
        router.replace('/');
      }
      if (error) {
        if (error.code === 'user_already_exists') {
          toast({
            variant: 'destructive',
            title: '이미 존재하는 이메일입니다.',
            description: '다른 이메일을 사용해주세요.',
          });
        } else {
          toast({
            variant: 'destructive',
            title: '회원가입에 실패했습니다.',
            description: '입력 정보를 확인해주세요.',
          });
        }
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
        </form>
      </Form>
    </div>
  );
}

export default JoinPage;
