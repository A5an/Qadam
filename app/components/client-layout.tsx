'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import BottomNav from './bottom-nav';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLoopsPage = pathname.startsWith('/loops');

  return (
    <>
      {children}
      <BottomNav isLoopsPage={isLoopsPage} /> {/* Conditionally render BottomNav */}
    </>
  );
}