import { NextAuthOptions } from 'next-auth';
import { JWT } from 'next-auth/jwt';

declare module 'next-auth' {
  interface Session {
    accessToken?: string;
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    accessToken?: string;
    refreshToken?: string;
    userId?: string;
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    {
      id: 'twitch',
      name: 'Twitch',
      type: 'oauth',
      authorization: {
        url: 'https://id.twitch.tv/oauth2/authorize',
        params: {
          scope: 'user:read:email channel:read:stream_key',
          response_type: 'code',
        },
      },
      token: 'https://id.twitch.tv/oauth2/token',
      userinfo: 'https://api.twitch.tv/helix/users',
      clientId: process.env.TWITCH_CLIENT_ID,
      clientSecret: process.env.TWITCH_CLIENT_SECRET,
      profile(profile: any) {
        return {
          id: profile.data[0].id,
          name: profile.data[0].display_name,
          email: profile.data[0].email,
          image: profile.data[0].profile_image_url,
        };
      },
    },
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        token.userId = account.providerAccountId;
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.user.id = token.userId || '';
      return session;
    },
  },
  pages: {
    signIn: '/',
  },
  secret: process.env.NEXTAUTH_SECRET,
};