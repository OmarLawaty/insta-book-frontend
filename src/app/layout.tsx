import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { headers } from 'next/headers';
import './globals.css';

import { Providers } from '@/components';
import NextTopLoader from 'nextjs-toploader';
import { isLoggedInHeaderKey } from '@/proxy/const';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Instabook',
  description: 'Next generation social media app that combines the best features of Instagram and Facebook.',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const requestHeaders = await headers();
  const loginState = requestHeaders.get(isLoggedInHeaderKey);

  return (
    <html lang='en'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-w-screen min-h-screen`}
      >
        <NextTopLoader color='#877eff' />

        <Providers isLoggedIn={loginState === 'true'}>{children}</Providers>
      </body>
    </html>
  );
}
