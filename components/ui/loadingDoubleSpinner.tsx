'use client';

import * as React from 'react';

interface LoadingDoubleSpinnerProps {
  message?: string;
  className?: string;
}

export function LoadingDoubleSpinner({
  message = 'Chargement...',
  className = '',
}: LoadingDoubleSpinnerProps) {
  return (
    <div
      className={`flex flex-col justify-center items-center py-20 space-y-4 ${className}`}
    >
      <svg
        className="animate-spin h-30 w-30 text-gray-500"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="1"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
        />
      </svg>
      <p className="text-gray-700 text-lg font-medium">{message}</p>
    </div>
  );
}
