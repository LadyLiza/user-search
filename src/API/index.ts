import { User } from '@/types/user';
import { USERS_URL } from '@/constants/api';
import { get } from '@/utils/http';

export const fetchUsers = async (): Promise<User[]> => {
  return await get<User[]>(USERS_URL);
};