"use client";
import { CircuitBoard, Github } from "lucide-react";
import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ModeToggle } from "@/components/element/mode-toggle";

export const Navbar = () => {
  return (
    <header className="shadow-inner bg-opacity-15 top-0 w-full mx-auto sticky border border-secondary z-40 flex justify-between items-center p-2 backdrop-blur-md">
      <Link href="/" className="font-bold text-lg flex items-center">
        <CircuitBoard className="h-7 w-7 mr-2" />
        DS Visualizer
      </Link>

      <div className="flex items-center gap-2">
        <ModeToggle />
        <Button asChild size="sm" variant="ghost" aria-label="View on GitHub">
          <Link
            aria-label="View on GitHub"
            href="https://github.com/prakharbhattreal/dsa-visualizer"
            target="_blank"
          >
            <Github className="size-5" />
          </Link>
        </Button>
      </div>
    </header>
  );
};