"use client";

import { useRouter } from 'next/navigation';
import { LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export function LogoutButton() {
  const router = useRouter();
  const { toast } = useToast();

  const handleLogout = async () => {
    const token = localStorage.getItem('token');
    
    // Even if there's no token, clear storage and redirect
    if (!token) {
      localStorage.clear();
      router.push('/login');
      return;
    }

    try {
      const response = await fetch('https://api.solanoafk.com/api/auth/logout', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      // Logout client-side regardless of API response status (e.g. 401 Unauthorized for expired token)
      if (response.ok) {
         toast({
            title: "Logged Out",
            description: "You have been successfully logged out.",
        });
      }

    } catch (error) {
      console.error('Logout API call failed:', error);
       toast({
          variant: 'destructive',
          title: 'Server Error',
          description: 'Could not contact the server, but you have been logged out locally.',
        });
    } finally {
        // Always clear local storage and redirect
        localStorage.clear();
        router.push('/login');
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline">
          <LogOut className="mr-2 h-4 w-4" />
          <span>Logout</span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure you want to log out?</AlertDialogTitle>
          <AlertDialogDescription>
            You will be returned to the login page.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleLogout}>Logout</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
