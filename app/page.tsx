'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { AuthButton } from '@/components/auth-button';
import { GameCarousel } from '@/components/game-carousel';
import { Gamepad2, BarChart3, TrendingUp } from 'lucide-react';

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/dashboard');
    }
  }, [status, router]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-black to-black flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative flex items-center justify-center">
      <GameCarousel />
      
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        {/* Main Content */}
        <div className="mb-12">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-purple-600/20 rounded-full border border-purple-400/30">
              <Gamepad2 className="h-12 w-12 text-purple-400" />
            </div>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            What games did you play{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
              this year?
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-2xl mx-auto">
            Great question — let's find out.
          </p>
          
          <AuthButton />
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mt-16">
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <div className="p-3 bg-purple-600/20 rounded-lg w-fit mx-auto mb-4">
              <BarChart3 className="h-6 w-6 text-purple-400" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Stream Analytics</h3>
            <p className="text-gray-400">
              Track your streaming time across different games and see your most played titles.
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <div className="p-3 bg-blue-600/20 rounded-lg w-fit mx-auto mb-4">
              <Gamepad2 className="h-6 w-6 text-blue-400" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Game Library</h3>
            <p className="text-gray-400">
              Beautiful visualization of your gaming journey with cover art and metadata.
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <div className="p-3 bg-green-600/20 rounded-lg w-fit mx-auto mb-4">
              <TrendingUp className="h-6 w-6 text-green-400" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Insights</h3>
            <p className="text-gray-400">
              Discover patterns in your streaming habits and gaming preferences.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}