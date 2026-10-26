export function Arrow({
  diagonal = false,
  className = "",
}: {
  diagonal?: boolean;
  className?: string;
}) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d={diagonal ? "M5 19 19 5M5 5h14v14" : "M4 12h15m-6-6 6 6-6 6"}
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
export function Asterisk({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      width="36"
      height="36"
      viewBox="0 0 40 40"
      fill="none"
      aria-hidden="true"
    >
      {[0, 45, 90, 135].map((r) => (
        <path
          key={r}
          d="M20 3v34"
          stroke="currentColor"
          strokeWidth="3"
          transform={`rotate(${r} 20 20)`}
        />
      ))}
    </svg>
  );
}
export function Contours({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 800 800"
      fill="none"
      className={`contours ${className}`}
      aria-hidden="true"
    >
      {Array.from({ length: 12 }, (_, i) => (
        <ellipse
          key={i}
          cx="400"
          cy="400"
          rx={100 + i * 28}
          ry={140 + i * 24}
          stroke="currentColor"
          strokeWidth=".7"
          transform={`rotate(${i * 5} 400 400)`}
        />
      ))}
    </svg>
  );
}
