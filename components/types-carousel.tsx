"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { INVESTOR_TYPES } from "@/lib/investor-types";
import { getTypeImageUrl } from "@/lib/image-utils";

export function TypesCarousel() {
  const types = Object.values(INVESTOR_TYPES);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStart, setTouchStart] = useState(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
    setIsPaused(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!scrollContainerRef.current) return;
    const touchEnd = e.touches[0].clientX;
    const diff = touchStart - touchEnd;
    scrollContainerRef.current.style.transform = `translateX(calc(var(--translate-x, 0px) - ${diff}px))`;
  };

  const handleTouchEnd = () => {
    setIsPaused(false);
  };

  return (
    <div className="relative w-full overflow-hidden py-8 pb-12 mb-6">
      {/* Gradient overlays */}
      <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-slate-50 to-transparent dark:from-slate-950 z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-slate-50 to-transparent dark:from-slate-950 z-10 pointer-events-none" />

      {/* Scrolling container */}
      <div
        ref={scrollContainerRef}
        className={`flex gap-4 md:gap-6 ${isPaused ? '' : 'animate-scroll'}`}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* First set of cards */}
        {types.map((type) => {
          const imageUrl = getTypeImageUrl(type.code);
          return (
            <div
              key={`${type.code}-1`}
              className="flex-shrink-0 w-32 md:w-48 group cursor-default"
            >
              <div className="bg-white dark:bg-slate-900 rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105">
                {/* Image */}
                <div className="relative w-full aspect-square">
                  {imageUrl ? (
                    <Image
                      src={imageUrl}
                      alt={`${type.name}のイメージ`}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-3xl mb-1">📊</div>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          {type.code}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
                {/* Text content */}
                <div className="p-3 text-center">
                  <div className="text-sm font-bold text-slate-900 dark:text-slate-50 mb-1">
                    {type.code}
                  </div>
                  <div className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    {type.name}©
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {/* Duplicate set for seamless loop */}
        {types.map((type) => {
          const imageUrl = getTypeImageUrl(type.code);
          return (
            <div
              key={`${type.code}-2`}
              className="flex-shrink-0 w-32 md:w-48 group cursor-default"
            >
              <div className="bg-white dark:bg-slate-900 rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105">
                {/* Image */}
                <div className="relative w-full aspect-square">
                  {imageUrl ? (
                    <Image
                      src={imageUrl}
                      alt={`${type.name}のイメージ`}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-3xl mb-1">📊</div>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          {type.code}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
                {/* Text content */}
                <div className="p-3 text-center">
                  <div className="text-sm font-bold text-slate-900 dark:text-slate-50 mb-1">
                    {type.code}
                  </div>
                  <div className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    {type.name}©
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* CSS Animation */}
      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-scroll {
          animation: scroll 20s linear infinite;
        }

        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }

        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}
