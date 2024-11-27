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
import { useAuth } from '@/hooks/supabase';

interface Props {
  userInfo: UserInfo;
}

function Profile({ userInfo }: Props) {
  const form = useForm({
    defaultValues: {
      user_name: userInfo.user_name,
      phone_number: userInfo.phone_number || '',
    },
  });
  const { updateUser } = useAuth();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex items-center gap-2  rounded hover:bg-neutral-100 px-2 py-1 cursor-pointer">
          <Avatar className="w-8 h-8">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <p className="text-sm font-semibold">{userInfo.user_name}</p>
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
                <p className="text-2xl font-semibold">{userInfo.user_name}</p>
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
              name="user_name"
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

            <FormField
              control={form.control}
              name="phone_number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>전화번호</FormLabel>
                  <FormControl>
                    <Input placeholder="010-XXXX-XXXX" {...field} />
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
