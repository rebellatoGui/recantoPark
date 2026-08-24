import { cn } from "@/lib/utils";

const RAY_COUNT = 8;
const RAY_INNER = 108;
const RAY_OUTER = 140;
const RAY_LENGTH = RAY_OUTER - RAY_INNER;

const rays = Array.from({ length: RAY_COUNT }, (_, i) => {
  const angle = (i * 360) / RAY_COUNT;
  const rad = (angle * Math.PI) / 180;
  const x1 = 200 + RAY_INNER * Math.cos(rad);
  const y1 = 200 + RAY_INNER * Math.sin(rad);
  const x2 = 200 + RAY_OUTER * Math.cos(rad);
  const y2 = 200 + RAY_OUTER * Math.sin(rad);
  return { x1, y1, x2, y2 };
});

const ARC_RADIUS = 168;
const ARC_LENGTH = (Math.PI / 180) * 100 * ARC_RADIUS;

export function HeroLines({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 400"
      className={cn("pointer-events-none", className)}
      fill="none"
      aria-hidden
    >
      <circle
        cx="200"
        cy="200"
        r="152"
        stroke="currentColor"
        strokeWidth="1"
        strokeDasharray="2 8"
        opacity="0.3"
      />
      <path
        data-hero-line
        d="M 200 32 A 168 168 0 0 1 337.4 116"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeDasharray={ARC_LENGTH}
        strokeDashoffset={ARC_LENGTH}
        strokeLinecap="round"
      />
      <path
        data-hero-line
        d="M 62.6 284 A 168 168 0 0 1 200 368"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeDasharray={ARC_LENGTH}
        strokeDashoffset={ARC_LENGTH}
        strokeLinecap="round"
      />
      {rays.map((ray, i) => (
        <line
          key={i}
          data-hero-line
          x1={ray.x1}
          y1={ray.y1}
          x2={ray.x2}
          y2={ray.y2}
          stroke="currentColor"
          strokeWidth="1.25"
          strokeDasharray={RAY_LENGTH}
          strokeDashoffset={RAY_LENGTH}
          strokeLinecap="round"
        />
      ))}
    </svg>
  );
}
