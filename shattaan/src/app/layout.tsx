import React, { ReactNode } from 'react';
import type { Metadata, Viewport } from 'next';
import { Providers } from '@/providers';
import '@/index.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://shattaan.com'),
  title: {
    default: 'SHATTAAN | Premium Online Marketplace & Curated Luxury Goods',
    template: '%s | SHATTAAN',
  },
  description:
    'Discover curated luxury fashion, premium tech, modern lifestyle essentials, and artisan goods at SHATTAAN (shattaan.com).',
  openGraph: {
    title: 'SHATTAAN | Premium Online Marketplace',
    description:
      'Discover curated luxury fashion, premium tech, modern lifestyle essentials, and artisan goods at SHATTAAN (shattaan.com).',
    url: 'https://shattaan.com',
    siteName: 'SHATTAAN',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SHATTAAN | Premium Online Marketplace',
    description:
      'Discover curated luxury fashion, premium tech, modern lifestyle essentials, and artisan goods at SHATTAAN (shattaan.com).',
  },
};

export const viewport: Viewport = {
  themeColor: '#FAF9F6',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en" className="h-full scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400;1,600&family=Syne:wght@600;700;800&family=Cinzel:wght@600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="h-full bg-[#FAF9F6] text-stone-900 antialiased selection:bg-stone-900 selection:text-amber-300">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
