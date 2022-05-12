export type User = {
  name: string;
  age: number;
};

export type UserResponse = {
  filter: string;
  page: number;
  size: number;
  total: number;
  users: User[];
};
