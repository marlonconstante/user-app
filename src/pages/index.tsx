import { useState } from 'react';
import type { NextPage } from 'next';
import type { User } from 'types';
import { SearchInput, UserTable } from '@/components';

type HomeProps = {
  allUsers: User[];
};

const Home: NextPage<HomeProps> = ({ allUsers }) => {
  const [users, setUsers] = useState<User[]>(allUsers);

  function filterUsers(term: string) {
    setUsers(
      allUsers.filter(
        ({ name, age }) =>
          name.toLowerCase().includes(term.toLowerCase()) ||
          String(age).startsWith(term)
      )
    );
  }

  return (
    <div className="w-1/2 h-screen p-6 m-auto">
      <SearchInput className="mb-4" onChange={filterUsers} />
      <UserTable users={users} />
    </div>
  );
};

export async function getStaticProps() {
  const allUsers = await fetch(`${process.env.HOST_URL}/api/users`).then(
    (response) => response.json()
  );

  return {
    props: { allUsers },
  };
}

export default Home;
