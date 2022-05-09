import type { NextApiRequest, NextApiResponse } from 'next';
import type { User, UserResponse } from 'types';

function fetchUsers(): Promise<User[]> {
  return fetch(process.env.USER_API_URL)
    .then((response) => response.json())
    .then(({ data }: UserResponse) => data);
}

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse<User[]>
) {
  const users = await fetchUsers();
  res.status(200).json(users);
}
