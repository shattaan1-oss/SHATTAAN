'use client';

import React, { ReactNode } from 'react';
import { StoreProvider } from '@/context/StoreContext';
import { Header } from '@/components/common/Header';
import { Footer } from '@/components/common/Footer';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { QuickViewModal } from '@/components/common/QuickViewModal';
import { ToastContainer } from '@/components/common/ToastContainer';

export function Providers({ children }: { children?: ReactNode }) {
  return (
    <StoreProvider>
      <div className="min-h-screen flex flex-col bg-[#FAF9F6] text-stone-900 selection:bg-stone-900 selection:text-amber-300">
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
        <CartDrawer />
        <QuickViewModal />
        <ToastContainer />
      </div>
    </StoreProvider>
  );
}
