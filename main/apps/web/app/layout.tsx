import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'AIM Platform - Release 5 Workbench',
  description: 'AIM Platform Release 5 front-end usability and design system hardening workbench'
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
