import React from 'react';
import type { User } from 'types';

type UserTableProps = {
  className?: string;
  users: User[];
};

export const UserTable: React.FC<UserTableProps> = ({ className, users }) => {
  return (
    <table
      className={['min-w-full overflow-hidden shadow rounded-md', className]
        .filter(Boolean)
        .join(' ')}
    >
      <thead className="bg-gray-100 border-b-2 border-gray-200">
        <tr>
          <th className="w-3/4 px-5 py-2.5 text-left font-bold">Nome</th>
          <th className="px-5 py-2.5 text-left font-bold">Idade</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200">
        {users.map(({ name, age }, index) => (
          <tr key={`user-${index + 1}`}>
            <td className="px-5 py-2.5">{name}</td>
            <td className="px-5 py-2.5">{age}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
