"use client"

import { HeapVisualizer } from "@/components/visualizer/heap/heap-visualizer"
import Insights from "./heap.mdx"

export default function HeapPage() {
  return <HeapVisualizer content={<Insights />} />
} 