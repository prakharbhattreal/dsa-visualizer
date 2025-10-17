"use client";

import { MoveRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "./navbar";

export const Home = () => (
  <>
    <Navbar />
    <div className="relative w-full py-20 lg:py-36 overflow-hidden lg:px-10 px-5">
      <div className="container mx-auto relative">
        <div className="grid grid-cols-1 gap-4 items-center lg:grid-cols-2">
          <div className="flex gap-4 flex-col">
            <div className="flex gap-4 flex-col">
              <h1 className="text-5xl md:text-7xl max-w-lg tracking-tighter text-left font-regular">
                Data Structure Visualizer
              </h1>
              <p className="text-xl leading-relaxed tracking-tight text-muted-foreground max-w-md text-left">
                Interactive platform that allows students to visualize and
                explore core data structures and algorithm in dynamic and
                engaging way.
              </p>
            </div>
            <div className="flex flex-row gap-4">
              <Link href="/visualizer">
                <Button
                  className="gap-2 border-2 dark:border-white/30 border-black/30 dark:hover:bg-white/60 hover:bg-black/10"
                  variant="outline"
                >
                  Visualizer <MoveRight height={26} />
                </Button>
              </Link>
            </div>
          </div>
          <div className="relative h-[25rem] rounded-lg overflow-hidden border">
            <Image
              src="/ds.png"
              alt="Visualizer Preview"
              fill
              className=""
              priority
            />
          </div>
        </div>
      </div>
    </div>
  </>
);
