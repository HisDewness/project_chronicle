'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { GameTile } from '@/components/game-tile';
import { Button } from '@/components/ui/button';
import { AuthButton } from '@/components/auth-button';
import { RefreshCw, TrendingUp, Clock, Gamepad2 } from 'lucide-react';

interface StreamData {
  gameName: string;
  coverArtUrl: string;
  totalDuration: number;
  streamCount: number;
}

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [streams, setStreams] = useState<StreamData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/');
      return;
    }

    if (status === 'authenticated') {
      fetchStreams();
    }
  }, [status, router]);

  const fetchStreams = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('/api/streams');
      if (!response.ok) {
        throw new Error('Failed to fetch streams');
      }
      
      const data = await response.json();
      setStreams(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-black to-black flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (status === 'unauthenticated') {
    return null;
  }

  const totalDuration = streams.reduce((sum, stream) => sum + stream.totalDuration, 0);
  const totalStreams = streams.reduce((sum, stream) => sum + stream.streamCount, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-black to-black">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div className="mb-4 md:mb-0">
            <h1 className="text-4xl font-bold text-white mb-2">
              Welcome back, {session?.user?.name}!
            </h1>
            <p className="text-gray-300 text-lg">
              Here's your streaming analytics
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <Button
              onClick={fetchStreams}
              disabled={loading}
              variant="outline"
              className="border-purple-300 text-purple-300 hover:bg-purple-300 hover:text-black"
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
            <AuthButton />
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <div className="flex items-center">
              <div className="p-3 bg-purple-600 rounded-lg">
                <Gamepad2 className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-gray-300 text-sm">Games Played</p>
                <p className="text-2xl font-bold text-white">{streams.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <div className="flex items-center">
              <div className="p-3 bg-blue-600 rounded-lg">
                <Clock className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-gray-300 text-sm">Total Stream Time</p>
                <p className="text-2xl font-bold text-white">
                  {Math.floor(totalDuration / 60)}h {totalDuration % 60}m
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <div className="flex items-center">
              <div className="p-3 bg-green-600 rounded-lg">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-gray-300 text-sm">Total Streams</p>
                <p className="text-2xl font-bold text-white">{totalStreams}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        {error && (
          <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-4 mb-6">
            <p className="text-red-200">Error: {error}</p>
          </div>
        )}

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white/10 backdrop-blur-sm rounded-xl p-4 animate-pulse">
                <div className="aspect-[3/4] bg-gray-600 rounded-lg mb-4"></div>
                <div className="h-6 bg-gray-600 rounded mb-2"></div>
                <div className="h-4 bg-gray-600 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        ) : streams.length === 0 ? (
          <div className="text-center py-16">
            <Gamepad2 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No streams found</h3>
            <p className="text-gray-400 mb-6">
              We couldn't find any streaming data for your account.
            </p>
            <Button onClick={fetchStreams} className="bg-purple-600 hover:bg-purple-700">
              Try Again
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {streams.map((stream, index) => (
              <GameTile
                key={`${stream.gameName}-${index}`}
                gameName={stream.gameName}
                coverArtUrl={stream.coverArtUrl}
                totalDuration={stream.totalDuration}
                streamCount={stream.streamCount}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}