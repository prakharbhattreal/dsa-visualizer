"use client";

import { motion } from "framer-motion";
import { useMergeSort } from "./useMergesort";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";

export function MergeSortVisualizer({ content }: { content: React.ReactNode }) {
  const initialArray = [8, 3, 5, 4, 7, 6, 1, 2];
  const { steps, start, isPlaying } = useMergeSort();
  

  return (
    <div className="container mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">
          Merge Sort Algorithm
        </h1>
        <p className="text-muted-foreground">
          Merge Sort works on Divide-and-Conquer.
        </p>
      </div>

      <Tabs defaultValue="conversion" className="w-full space-y-6">
        <TabsList className="grid w-full grid-cols-2 border border-gray-400 rounded-xl">
          <TabsTrigger value="Visualizer" className="bg-slate-700 text-white py-2 rounded-l-xl">Merge Sort Visualizer</TabsTrigger>
          <TabsTrigger value="insights" className="py-2">Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="Visualizer" className="space-y-6 justify-center">
          <div className="relative flex flex-col items-center">
            <motion.div
              className="flex flex-col items-center text-primary"
              transition={{ duration: 0.5 }}
            >
              <button
                className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/90 dark:bg-slate-600 dark:hover:bg-slate-700"
                disabled={isPlaying}
                onClick={() => start(initialArray)}
              >
                {isPlaying ? "Running..." : "Start Merge Sort"}
              </button>
              <div className="mt-8 w-full flex flex-col items-center">
                {steps.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-muted-foreground"
                  >
                    Click “Start Merge Sort” to begin
                  </motion.div>
                ) : (
                  <div className="space-y-6">
                    {steps.map((step, i) => (
                      <motion.div
                        key={step.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        className={`p-4 border rounded-lg`}
                      >
                        <div className="text-sm mb-2 font-medium">
                          {step.action === "split"
                            ? `Split into ${step.arrays.length} parts`
                            : `Merged → [${step.arrays[0].join(", ")}]`}
                        </div>

                        <div className="flex flex-wrap justify-center gap-4">
                          {step.arrays.map((arr, idx) => (
                            <div
                              key={idx}
                              className="flex space-x-1 bg-background border px-2 py-1 rounded-md shadow-sm"
                            >
                              {arr.map((num, j) => (
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
            </motion.div>
          </div>
        </TabsContent>
        <TabsContent value="insights">
          <div className="relative flex flex-col items-center">
            <motion.div
              className="flex flex-col items-center text-primary"
              transition={{ duration: 0.3 }}
            >
              <div className="prose max-w-none dark:prose-invert">
                {content}
              </div>
            </motion.div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
