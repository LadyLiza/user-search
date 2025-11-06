import axios from 'axios';
import { User } from '../types/User';

const API_URL = 'https://jsonplaceholder.typicode.com/users';

export const fetchUsers = async (): Promise<User[]> => {
  try {
    const response = await axios.get<User[]>(API_URL, { timeout: 5000 });
    return response.data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {

      if (error.code === 'ECONNABORTED') {
        throw new Error('Request timed out - please try again later');
      }

      if (error.response?.status === 404) {
        throw new Error('User data not found');
      }

      if (error.request && !error.response) {
        throw new Error('Network error - please check your internet connection');
      }
    }

    throw new Error('Unexpected error');
  }
};
