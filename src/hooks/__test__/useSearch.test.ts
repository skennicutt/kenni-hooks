import { renderHook, act } from '@testing-library/react-hooks';
import useSearch from '../useSearch';

interface ISimpleValueLabel {
  label: string,
  value: string,
};

const customSearchFunction = (object: ISimpleValueLabel, value: string) => object.label.includes(value) || object.value.includes(value);

const SIMPLE_VALUE_LABEL_OPTIONS : ISimpleValueLabel[] = [
  {
    label: 'Label 1',
    value: '1',
  },
  {
    label: 'Label 2',
    value: '2',
  },
  {
    label: 'Label 3',
    value: '3',
  },
];

describe('useSearch', () => {
  describe('defaults', () => {
    it('searches the array against a string', () => {
    const hookProps = {
      allOptions: ['Aardvark', 'Alpha', 'Bravo']
    }
    const { result } = renderHook(() => useSearch<String>(hookProps));
    
    act(() => {
      result
        .current
        .search('Aardvark');
    });

    const {
      searchResults,
    } = result.current;

    expect(searchResults).toStrictEqual(['Aardvark']);
    });
    it('clears all the search results', () => {
      const hookProps = {
        allOptions: ['Aardvark', 'Alpha', 'Bravo'],
        preSelectedOptions: ['Aardvark'],
      }
      const { result } = renderHook(() => useSearch<String>(hookProps));

      expect(result.current.searchResults).toStrictEqual(['Aardvark']);
      
      act(() => {
        result
          .current
          .clearSearchResults();
      });

      const {
        searchResults,
      } = result.current;

      expect(searchResults).toStrictEqual([]);
    });
  });
  describe('using custom object and search object', () => {
    it('uses the custom search function correctly', () => {
      const hookProps = {
        allOptions: SIMPLE_VALUE_LABEL_OPTIONS,
        searchFunction: customSearchFunction,
      }
      const { result } = renderHook(() => useSearch<ISimpleValueLabel>(hookProps));
      
      act(() => {
        result
          .current
          .search('3');
      });
  
      const {
        searchResults,
      } = result.current;
  
      expect(searchResults).toStrictEqual([
        {
          label: 'Label 3',
          value: '3',
        },
      ]);
    });
  });
});
