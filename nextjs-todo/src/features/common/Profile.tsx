'use client';
import { useForm } from 'react-hook-form';

import { UserInfo } from '@/app/types';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  DialogHeader,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  Button,
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  Input,
  FormMessage,
  DialogClose,
} from '@/components';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/supabase';
import { supabase } from '@/utils/supabase';

interface Props {
  userInfo: UserInfo;
}

function Profile({ userInfo }: Props) {
  const form = useForm({ defaultValues: { username: userInfo.username } });
  const { toast } = useToast();
  const { fetchUser } = useAuth();

  const updateUser = async (formData: { username: string }) => {
    try {
      const { data, error } = await supabase.auth.updateUser({
        data: formData,
      });

      if (data) {
        toast({
          title: '프로필이 업데이트 되었습니다.',
        });
        fetchUser();
      }
      if (error) {
        toast({
          title: '프로필 업데이트에 실패했습니다.',
          description: '개발자 도구 창을 확인하세요.',
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex items-center gap-2  rounded hover:bg-neutral-100 px-2 py-1 cursor-pointer">
          <Avatar className="w-8 h-8">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <p className="text-sm font-semibold">{userInfo.username}</p>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <div className="flex items-center gap-4 px-2 py-1">
              <Avatar className="w-16 h-16">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="flex flex-col justify-center">
                <p className="text-2xl font-semibold">{userInfo.username}</p>
                <p className="text-sm font-light">{userInfo.email}</p>
              </div>
            </div>
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(updateUser)}
            className="h-fit px-8 py-4 bg-white rounded-xl flex flex-col justify-center gap-2"
          >
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>이름</FormLabel>
                  <FormControl>
                    <Input placeholder="이름을 입력하세요." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogClose asChild>
              <Button type="submit" className="self-end mt-4">
                저장
              </Button>
            </DialogClose>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export { Profile };
