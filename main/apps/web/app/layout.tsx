import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'AIM Platform',
  description: 'AIM Platform Release 0 foundation shell'
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
