// app/layout.tsx

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { SessionProvider } from 'next-auth/react';
import { auth } from '@/auth';
import './globals.css';
import Header from '@/components/header/header'; // Adjust the path based on your file structure

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'LankaBidsLK',
  description: 'Concept ',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <html lang="en">
        <body className={inter.className}>
          {/* Include the Header component */}
          <Header />
          
          {/* Render the child components */}
          {children}
        </body>
      </html>
    </SessionProvider>
  );
}
