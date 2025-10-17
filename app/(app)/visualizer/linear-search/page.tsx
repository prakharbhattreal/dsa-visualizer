"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function LinearSearchPage() {
  const [array] = useState<number[]>([10, 23, 45, 70, 11, 15]);
  const [target, setTarget] = useState<number>(70);
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const [foundIndex, setFoundIndex] = useState<number | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [message, setMessage] = useState<string>("Click 'Start Search' to begin");

  const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

  const startSearch = async () => {
    if (isSearching) return;
    setIsSearching(true);
    setFoundIndex(null);
    setMessage("Searching...");
    setCurrentIndex(null);
    for (let i=0;i<array.length;i++){
      setCurrentIndex(i);
      setMessage(`Checking index ${i} → ${array[i]}`);
      await delay(800); 
      if (array[i]===target) {
        setFoundIndex(i);
        setMessage(`Element ${target} found at index ${i}`);
        setIsSearching(false);
        return;
      }
    }
    setMessage(`Element ${target} not found`);
    setCurrentIndex(null);
    setIsSearching(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-6 p-6">
      <h1 className="text-3xl font-bold mb-4 text-primary">Linear Search Visualizer</h1>
      <div className="flex items-center gap-3 mb-4">
        <input
          type="number"
          value={target}
          onChange={(e) => setTarget(parseInt(e.target.value))}
          className="border rounded-md p-2 w-24 text-center dark:bg-slate-800 dark:text-white"
          disabled={isSearching}
        />
        <button
          onClick={startSearch}
          disabled={isSearching}
          className="px-4 py-2 dark:bg-white/20 text-white rounded dark:hover:bg-white/30 disabled:opacity-50 bg-black/80"
        >
          {isSearching ? "Searching..." : "Start Search"}
        </button>
      </div>

      <div className="flex gap-3 mt-4">
        {array.map((num, index) => (
          <motion.div
            key={index}
            layout
            animate={{
              scale:
                currentIndex === index
                  ? 1.2
                  : foundIndex === index
                  ? 1.2
                  : 1,
              backgroundColor:
                foundIndex === index
                  ? "#22c55e"
                  : currentIndex === index
                  ? "#f59e0b"
                  : "#3b82f6", 
            }}
            transition={{ duration: 0.3 }}
            className="w-14 h-14 rounded-md flex items-center justify-center text-white font-bold shadow-md"
          >
            {num}
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        key={message}
        className="text-lg mt-4 font-medium text-center"
      >
        {message}
      </motion.div>
    </div>
  );
}
