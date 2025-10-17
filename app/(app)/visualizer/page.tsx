import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Binary, TreePine, Box, List, CircuitBoard, SquareStack, SquareChevronLeft } from "lucide-react"
import Link from "next/link"

const sections = {
  dataStructures: [
    {
      name: "Linked List",
      description: "Dynamic data structure with nodes connected through references. Explore different types of linked lists.",
      href: "/visualizer/linked-list",
      icon: List,
    },
    {
      name: "Stack",
      description: "LIFO data structure supporting push and pop operations. Visualize stack operations and state.",
      href: "/visualizer/stack",
      icon: SquareStack,
    },
    {
      name: "Queue",
      description: "FIFO data structure for managing ordered elements. See enqueue and dequeue in action.",
      href: "/visualizer/queue",
      icon: SquareChevronLeft,
    },
    {
      name: "Binary Search Tree",
      description: "A binary tree that maintains sorted data with O(log n) operations. Learn about tree traversals.",
      href: "/visualizer/binary-tree",
      icon: Binary,
    },
    {
      name: "AVL Tree",
      description: "Self-balancing BST that maintains height balance. Visualize rotations and balancing.",
      href: "/visualizer/avl-tree",
      icon: TreePine,
    },
    {
      name: "Heap",
      description: "Complete binary tree with heap property. Switch between min and max heaps.",
      href: "/visualizer/heap",
      icon: Box,
    },
  ],
}

export default function HomePage() {
  return (
    <div className="container py-8 max-w-7xl mx-auto">
      <div className="flex flex-col items-center text-center mb-12">
        <div className="flex items-center gap-3 mb-6">
          <CircuitBoard className="h-10 w-10" />
          <h1 className="text-3xl font-bold tracking-tight">Data Structure Visualizer</h1>
        </div>
        <p className="text-muted-foreground text-lg max-w-2xl">
          Interactive platform that allows students to visualize and explore core data structures and algorithm in dynamic and engaging way.
        </p>
      </div>

      <div className="space-y-12">
        <section>
          <h2 className="text-2xl font-semibold mb-6">Data Structures</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sections.dataStructures.map((ds) => {
              const Icon = ds.icon;
              return (
                <Link key={ds.href} href={ds.href}>
                  <Card className="h-full hover:bg-muted/50 transition-colors">
                    <CardHeader>
                      <div className="flex items-center gap-2">
                        <Icon className="h-6 w-6" />
                        <CardTitle>{ds.name}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-base">{ds.description}</CardDescription>
                    </CardContent>
                  </Card>
                </Link>
              )
            })}
          </div>
        </section>
      </div>
    </div>
  )
}