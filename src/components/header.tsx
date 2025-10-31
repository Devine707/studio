import Link from 'next/link';
import { Sheet, SheetTrigger, SheetContent } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Menu, Stethoscope } from 'lucide-react';
import Logo from '@/components/logo';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Logo />
            <span className="hidden font-bold sm:inline-block">Devine</span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link
              href="/routine"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              My Routine
            </Link>
          </nav>
        </div>
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-full max-w-xs bg-background">
              <div className="flex h-full flex-col">
                <div className="border-b p-4">
                  <Link href="/" className="flex items-center space-x-2">
                    <Logo />
                    <span className="font-bold">Devine</span>
                  </Link>
                </div>
                <nav className="flex flex-col p-4 space-y-4">
                  <Link
                    href="/scan"
                    className="text-lg font-medium transition-colors hover:text-foreground"
                  >
                    Start Scan
                  </Link>
                  <Link
                    href="/routine"
                    className="text-lg font-medium transition-colors hover:text-foreground"
                  >
                    My Routine
                  </Link>
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-2">
          <Button asChild>
            <Link href="/scan">
              <Stethoscope className="mr-2 h-4 w-4" />
              New Scan
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
