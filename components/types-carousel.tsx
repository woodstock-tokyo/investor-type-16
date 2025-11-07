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
    <div className="relative w-full overflow-x-auto md:overflow-x-hidden py-8 mb-6 scrollbar-hide">
      {/* Gradient overlays - hidden on mobile */}
      <div className="hidden md:block absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-slate-50 to-transparent dark:from-slate-950 z-10 pointer-events-none" />
      <div className="hidden md:block absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-slate-50 to-transparent dark:from-slate-950 z-10 pointer-events-none" />

      {/* Scrolling container wrapper */}
      <div className="pb-4 md:pb-8 scrollbar-hide">
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
              className="flex-shrink-0 w-24 md:w-48 group cursor-default"
            >
              <div className="bg-white dark:bg-slate-900 rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105">
                {/* Image */}
                <div className="relative w-full h-24 md:h-48 md:aspect-square">
                  {imageUrl ? (
                    <Image
                      src={imageUrl}
                      alt={`${type.name}のイメージ`}
                      fill
                      className="object-contain"
                    />
                  ) : (
                    <div className="w-full h-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-2xl md:text-3xl mb-1">📊</div>
                        <p className="text-[10px] md:text-xs text-slate-500 dark:text-slate-400">
                          {type.code}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
                {/* Text content */}
                <div className="p-2 md:p-3 text-center">
                  <div className="text-[11px] md:text-sm font-bold text-slate-900 dark:text-slate-50 mb-0.5 md:mb-1">
                    {type.code}
                  </div>
                  <div className="text-[10px] md:text-xs font-semibold text-slate-700 dark:text-slate-300 line-clamp-2 md:line-clamp-none">
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
              className="flex-shrink-0 w-24 md:w-48 group cursor-default"
            >
              <div className="bg-white dark:bg-slate-900 rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105">
                {/* Image */}
                <div className="relative w-full h-24 md:h-48 md:aspect-square">
                  {imageUrl ? (
                    <Image
                      src={imageUrl}
                      alt={`${type.name}のイメージ`}
                      fill
                      className="object-contain"
                    />
                  ) : (
                    <div className="w-full h-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-2xl md:text-3xl mb-1">📊</div>
                        <p className="text-[10px] md:text-xs text-slate-500 dark:text-slate-400">
                          {type.code}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
                {/* Text content */}
                <div className="p-2 md:p-3 text-center">
                  <div className="text-[11px] md:text-sm font-bold text-slate-900 dark:text-slate-50 mb-0.5 md:mb-1">
                    {type.code}
                  </div>
                  <div className="text-[10px] md:text-xs font-semibold text-slate-700 dark:text-slate-300 line-clamp-2 md:line-clamp-none">
                    {type.name}©
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        </div>
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
          animation: scroll 15s linear infinite;
        }

        @media (min-width: 768px) {
          .animate-scroll {
            animation: scroll 40s linear infinite;
          }
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
