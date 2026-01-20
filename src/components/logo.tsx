import { Droplets } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export function Logo({ className, href = "/login" }: { className?: string; href?: string }) {
  return (
    <Link href={href} className={cn("flex items-center gap-2 text-primary", className)}>
      <Droplets className="h-7 w-7" />
      <span className="text-2xl font-bold tracking-tight">AquaLogin</span>
    </Link>
  );
}
