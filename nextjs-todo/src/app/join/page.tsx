'use client';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { useToast } from '@/hooks/use-toast';

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

interface JoinData {
  username: string;
  email: string;
  password: string;
}

function JoinPage() {
  const form = useForm({
    defaultValues: { username: '', email: '', password: '' },
  });
  const { toast } = useToast();
  const router = useRouter();

  const onSubmit = async (formData: JoinData) => {
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
      if (data) {
        toast({
          title: '회원가입에 성공했습니다.',
        });
        router.replace('/login');
      }
      if (error) {
        toast({
          variant: 'destructive',
          title: '회원가입에 실패했습니다.',
          description: '입력 정보를 확인해주세요.',
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
                  <Input type="password" placeholder="비밀번호" {...field} />
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
