import { useState } from "react";

export interface MergeSortStep {
  id: string;
  arrays: number[][];
  action: "split" | "merge";
  highlight?: number[];
}

let stepId = 0;

export function useMergeSort() {
  const [steps, setSteps] = useState<MergeSortStep[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const record = (step: MergeSortStep) => {
    setSteps((prev) => [...prev, { ...step, id: `${stepId++}` }]);
  };

  function mergeSort(arr: number[]): number[] {
    if (arr.length <= 1) {
      record({
          arrays: [arr], action: "split",
          id: ""
      });
      return arr;
    }

    const mid = Math.floor(arr.length / 2);
    const left = arr.slice(0, mid);
    const right = arr.slice(mid);

    record({
        arrays: [left, right], action: "split",
        id: ""
    });

    const sortedLeft = mergeSort(left);
    const sortedRight = mergeSort(right);
    const merged = merge(sortedLeft, sortedRight);

    record({
        arrays: [merged], action: "merge",
        id: ""
    });
    return merged;
  }

  function merge(left: number[], right: number[]): number[] {
    let i = 0,
      j = 0;
    const result: number[] = [];

    while (i < left.length && j < right.length) {
      if (left[i] < right[j]) result.push(left[i++]);
      else result.push(right[j++]);
    }

    return [...result, ...left.slice(i), ...right.slice(j)];
  }

  async function start(arr: number[]) {
    setSteps([]);
    setCurrentStep(0);
    setIsPlaying(true);
    stepId = 0;
    mergeSort(arr);
    setIsPlaying(false);
  }

  return { steps, currentStep, setCurrentStep, isPlaying, start };
}
