"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Logo } from '@/components/logo';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ThemeToggle } from '@/components/theme-toggle';
import { LogoutButton } from '@/components/logout-button';
import { Skeleton } from '@/components/ui/skeleton';

type User = {
  nombre: string;
  correo: string;
  username: string;
};

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const userAvatar = PlaceHolderImages.find(p => p.id === 'user-avatar');

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    if (!token || !userData) {
      router.push('/login');
    } else {
      try {
        setUser(JSON.parse(userData));
      } catch (error) {
        console.error("Failed to parse user data", error);
        localStorage.clear();
        router.push('/login');
      } finally {
        setLoading(false);
      }
    }
  }, [router]);
  
  if (loading || !user) {
    return (
      <div className="flex min-h-screen w-full flex-col bg-muted/40">
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-background px-4 sm:px-6">
          <Logo href="/dashboard" />
          <div className="flex items-center gap-4">
            <Skeleton className="h-9 w-9 rounded-full" />
            <Skeleton className="h-9 w-24" />
          </div>
        </header>
        <main className="flex flex-1 items-center justify-center">
          <p>Loading...</p>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-background px-4 sm:px-6">
        <Logo href="/dashboard" />
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <Avatar className="h-9 w-9">
            <AvatarImage src={userAvatar?.imageUrl} data-ai-hint={userAvatar?.imageHint} alt="User" />
            <AvatarFallback>{user?.nombre?.charAt(0) || 'U'}</AvatarFallback>
          </Avatar>
          <LogoutButton />
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
              Welcome, {user.nombre}!
            </h2>
            <p className="text-muted-foreground">
              This is your secure dashboard. You are logged in as {user.username}.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
