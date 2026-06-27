import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'AIM Platform - Release 6 Shell',
  description: 'AIM Platform Release 6 app shell, navigation hardening, and route-page shell'
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

