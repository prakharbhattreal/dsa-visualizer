"use client";

import { useState } from "react";
import { motion } from "framer-motion";

type Step = {
  id: number;
  action: "split" | "merge";
  arrays: number[][];
};

export default function MergeSortVisualizer() {
  const [initialArray] = useState<number[]>([8, 3, 1, 6, 2, 7, 5, 4]);
  const [steps, setSteps] = useState<Step[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [sortedArray, setSortedArray] = useState<number[]>([]);
  const [message, setMessage] = useState("Click “Start Merge Sort” to begin");

  const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

  const recordStep = (action: "split" | "merge", arrays: number[][]) => {
    setSteps((prev) => [
      ...prev,
      { id: Date.now() + Math.random(), action, arrays },
    ]);
  };

  const merge = (left: number[], right: number[]) => {
    const result: number[] = [];
    let i = 0,
      j = 0;

    while (i < left.length && j < right.length) {
      if (left[i] <= right[j]) result.push(left[i++]);
      else result.push(right[j++]);
    }

    return [...result, ...left.slice(i), ...right.slice(j)];
  };

  const mergeSort=async (arr: number[]): Promise<number[]> => {
    if (arr.length<=1) return arr;

    const mid = Math.floor(arr.length/2);
    const left = arr.slice(0, mid);
    const right = arr.slice(mid);

    recordStep("split", [left, right]);
    setMessage(`Splitting → [${left.join(", ")}] and [${right.join(", ")}]`);
    await delay(1000);

    const sortedLeft = await mergeSort(left);
    const sortedRight = await mergeSort(right);

    const merged = merge(sortedLeft, sortedRight);

    recordStep("merge",[merged]);
    setMessage(`Merging → [${merged.join(", ")}]`);
    await delay(1000);

    return merged;
  };

  const start = async () => {
    if (isPlaying) return;
    setIsPlaying(true);
    setSteps([]);
    setSortedArray([]);
    setMessage("Starting Merge Sort...");

    const result = await mergeSort(initialArray);
    setSortedArray(result);

    setMessage(`Sorting Completed: [${result.join(", ")}]`);
    setIsPlaying(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 gap-8">
      <h1 className="text-3xl font-bold text-primary">
        Merge Sort Visualizer
      </h1>

      <button
        onClick={start}
        disabled={isPlaying}
        className="px-4 py-2 dark:bg-white/20 text-white rounded dark:hover:bg-white/30 disabled:opacity-50 bg-black/80"
      >
        {isPlaying?"Running...":"Start Merge Sort"}
      </button>

      <div className="w-full flex flex-col items-center">
        {steps.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-muted-foreground"
          >
            {message}
          </motion.div>
        ) : (
          <div className="space-y-6">
            {steps.map((step, i) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className={`p-4 border rounded-lg shadow-sm `}
              >
                <div className="text-sm mb-2 font-semibold text-center">
                  {step.action === "split"
                    ? "Splitting Step"
                    : "Merging Step"}
                </div>

                <div className="flex flex-wrap justify-center gap-4">
                  {step.arrays.map((arr, idx) => (
                    <div
                      key={idx}
                      className="flex space-x-1 bg-background border px-3 py-1 rounded-md shadow-sm"
                    >
                      {arr.map((num, j)=>(
                        <motion.div
                          key={j}
                          layout
                          className="w-8 h-8 flex items-center justify-center bg-accent rounded text-sm font-semibold"
                        >
                          {num}
                        </motion.div>
                      ))}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {sortedArray.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-6 text-lg font-semibold text-green-600 dark:text-green-400"
        >
          Final Sorted Array: [{sortedArray.join(", ")}]
        </motion.div>
      )}

      <div className="text-sm text-muted-foreground mt-6">{message}</div>
    </div>
  );
}
