import cache from 'memory-cache';
import type { NextApiRequest, NextApiResponse } from 'next';
import type { User, UserResponse } from 'types';

const MILLIS_IN_HOUR = 1000 * 60 * 60;

function fetchUsers(): Promise<User[]> {
  const url = `${process.env.EXTERNAL_API_URL}/users`;

  const cachedUsers = cache.get(url);
  if (cachedUsers) {
    return cachedUsers;
  }

  return fetch(url)
    .then((response) => response.json())
    .then(({ data }: UserResponse) => {
      cache.put(url, data, MILLIS_IN_HOUR);

      return data;
    });
}

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse<User[]>
) {
  const users = await fetchUsers();
  res.status(200).json(users);
}
