export default function Logo() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-6 w-6"
    >
      <path
        d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"
        fill="hsl(var(--primary))"
        stroke="none"
      />
      <path
        d="M10 6h2a4 4 0 0 1 4 4v4a4 4 0 0 1-4 4h-2V6z"
        fill="hsl(var(--primary-foreground))"
      />
    </svg>
  );
}
