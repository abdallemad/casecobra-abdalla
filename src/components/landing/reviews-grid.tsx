"use client";
import { cn, splitArray } from "@/lib/utils";
import { Marquee } from "@/components/magicui/marquee";
import Phone from "../globals/phone";
import { PHONES } from "@/constants";

export default function MarqueeDemoVertical() {
  const columns = splitArray(PHONES, 3);
  const column1 = columns[0];
  const column2 = columns[1];
  const column3 = splitArray(columns[2], 2);
  return (
    <div className="relative -mx-4 mt-16 grid h-[49rem] max-h-[150vh] grid-cols-1 items-start gap-8 overflow-hidden px-4 sm:mt-20 md:grid-cols-2 lg:grid-cols-3">
      <Marquee vertical className="[--duration:30s]">
        {[...column1, ...column2, ...column3.flat()].map((imgSrc, index) => (
          <div
            key={index}
            className={cn(
              "rounded-[2.25rem] bg-white p-6 shadow-xl shadow-slate-900/5"
            )}
          >
            <Phone imgSrc={imgSrc} />
          </div>
        ))}
      </Marquee>
      <Marquee
        reverse
      
        vertical
        className="[--duration:20s] hidden md:block "
      >
        {[...column2, ...column3[1]].map((imgSrc, index) => (
          <div
            key={index}
            className={cn(
              "rounded-[2.25rem] bg-white p-6 shadow-xl shadow-slate-900/5"
            )}
          >
            <Phone imgSrc={imgSrc} />
          </div>
        ))}
      </Marquee>
      <Marquee
        reverse
      
        vertical
        className="[--duration:20s] md:block hidden"
      >
        {[...column3.flat()].map((imgSrc, index) => (
          <div
            key={index}
            className={cn(
              "rounded-[2.25rem] bg-white p-6 shadow-xl shadow-slate-900/5"
            )}
          >
            <Phone imgSrc={imgSrc} />
          </div>
        ))}
      </Marquee>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-slate-200" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-slate-200" />
    </div>
  );
}
