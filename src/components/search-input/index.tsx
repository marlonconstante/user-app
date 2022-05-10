import React from 'react';
import { Magnifier } from './magnifier';

type SearchInputProps = {
  className?: string;
  onChange?: (term: string) => void;
};

export const SearchInput: React.FC<SearchInputProps> = ({
  className,
  onChange = () => null,
}) => {
  return (
    <label className={['relative block', className].filter(Boolean).join(' ')}>
      <span className="sr-only">Pesquisar</span>
      <span className="absolute inset-y-0 left-0 flex items-center pl-2">
        <Magnifier className="h-5 w-5 fill-gray-400" />
      </span>
      <input
        className="block w-full bg-white border border-gray-300 rounded-md py-2 pl-9 pr-3 shadow placeholder:text-gray-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1"
        placeholder="Pesquisar..."
        type="text"
        name="search"
        onChange={(event) => onChange(event.target.value)}
      />
    </label>
  );
};
