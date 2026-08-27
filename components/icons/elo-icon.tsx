export function EloIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} role="img" aria-label="Elo">
      <circle
        cx="12"
        cy="12"
        r="8.4"
        stroke="#FFCB05"
        strokeWidth="2.6"
        strokeDasharray="17.5 35"
        strokeLinecap="round"
        transform="rotate(-20 12 12)"
      />
      <circle
        cx="12"
        cy="12"
        r="8.4"
        stroke="#00A4E0"
        strokeWidth="2.6"
        strokeDasharray="17.5 35"
        strokeLinecap="round"
        transform="rotate(100 12 12)"
      />
      <circle
        cx="12"
        cy="12"
        r="8.4"
        stroke="#EF4123"
        strokeWidth="2.6"
        strokeDasharray="17.5 35"
        strokeLinecap="round"
        transform="rotate(220 12 12)"
      />
    </svg>
  );
}
