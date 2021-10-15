import * as React from 'react';

interface IUseSelectableOptionsProps<Type> {
  allOptions: Type;
  preSelectedOptions?: Type
  evaluationFunction?: (object: any, value: any) => boolean;
}
interface IUseSelectableOptionsResult<Type extends any> {
  selectedOptions: Type[];
  unselectedOptions: Type[]
  selectOption: (optionToSelect: any) => void;
  deselectOption: (optionToDeselect: any) => void;
  selectAllOptions: () => void;
  deselectAllOptions: () => void;
}

const defaultEvalFunction = <Type>(object: Type, value: Type): boolean => object === value;

type Hook = <Type>(props: IUseSelectableOptionsProps<Type[]>) => IUseSelectableOptionsResult<Type>;
const useSelectableOptions: Hook = <Type>({
  allOptions,
  preSelectedOptions = [],
  evaluationFunction = defaultEvalFunction,
}: IUseSelectableOptionsProps<Type[]>) => {
  const [selectedOptions, setSelectedOptions] = React.useState<Type[]>([]);
  const [unselectedOptions, setUnselectedOptions] = React.useState<Type[]>(allOptions);

  // TODO: Highly inefficient, look at performance upgrades
  const moveOptionFromList = React.useCallback((value: any, sourceList: Type[], targetList: Type[], masterList: Type[]) => {
    const optionsToSelect = sourceList.filter(sourceElement => evaluationFunction(sourceElement, value))
    const tmpSelectiedOptions = [...optionsToSelect, ...targetList];
    const newSourceList: Type[] = masterList.filter((element) => !tmpSelectiedOptions.includes(element));
    const newTargetList: Type[] = masterList.filter((element) => tmpSelectiedOptions.includes(element));

    return {
      newSourceList,
      newTargetList,
    }
  }, [evaluationFunction]);

  const selectOption = React.useCallback((value: any) => {
    const {
      newSourceList: newUnselectedOptions,
      newTargetList: newSelectedOptions,
    } = moveOptionFromList(value, unselectedOptions, selectedOptions, allOptions);
    
    setSelectedOptions(newSelectedOptions);
    setUnselectedOptions(newUnselectedOptions);
  }, [allOptions, moveOptionFromList, selectedOptions, unselectedOptions]);

  const deselectOption = React.useCallback((value: any) => {
    const {
      newSourceList: newSelectedOptions,
      newTargetList: newUnselectedOptions,
    } = moveOptionFromList(value, selectedOptions, unselectedOptions, allOptions);
    
    setSelectedOptions(newSelectedOptions);
    setUnselectedOptions(newUnselectedOptions);
  }, [allOptions, moveOptionFromList, selectedOptions, unselectedOptions]);

  React.useEffect(() => {
    if (preSelectedOptions) {
      setSelectedOptions(preSelectedOptions);
      setUnselectedOptions(allOptions.filter(element => !preSelectedOptions.includes(element)));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const selectAllOptions = React.useCallback(() => {
    setUnselectedOptions([]);
    setSelectedOptions(allOptions);
  }, [allOptions]);

  const deselectAllOptions = React.useCallback(() => {
    setUnselectedOptions(allOptions);
    setSelectedOptions([]);
  }, [allOptions]);

  return {
    selectedOptions,
    unselectedOptions,
    selectOption,
    deselectOption,
    selectAllOptions,
    deselectAllOptions,
  };
};

export default useSelectableOptions;
