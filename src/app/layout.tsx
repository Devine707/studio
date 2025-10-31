import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import Header from '@/components/header';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Devine AI Skin Advisor',
  description:
    'Your personal AI skin advisor for personalized treatment recommendations.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={cn(
          'min-h-screen bg-background font-body antialiased flex flex-col'
        )}
      >
        <Header />
        <main className="flex-1 flex flex-col">{children}</main>
        <footer className="w-full border-t">
          <div className="container py-6 flex items-center justify-center text-sm text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} Devine. All rights reserved.</p>
          </div>
        </footer>
        <Toaster />
      </body>
    </html>
  );
}
