'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

const gameCovers = [
  {
    name: 'Valorant',
    url: 'https://static-cdn.jtvnw.net/ttv-boxart/516575-285x380.jpg',
  },
  {
    name: 'League of Legends',
    url: 'https://static-cdn.jtvnw.net/ttv-boxart/21779-285x380.jpg',
  },
  {
    name: 'Minecraft',
    url: 'https://static-cdn.jtvnw.net/ttv-boxart/27471_IGDB-285x380.jpg',
  },
  {
    name: 'Counter-Strike 2',
    url: 'https://static-cdn.jtvnw.net/ttv-boxart/32399_IGDB-285x380.jpg',
  },
  {
    name: 'Fortnite',
    url: 'https://static-cdn.jtvnw.net/ttv-boxart/33214-285x380.jpg',
  },
  {
    name: 'Apex Legends',
    url: 'https://static-cdn.jtvnw.net/ttv-boxart/511224-285x380.jpg',
  },
];

export function GameCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % gameCovers.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black/50 to-black/80" />
      <div className="flex h-full">
        {gameCovers.map((game, index) => (
          <div
            key={game.name}
            className={`relative transition-all duration-1000 ease-in-out ${
              index === currentIndex
                ? 'flex-[2] opacity-100'
                : 'flex-1 opacity-60'
            }`}
          >
            <Image
              src={game.url}
              alt={game.name}
              fill
              className="object-cover"
              unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          </div>
        ))}
      </div>
    </div>
  );
}