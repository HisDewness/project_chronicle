'use client';

import Image from 'next/image';
import { Clock } from 'lucide-react';

interface GameTileProps {
  gameName: string;
  coverArtUrl: string;
  totalDuration: number;
  streamCount: number;
}

function formatDuration(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  
  if (hours > 0) {
    return `${hours}h ${mins}m`;
  }
  return `${mins}m`;
}

export function GameTile({ gameName, coverArtUrl, totalDuration, streamCount }: GameTileProps) {
  return (
    <div className="group relative bg-white/10 backdrop-blur-sm rounded-xl overflow-hidden hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl border border-white/20">
      <div className="aspect-[3/4] relative overflow-hidden">
        <Image
          src={coverArtUrl}
          alt={gameName}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-300"
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-white text-lg mb-2 line-clamp-2 group-hover:text-purple-300 transition-colors">
          {gameName}
        </h3>
        
        <div className="flex items-center justify-between text-sm text-gray-300">
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            <span>{formatDuration(totalDuration)}</span>
          </div>
          <span className="text-purple-400">
            {streamCount} stream{streamCount !== 1 ? 's' : ''}
          </span>
        </div>
      </div>
    </div>
  );
}