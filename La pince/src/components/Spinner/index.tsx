export function ButtonSpinner() {
  return (
    <svg
      className="animate-spin h-5 w-5 text-white"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12" cy="12" r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
      ></path>
    </svg>
  );
}

export function PageSpinner() {
  return (
    <svg
      className="animate-spin h-12 w-12"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 50 50"
    >
      <defs>
        <linearGradient id="spinner-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3B82F6" />   {/* Bleu Tailwind */}
          <stop offset="100%" stopColor="#8B5CF6" /> {/* Violet Tailwind */}
        </linearGradient>
      </defs>
      <circle
        className="opacity-25"
        cx="25"
        cy="25"
        r="20"
        stroke="url(#spinner-gradient)"
        strokeWidth="5"
        fill="none"
      />
      <path
        className="opacity-75"
        fill="url(#spinner-gradient)"
        d="M25 5
           a20 20 0 0 1 20 20
           h-5
           a15 15 0 0 0 -15 -15
           z"
      />
    </svg>
  );
}