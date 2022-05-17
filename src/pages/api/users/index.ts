import type { NextApiRequest, NextApiResponse } from 'next';
import type { UserResponse } from 'types';
import { requestUsers } from '@/libs';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<UserResponse>
) {
  const data = await requestUsers(req.query);

  res.status(200).json(data);
}
