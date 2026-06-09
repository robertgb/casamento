export default function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center">
      <style>{`
        @keyframes spinClockwise {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes spinCounterClockwise {
          from {
            transform: rotate(360deg);
          }
          to {
            transform: rotate(0deg);
          }
        }

        .spinner-outer {
          animation: spinClockwise 3s linear infinite;
        }

        .spinner-inner {
          animation: spinCounterClockwise 2s linear infinite;
        }
      `}</style>

      <svg
        width="100"
        height="100"
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
        className="spinner-outer"
      >
        {/* Outer ring */}
        <circle
          cx="50"
          cy="50"
          r="40"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          className="text-primary-300"
          opacity="0.6"
        />

        {/* Outer ring accent */}
        <circle
          cx="50"
          cy="50"
          r="40"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeDasharray="62.8 251.2"
          className="text-primary-500"
          strokeLinecap="round"
        />
      </svg>

      <svg
        width="80"
        height="80"
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute spinner-inner"
      >
        {/* Inner ring */}
        <circle
          cx="50"
          cy="50"
          r="30"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          className="text-primary-400"
          opacity="0.5"
        />

        {/* Inner ring accent */}
        <circle
          cx="50"
          cy="50"
          r="30"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeDasharray="47.1 188.4"
          className="text-primary-600"
          strokeLinecap="round"
        />
      </svg>

      {/* Center heart decoration */}
      <div className="absolute">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="text-primary-500 animate-pulse"
        >
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
      </div>
    </div>
  );
}
