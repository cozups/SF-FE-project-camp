import axios from 'axios';
import { atom } from 'jotai';

export const pageAtom = atom<number>(1);
export const searchValueAtom = atom<string>('korea');
export const totalImageNumAtom = atom<number>(10000);

export const fetchApi = async (
  searchValue: string,
  page: number,
  per_page: number = 30
) => {
  const API_KEY = 'CeBFxgJb2rHJd0NkK9PjO2cPVSctanngiAVazhwTfaA';
  const BASE_URL = 'https://api.unsplash.com/search/photos';

  try {
    const res = await axios.get(
      `${BASE_URL}?client_id=${API_KEY}&page=${page}&query=${searchValue}&per_page=${per_page}`
    );
    return res;
  } catch (error) {
    console.error(error);
  }
};
