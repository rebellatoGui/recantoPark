"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/animations/gsap";
import { prefersReducedMotion } from "@/lib/animations/reduced-motion";
import { poolImages, beachImages } from "@/lib/data/images";

export function AmbientPhotos() {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      gsap.to("[data-ambient-photo]", {
        yPercent: (i) => (i % 2 === 0 ? -14 : 14),
        ease: "none",
        stagger: 0,
        scrollTrigger: {
          trigger: scope.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    },
    { scope }
  );

  return (
    <div
      ref={scope}
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
    >
      <div
        data-ambient-photo
        className="absolute -left-20 top-[6%] size-[30rem] scale-125 rounded-full opacity-45 blur-sm md:size-[38rem]"
      >
        <Image
          src={poolImages[3]}
          alt=""
          fill
          className="object-cover"
          sizes="38rem"
        />
      </div>
      <div
        data-ambient-photo
        className="absolute -right-20 top-[52%] size-[28rem] scale-125 rounded-full opacity-40 blur-sm md:size-[34rem]"
      >
        <Image
          src={beachImages[2]}
          alt=""
          fill
          className="object-cover"
          sizes="34rem"
        />
      </div>
    </div>
  );
}
