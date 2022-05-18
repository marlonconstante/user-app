import { useRef, useState, useEffect } from 'react';
import type { NextPage, GetServerSideProps } from 'next';
import type { User, UserResponse } from 'types';
import { usePrevious } from '@/hooks';
import { SearchInput, UserTable, Pagination } from '@/components';

type HomeProps = UserResponse;

const Home: NextPage<HomeProps> = ({ filter, total, size, page, users }) => {
  const searchableRef = useRef<boolean>(false);
  const controllerRef = useRef<AbortController>();
  const [searchTerm, setSearchTerm] = useState<string>(filter);
  const prevSearchTerm = usePrevious<string>(searchTerm);
  const [pageCount, setPageCount] = useState<number>(Math.ceil(total / size));
  const [currentPage, setCurrentPage] = useState<number>(page);
  const [currentUsers, setCurrentUsers] = useState<User[]>(users);
  const nextPage = searchTerm !== prevSearchTerm ? '1' : currentPage.toString();

  useEffect(() => {
    if (searchableRef.current) {
      controllerRef.current?.abort();
      controllerRef.current = new AbortController();

      const query = new URLSearchParams();
      query.set('page', nextPage);
      query.set('size', size.toString());
      if (searchTerm) query.set('filter', searchTerm);

      const url = `/api/users?${query.toString()}`;
      const { signal } = controllerRef.current;

      fetch(url, { signal })
        .then((response) => response.json())
        .then((data: UserResponse) => {
          setPageCount(Math.ceil(data.total / data.size));
          setCurrentPage(data.page);
          setCurrentUsers(data.users);
          history.pushState({}, '', `?${query.toString()}`);
        })
        .catch((error: Error) => console.log(error.message));
    } else {
      searchableRef.current = true;
    }
  }, [searchTerm, nextPage, size]);

  return (
    <div className="w-1/2 h-screen p-6 m-auto">
      <SearchInput
        className="mb-4"
        value={searchTerm}
        onChange={setSearchTerm}
      />
      <UserTable className="mb-4" users={currentUsers} />
      <Pagination
        currentPage={currentPage}
        pageCount={pageCount}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  function getBaseURL() {
    const { host = 'localhost' } = context.req.headers;
    const protocol = host.includes('localhost') ? 'http' : 'https';
    return `${protocol}://${host}`;
  }

  const query = new URLSearchParams(context.query as Record<string, string>);
  const url = `${getBaseURL()}/api/users?${query.toString()}`;
  const data = await fetch(url).then((response) => response.json());

  return {
    props: data as HomeProps,
  };
};

export default Home;
