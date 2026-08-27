import type { SVGProps } from "react";

export function FlagBR(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 30 20" xmlns="http://www.w3.org/2000/svg" {...props}>
      <rect width="30" height="20" fill="#009739" />
      <polygon points="15,3 27,10 15,17 3,10" fill="#FEDD00" />
      <circle cx="15" cy="10" r="4.6" fill="#012169" />
      <path
        d="M10.8 8.6a6.2 6.2 0 0 1 8 1.4"
        stroke="#fff"
        strokeWidth="0.7"
        fill="none"
      />
    </svg>
  );
}

export function FlagUS(props: SVGProps<SVGSVGElement>) {
  const stripeH = 20 / 13;
  return (
    <svg viewBox="0 0 30 20" xmlns="http://www.w3.org/2000/svg" {...props}>
      {Array.from({ length: 13 }, (_, i) => (
        <rect
          key={i}
          y={i * stripeH}
          width="30"
          height={stripeH}
          fill={i % 2 === 0 ? "#B22234" : "#fff"}
        />
      ))}
      <rect width="13" height={stripeH * 7} fill="#3C3B6E" />
    </svg>
  );
}

export function FlagES(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 30 20" xmlns="http://www.w3.org/2000/svg" {...props}>
      <rect width="30" height="20" fill="#AA151B" />
      <rect y="5" width="30" height="10" fill="#F1BF00" />
    </svg>
  );
}
