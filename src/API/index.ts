import { User } from "@/types/user";
import { get } from "@/utils/http";

export const fetchUsers = async (): Promise<User[]> => {
  return await get<User[]>("/users123");
};