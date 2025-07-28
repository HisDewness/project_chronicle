import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

interface TwitchVideo {
  id: string;
  user_id: string;
  user_login: string;
  user_name: string;
  title: string;
  description: string;
  created_at: string;
  published_at: string;
  url: string;
  thumbnail_url: string;
  viewable: string;
  view_count: number;
  language: string;
  type: string;
  duration: string;
}

interface TwitchGame {
  id: string;
  name: string;
  box_art_url: string;
  igdb_id: string;
}

interface StreamData {
  gameName: string;
  coverArtUrl: string;
  totalDuration: number;
  streamCount: number;
}

function parseDuration(duration: string): number {
  // Parse Twitch duration format (e.g., "2h3m45s" or "45m30s")
  const hours = duration.match(/(\d+)h/);
  const minutes = duration.match(/(\d+)m/);
  const seconds = duration.match(/(\d+)s/);

  let totalMinutes = 0;
  if (hours) totalMinutes += parseInt(hours[1]) * 60;
  if (minutes) totalMinutes += parseInt(minutes[1]);
  if (seconds) totalMinutes += Math.ceil(parseInt(seconds[1]) / 60);

  return totalMinutes;
}

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.accessToken || !session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const clientId = process.env.TWITCH_CLIENT_ID;
    if (!clientId) {
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }

    // Fetch user's videos (past streams)
    const videosResponse = await fetch(
      `https://api.twitch.tv/helix/videos?user_id=${session.user.id}&type=archive&first=100`,
      {
        headers: {
          'Client-ID': clientId,
          'Authorization': `Bearer ${session.accessToken}`,
        },
      }
    );

    if (!videosResponse.ok) {
      console.error('Twitch API error:', await videosResponse.text());
      return NextResponse.json({ error: 'Failed to fetch streams' }, { status: 500 });
    }

    const videosData = await videosResponse.json();
    const videos: TwitchVideo[] = videosData.data || [];

    if (videos.length === 0) {
      return NextResponse.json([]);
    }

    // Extract unique game IDs from video titles/descriptions
    // In a real implementation, you'd need to track game IDs differently
    // For demo purposes, we'll create some mock data
    const gameStats = new Map<string, StreamData>();

    // Sample game data since we don't have actual game tracking
    const sampleGames = [
      { name: 'Just Chatting', coverUrl: 'https://static-cdn.jtvnw.net/ttv-boxart/509658-285x380.jpg' },
      { name: 'Valorant', coverUrl: 'https://static-cdn.jtvnw.net/ttv-boxart/516575-285x380.jpg' },
      { name: 'League of Legends', coverUrl: 'https://static-cdn.jtvnw.net/ttv-boxart/21779-285x380.jpg' },
      { name: 'Minecraft', coverUrl: 'https://static-cdn.jtvnw.net/ttv-boxart/27471_IGDB-285x380.jpg' },
      { name: 'Counter-Strike 2', coverUrl: 'https://static-cdn.jtvnw.net/ttv-boxart/32399_IGDB-285x380.jpg' },
      { name: 'Fortnite', coverUrl: 'https://static-cdn.jtvnw.net/ttv-boxart/33214-285x380.jpg' },
    ];

    // Simulate game distribution across streams
    videos.forEach((video, index) => {
      const game = sampleGames[index % sampleGames.length];
      const duration = parseDuration(video.duration);

      if (gameStats.has(game.name)) {
        const existing = gameStats.get(game.name)!;
        existing.totalDuration += duration;
        existing.streamCount += 1;
      } else {
        gameStats.set(game.name, {
          gameName: game.name,
          coverArtUrl: game.coverUrl,
          totalDuration: duration,
          streamCount: 1,
        });
      }
    });

    // Convert to array and sort by total duration
    const result = Array.from(gameStats.values()).sort(
      (a, b) => b.totalDuration - a.totalDuration
    );

    return NextResponse.json(result);
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}