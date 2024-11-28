import { supabase } from '@/utils/supabase';

export const fetchAllTodos = async (userId: string) => {
  try {
    const { data, status } = await supabase
      .from('todos')
      .select('*')
      .eq('author_id', userId)
      .order('created_at', { ascending: true });

    if (status === 200 && data) {
      return data;
    }
    throw new Error('TODO를 가져오는 데 실패했습니다.');
  } catch (error) {
    throw error;
  }
};
