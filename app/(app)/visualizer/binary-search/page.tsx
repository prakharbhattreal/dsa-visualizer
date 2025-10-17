"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function BinarySearchPage() {
  const [array] = useState<number[]>([5, 12, 23, 34, 45, 56, 67, 78, 89]);
  const [target, setTarget] = useState<number>(34);
  const [left, setLeft] = useState(0);
  const [right, setRight] = useState(array.length - 1);
  const [mid, setMid] = useState<number | null>(null);
  const [foundIndex, setFoundIndex] = useState<number | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [message, setMessage] = useState("Click 'Start Binary Search' to begin");

  const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

  const start = async () => {
    if (isSearching) return;

    setIsSearching(true);
    setFoundIndex(null);
    setMessage("Starting Binary Search...");
    setLeft(0);
    setRight(array.length-1);
    setMid(null);

    let l=0;
    let r=array.length-1;

    while (l<=r) {
      const m=Math.floor((l+r)/2);
      setMid(m);
      setMessage(`Checking middle index ${m} → ${array[m]}`);
      await delay(1000);

      if (array[m] === target) {
        setFoundIndex(m);
        setMessage(`Element ${target} found at index ${m}`);
        setIsSearching(false);
        return;
      } else if (array[m] < target) {
        setMessage(`🔹 ${array[m]} < ${target} → Searching right half`);
        l=m+1;
      } else {
        setMessage(`🔹 ${array[m]} > ${target} → Searching left half`);
        r=m-1;
      }

      setLeft(l);
      setRight(r);
      await delay(1000);
    }

    setMessage(`Element ${target} not found`);
    setIsSearching(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-6 p-6">
      <h1 className="text-3xl font-bold text-primary mb-2">Binary Search Visualizer</h1>

      <div className="flex items-center gap-3">
        <input
          type="number"
          value={target}
          onChange={(e) => setTarget(parseInt(e.target.value))}
          className="border rounded-md p-2 w-24 text-center dark:bg-slate-800 dark:text-white"
          disabled={isSearching}
        />
        <button
          onClick={start}
          disabled={isSearching}
          className="px-4 py-2 dark:bg-white/20 text-white rounded dark:hover:bg-white/30 disabled:opacity-50 bg-black/80"
        >
          {isSearching ? "Searching..." : "Start Binary Search"}
        </button>
      </div>

      <div className="flex gap-3 mt-6">
        {array.map((num, index) => {
          let bg = "#3b82f6"; 

          if (foundIndex === index) bg = "#22c55e"; 
          else if (mid === index) bg = "#f59e0b";
          else if (index < left || index > right) bg = "#94a3b8";

          return (
            <motion.div
              key={index}
              layout
              animate={{
                scale: mid === index || foundIndex === index ? 1.2 : 1,
                backgroundColor: bg,
              }}
              transition={{ duration: 0.3 }}
              className="w-14 h-14 rounded-md flex items-center justify-center text-white font-bold shadow-md"
            >
              {num}
            </motion.div>
          );
        })}
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
