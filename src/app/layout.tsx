'use client';

import * as React from 'react';
import { Toaster } from 'react-hot-toast';

import { ReduxProvider } from '@/store/ReduxProvider';

import '@/styles/globals.css';

import Header from '@/components/header';
import Footer from '@/components/footer';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        <ReduxProvider>
          <div className='bg-white'>
            <Header />
            {children}
            <Footer />
          </div>
        </ReduxProvider>
        <Toaster />
      </body>
    </html>
  );
}
