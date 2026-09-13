import Link from 'next/link';

import { Command } from 'lucide-react';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50/50 p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-md space-y-6">
        <div className="flex items-center justify-center gap-2">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <div className="bg-primary text-primary-foreground flex size-8 items-center justify-center rounded-lg">
              <Command className="size-4" />
            </div>
            <span className="text-lg tracking-tight">Acme Dashboard</span>
          </Link>
        </div>
        {children}
      </div>
    </div>
  );
}
