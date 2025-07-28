'use client';

import { signIn, signOut, useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { LogOut, Twitch } from 'lucide-react';

export function AuthButton() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return (
      <Button disabled className="bg-purple-600 hover:bg-purple-700">
        Loading...
      </Button>
    );
  }

  if (session) {
    return (
      <Button
        onClick={() => signOut()}
        variant="outline"
        className="border-purple-300 text-purple-600 hover:bg-purple-50"
      >
        <LogOut className="mr-2 h-4 w-4" />
        Sign Out
      </Button>
    );
  }

  return (
    <Button
      onClick={() => signIn('twitch')}
      className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-8 py-6 text-lg rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
    >
      <Twitch className="mr-3 h-6 w-6" />
      Connect with Twitch
    </Button>
  );
}