import React from 'react';
import ReactPaginate from 'react-paginate';
import { PreviousIcon } from './previous-icon';
import { NextIcon } from './next-icon';

type PaginationProps = {
  className?: string;
  currentPage?: number;
  pageCount: number;
  onPageChange?: (selectedPage: number) => void;
};

export const Pagination: React.FC<PaginationProps> = ({
  className,
  currentPage = 1,
  pageCount,
  onPageChange = () => null,
}) => {
  const pageLinkClassName =
    'inline-flex items-center justify-center px-4 py-2.5 border border-gray-200 text-gray-500 text-sm font-medium hover:bg-gray-50';

  return (
    <ReactPaginate
      breakLabel="..."
      previousLabel={<PreviousIcon className="h-5 w-5" />}
      nextLabel={<NextIcon className="h-5 w-5" />}
      className={['inline-flex rounded-md shadow-md -space-x-px', className]
        .filter(Boolean)
        .join(' ')}
      pageLinkClassName={pageLinkClassName}
      breakLinkClassName={pageLinkClassName}
      previousLinkClassName={`rounded-l-md ${pageLinkClassName}`}
      nextLinkClassName={`rounded-r-md ${pageLinkClassName}`}
      activeLinkClassName="bg-sky-50 border-sky-500 text-sky-600"
      activeClassName="z-10"
      forcePage={currentPage - 1}
      pageCount={pageCount}
      renderOnZeroPageCount={() => null}
      onPageChange={(item) => onPageChange(item.selected + 1)}
    />
  );
};
