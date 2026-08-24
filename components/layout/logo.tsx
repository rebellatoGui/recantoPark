"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP } from "@/lib/animations/gsap";
import { cn } from "@/lib/utils";

export function Logo({
  className,
  spin = true,
}: {
  className?: string;
  spin?: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      gsap.from(ref.current, {
        scale: 0.6,
        rotate: spin ? -20 : 0,
        opacity: 0,
        duration: 0.9,
        ease: "back.out(1.7)",
        delay: 0.2,
      });
    },
    { scope: ref, dependencies: [spin] }
  );

  return (
    <span
      ref={ref}
      className={cn(
        "relative inline-block size-24 transition-transform duration-700 ease-out",
        spin && "hover:rotate-[360deg] motion-reduce:hover:rotate-0",
        className
      )}
    >
      <Image
        src="/brand/logo.png"
        alt="Recanto do Park"
        fill
        className="object-contain"
        sizes="160px"
      />
    </span>
  );
}
