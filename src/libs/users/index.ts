import cache from 'memory-cache';
import type { ParsedUrlQuery } from 'querystring';
import type { User, UserResponse } from 'types';
import { getQueryParam } from '../helpers';

const MILLIS_IN_HOUR = 1000 * 60 * 60;

export function fetchUsers(): Promise<User[]> {
  const url = `${process.env.EXTERNAL_API_URL}/users`;

  const cachedUsers = cache.get(url);
  if (cachedUsers) {
    return Promise.resolve(cachedUsers);
  }

  return fetch(url)
    .then((response) => response.json())
    .then(({ data }: { data: User[] }) => {
      cache.put(url, data, MILLIS_IN_HOUR);

      return data;
    });
}

export async function requestUsers(
  query: ParsedUrlQuery
): Promise<UserResponse> {
  const page = Number(getQueryParam(query.page)) || 1;
  const size = Number(getQueryParam(query.size)) || 10;
  const filter = getQueryParam(query.filter);

  const filteredUsers = await fetchUsers().then((users) =>
    users.filter(
      ({ name, age }) =>
        !filter ||
        name.toLowerCase().includes(filter.toLowerCase()) ||
        String(age).startsWith(filter)
    )
  );

  return {
    filter,
    page,
    size,
    total: filteredUsers.length,
    users: filteredUsers.slice((page - 1) * size, page * size),
  };
}
