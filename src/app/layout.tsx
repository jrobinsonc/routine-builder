import type { Metadata } from 'next';
import type { NextFont } from 'next/dist/compiled/@next/font';
import { Inter } from 'next/font/google';
import type { ReactElement } from 'react';
import './globals.css';

const inter: NextFont = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Routine Builder',
  description: 'Build your custom routines',
};

/**
 * @param props - props
 * @param props.children - children
 * @returns ReactElement
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): ReactElement {
  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-color-primary text-color-primary px-4`}
      >
        {children}
      </body>
    </html>
  );
}
