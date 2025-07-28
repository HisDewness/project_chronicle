import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { NextAuthProvider } from '@/components/session-provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Stream Analytics - Discover Your Gaming Journey',
  description: 'Analyze your Twitch streaming history and discover insights about your gaming habits.',
  keywords: 'twitch, streaming, analytics, gaming, dashboard',
  authors: [{ name: 'Stream Analytics Team' }],
  openGraph: {
    title: 'Stream Analytics',
    description: 'Discover what games you played this year with beautiful analytics.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextAuthProvider>
          {children}
        </NextAuthProvider>
      </body>
    </html>
  );
}