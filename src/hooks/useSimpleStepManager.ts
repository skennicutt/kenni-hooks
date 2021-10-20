import * as React from 'react';

interface IUseSimpleStepManagerProps<Type> {
  steps: Type[];
}

interface IUseSimpleStepManagerResults<Type> {
  currentStep: Type;
  nextStep: () => void;
  previousStep: () => void;
  jumpToStep: (index: number) => void;
}

const isIndexInBounds = <Type>(
  array: Type[],
  index: number,
): boolean => index >= 0 && index < array.length;

type Hook = <Type>(props: IUseSimpleStepManagerProps<Type>) => IUseSimpleStepManagerResults<Type>;
const useSimpleStepManager: Hook = <Type>({
  steps,
}: IUseSimpleStepManagerProps<Type>) => {
  if (steps.length === 0) {
    throw Error('Must supply hook with array of at least one item');
  }

  const [currentStepIndex, setCurrentStepIndex] = React.useState(0);

  const jumpToStep = React.useCallback((newIndex: number) => {
    if(isIndexInBounds(steps, newIndex)) {
      setCurrentStepIndex(newIndex);
    }
  }, [steps]);

  const nextStep = React.useCallback(() => {
    jumpToStep(currentStepIndex + 1)
  }, [currentStepIndex, jumpToStep]);

  const previousStep = React.useCallback(() => {
    jumpToStep(currentStepIndex - 1)
  }, [currentStepIndex, jumpToStep]);

  return {
    currentStep: steps[currentStepIndex],
    nextStep,
    previousStep,
    jumpToStep,
  };
};

export default useSimpleStepManager;
