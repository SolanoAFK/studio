import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { LogOut } from 'lucide-react';
import { Logo } from '@/components/logo';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ThemeToggle } from '@/components/theme-toggle';


export default function DashboardPage() {
  const userAvatar = PlaceHolderImages.find(p => p.id === 'user-avatar');
  
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-background px-4 sm:px-6">
        <Logo href="/dashboard" />
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <Avatar className="h-9 w-9">
            <AvatarImage src={userAvatar?.imageUrl} data-ai-hint={userAvatar?.imageHint} alt="User" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          <Link href="/login">
            <Button variant="outline">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Logout</span>
            </Button>
          </Link>
        </div>
      </header>
      <main className="flex flex-1 flex-col gap-4 p-4 sm:p-6">
        <div className="flex items-center">
          <h1 className="text-lg font-semibold md:text-2xl">Dashboard</h1>
        </div>
        <div
          className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm"
        >
          <div className="flex flex-col items-center gap-2 text-center">
            <h2 className="text-2xl font-bold tracking-tight">
              You are now logged in!
            </h2>
            <p className="text-muted-foreground">
              This is your secure dashboard. Feel free to explore.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
