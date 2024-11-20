import { supabase } from '@/utils/supabase';

export const fetchAllPages = async () => {
  try {
    const { data, status } = await supabase
      .from('todos')
      .select('*')
      .order('created_at', { ascending: true });

    if (status === 200 && data) {
      return data;
    }
  } catch (error) {
    console.error(error);
  }
};

export const fetchPageById = async (id: number) => {
  try {
    const { data, status } = await supabase.from('todos').select().eq('id', id);

    if (status === 200 && data) {
      return data[0];
    }
  } catch (error) {
    console.error(error);
  }
};

export const createPage = async () => {
  try {
    const { data, status, error } = await supabase
      .from('todos')
      .insert([{ title: '', boards: [], from: null, to: null }])
      .select();

    if (status === 201 && data) {
      setPages([...pages, data[0]]);
      toast({
        title: '페이지 생성이 완료되었습니다.',
        description: `/boards/${data[0].id}`,
      });
      router.push(`/boards/${data[0].id}`);
    }

    if (error) {
      toast({
        variant: 'destructive',
        title: '에러가 발생했습니다.',
        description: '개발자 도구 창을 확인하세요.',
      });
    }
  } catch (error) {
    console.error(error);
  }
};
