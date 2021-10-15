import { renderHook, act } from '@testing-library/react-hooks';
import useSelectableOptions from '../useSelectableOptions';

interface ISimpleValueLabel {
  label: string,
  value: string,
};

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
]

describe('useSelectableOptions', () => {
  it('accepts a list of no options without preselected options', () => {
    const hookProps = {
      allOptions: SIMPLE_VALUE_LABEL_OPTIONS
    }
    const { result } = renderHook(() => useSelectableOptions<ISimpleValueLabel>(hookProps));
    const {
      selectedOptions,
      unselectedOptions,
    } = result.current;

    expect(selectedOptions).toStrictEqual([]);
    expect(unselectedOptions).toStrictEqual(SIMPLE_VALUE_LABEL_OPTIONS);
  });
  it('accepts options with preselections', () => {
    const preSelectedOptions = SIMPLE_VALUE_LABEL_OPTIONS.slice(0, 1);
    const remainingAvailableOptions = SIMPLE_VALUE_LABEL_OPTIONS.slice(1, 3);
    const hookProps = {
      allOptions: SIMPLE_VALUE_LABEL_OPTIONS,
      preSelectedOptions,
    }
    const { result } = renderHook(() => useSelectableOptions<ISimpleValueLabel>(hookProps));
    const {
      selectedOptions,
      unselectedOptions,
    } = result.current;

    expect(selectedOptions).toStrictEqual(preSelectedOptions);
    expect(unselectedOptions).toStrictEqual(remainingAvailableOptions);
  });
  it('selects an option', () => {
    const expectedSelectedOptions = SIMPLE_VALUE_LABEL_OPTIONS.slice(0, 1);
    const expectedRemainingAvailableOptions = SIMPLE_VALUE_LABEL_OPTIONS.slice(1, 3);
    const hookProps = {
      allOptions: SIMPLE_VALUE_LABEL_OPTIONS
    }
    const { result } = renderHook(() => useSelectableOptions<ISimpleValueLabel>(hookProps));
    
    act(() => {
      result
        .current
        .selectOption(expectedSelectedOptions[0]);
    });

    const {
      selectedOptions,
      unselectedOptions,
    } = result.current;

    expect(selectedOptions).toStrictEqual(expectedSelectedOptions);
    expect(unselectedOptions).toStrictEqual(expectedRemainingAvailableOptions);
  });
  it('deselects an option', () => {
    const preSelectedOptions = SIMPLE_VALUE_LABEL_OPTIONS.slice(0, 1);
    const hookProps = {
      allOptions: SIMPLE_VALUE_LABEL_OPTIONS,
      preSelectedOptions,
    }
    const { result } = renderHook(() => useSelectableOptions<ISimpleValueLabel>(hookProps));
    
    act(() => {
      result
        .current
        .deselectOption(preSelectedOptions[0]);
    });

    const {
      selectedOptions,
      unselectedOptions,
    } = result.current;

    expect(selectedOptions).toStrictEqual([]);
    expect(unselectedOptions).toStrictEqual(SIMPLE_VALUE_LABEL_OPTIONS);
  });
  it('selects all options', () => {
    const hookProps = {
      allOptions: SIMPLE_VALUE_LABEL_OPTIONS,
      preSelectedOptions: SIMPLE_VALUE_LABEL_OPTIONS,
    }
    const { result } = renderHook(() => useSelectableOptions<ISimpleValueLabel>(hookProps));
    
    act(() => {
      result
        .current
        .selectAllOptions()
    });

    const {
      selectedOptions,
      unselectedOptions,
    } = result.current;

    expect(selectedOptions).toStrictEqual(SIMPLE_VALUE_LABEL_OPTIONS);
    expect(unselectedOptions).toStrictEqual([]);
  });
  it('deselects all selected options', () => {
    const hookProps = {
      allOptions: SIMPLE_VALUE_LABEL_OPTIONS,
      preSelectedOptions: SIMPLE_VALUE_LABEL_OPTIONS,
    }
    const { result } = renderHook(() => useSelectableOptions<ISimpleValueLabel>(hookProps));
    
    act(() => {
      result
        .current
        .deselectAllOptions()
    });

    const {
      selectedOptions,
      unselectedOptions,
    } = result.current;

    expect(selectedOptions).toStrictEqual([]);
    expect(unselectedOptions).toStrictEqual(SIMPLE_VALUE_LABEL_OPTIONS);
  });
  it('selects an option by label', () => {
    const expectedSelectedOptions = SIMPLE_VALUE_LABEL_OPTIONS.slice(0, 1);
    const expectedRemainingAvailableOptions = SIMPLE_VALUE_LABEL_OPTIONS.slice(1, 3);
    const hookProps = {
      allOptions: SIMPLE_VALUE_LABEL_OPTIONS,
      evaluationFunction: (source: ISimpleValueLabel, value: string) => source.label === value,
    }
    const { result } = renderHook(() => useSelectableOptions<ISimpleValueLabel>(hookProps));
    
    act(() => {
      result
        .current
        .selectOption('Label 1');
    });

    const {
      selectedOptions,
      unselectedOptions,
    } = result.current;

    expect(selectedOptions).toStrictEqual(expectedSelectedOptions);
    expect(unselectedOptions).toStrictEqual(expectedRemainingAvailableOptions);
  });
  it('deselects a value by label', () => {
    const preSelectedOptions = SIMPLE_VALUE_LABEL_OPTIONS.slice(0, 1);
    const hookProps = {
      allOptions: SIMPLE_VALUE_LABEL_OPTIONS,
      preSelectedOptions,
      evaluationFunction: (source: ISimpleValueLabel, value: string) => source.label === value,
    }
    const { result } = renderHook(() => useSelectableOptions<ISimpleValueLabel>(hookProps));
    
    act(() => {
      result
        .current
        .deselectOption('Label 1');
    });

    const {
      selectedOptions,
      unselectedOptions,
    } = result.current;

    expect(selectedOptions).toStrictEqual([]);
    expect(unselectedOptions).toStrictEqual(SIMPLE_VALUE_LABEL_OPTIONS);
  });
});
