import { renderHook, act } from '@testing-library/react-hooks';
import useSimpleStepManager from '../useSimpleStepManager';

const bakingInstructions = [
  'Let butter rest at room temperature',
  'Pre-heat oven to 350 degrees fahrenheit',
  'Mix wet ingredients together',
  'Add dry ingredients to wet ingredients',
  'Make balls',
  'Put in over',
  'Bake for 12 minutes',
  'Enjoy!',
];

describe('useSimpleStepManager', () => {
  it('returns the first step', () => {
  const hookProps = {
    steps: bakingInstructions,
  }
  const { result } = renderHook(() => useSimpleStepManager<String>(hookProps));
  
  const {
    currentStep,
  } = result.current;

  expect(currentStep).toStrictEqual('Let butter rest at room temperature');
  });
  it('moves from step 1 to step 2', () => {
    const hookProps = {
      steps: bakingInstructions,
    }
    const { result } = renderHook(() => useSimpleStepManager<String>(hookProps));

    expect(result.current.currentStep).toStrictEqual('Let butter rest at room temperature');
    
    act(() => {
      result
        .current
        .nextStep();
    });

    const {
      currentStep,
    } = result.current;

    expect(currentStep).toStrictEqual('Pre-heat oven to 350 degrees fahrenheit');
  });
  it('moves from step 2 to step 1', () => {
    const hookProps = {
      steps: bakingInstructions,
    }
    const { result } = renderHook(() => useSimpleStepManager<String>(hookProps));

    act(() => {
      result
        .current
        .jumpToStep(1);
    });

    expect(result.current.currentStep).toStrictEqual('Pre-heat oven to 350 degrees fahrenheit');

    act(() => {
      result
        .current
        .previousStep();
    });

    const {
      currentStep,
    } = result.current;

    expect(currentStep).toStrictEqual('Let butter rest at room temperature');
  });
  it('cannot go to a previous step from step 1', () => {
    const hookProps = {
      steps: bakingInstructions,
    }
    const { result } = renderHook(() => useSimpleStepManager<String>(hookProps));

    expect(result.current.currentStep).toStrictEqual('Let butter rest at room temperature');
    
    act(() => {
      result
        .current
        .previousStep();
    });

    const {
      currentStep,
    } = result.current;

    expect(currentStep).toStrictEqual('Let butter rest at room temperature');
  });
  it('cannot go to a next step from the last step', () => {
    const hookProps = {
      steps: bakingInstructions,
    }
    const { result } = renderHook(() => useSimpleStepManager<String>(hookProps));

    act(() => {
      result
        .current
        .jumpToStep(bakingInstructions.length - 1);
    });

    expect(result.current.currentStep).toStrictEqual('Enjoy!');

    act(() => {
      result
        .current
        .nextStep();
    });

    const {
      currentStep,
    } = result.current;

    expect(currentStep).toStrictEqual('Enjoy!');
  });
});
