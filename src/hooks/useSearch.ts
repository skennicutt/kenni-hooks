import * as React from 'react';

interface IUseSearchProps<Type> {
  allOptions: Type[];
  preSelectedOptions?: Type[];
  searchFunction?: (object: any, value: any) => boolean;
}
interface IUseSearchResult<Type extends any> {
  search: (value: any) => void;
  searchResults: Type[];
  clearSearchResults: () => void;
}

const defaultSearchFunction = <Type>(object: Type, value: Type): boolean => object === value;

type Hook = <Type>(props: IUseSearchProps<Type>) => IUseSearchResult<Type>;
const useSearch: Hook = <Type>({
  allOptions,
  preSelectedOptions = [],
  searchFunction = defaultSearchFunction,
}: IUseSearchProps<Type>) => {
  const [searchResults, setSearchResults] = React.useState<Type[]>(preSelectedOptions || []);

  const clearSearchResults = React.useCallback(() => {
    setSearchResults([]);
  }, []);

  const search = React.useCallback((value: any) => {
    setSearchResults(
      allOptions.filter(option => searchFunction(option, value)),
    )
  }, [allOptions, searchFunction]);

  return {
    search,
    searchResults,
    clearSearchResults,
  };
};

export default useSearch;
