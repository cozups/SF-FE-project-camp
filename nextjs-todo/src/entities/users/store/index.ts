import { atomWithStorage } from 'jotai/utils';
import { User } from '../types';

export const userInfoAtom = atomWithStorage<User | null>('user', null);
