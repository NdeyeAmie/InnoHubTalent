'use client';

import React, { ReactNode } from 'react';

interface TruncatedCellProps {
  children: ReactNode;
  className?: string;
}

export function TruncatedCell({
  children,
  className = '',
}: TruncatedCellProps) {
  return (
    <span className={`whitespace-normal break-all ${className}`}>
      {children}
    </span>
  );
}
