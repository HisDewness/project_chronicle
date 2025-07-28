# 🎮 Project Chronicle

A web app for tracking games that streamers have played while live

## ✨ Features

- **Twitch OAuth Authentication** - Secure login with your Twitch account
- **Stream History Analysis** - Fetch and analyze your past streaming data
- **Game Metadata Integration** - Beautiful game cover art and information
- **Responsive Dashboard** - Modern UI that works on all devices
- **Real-time Data** - Fresh insights from the Twitch API

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- A Twitch application (for OAuth credentials)

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd stream-analytics
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.local.example .env.local
```

4. Configure your Twitch OAuth application:
   - Go to [Twitch Developer Console](https://dev.twitch.tv/console)
   - Create a new application
   - Set the OAuth Redirect URL to: `http://localhost:3000/api/auth/callback/twitch`
   - Copy your Client ID and Client Secret to `.env.local`

5. Generate a NextAuth secret:
```bash
openssl rand -base64 32
```
Add this to your `.env.local` as `NEXTAUTH_SECRET`

6. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file with the following variables:

```env
TWITCH_CLIENT_ID=your_twitch_client_id
TWITCH_CLIENT_SECRET=your_twitch_client_secret
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_generated_secret
```

### Twitch OAuth Setup

1. Visit the [Twitch Developer Console](https://dev.twitch.tv/console)
2. Click "Register Your Application"
3. Fill in the application details:
   - **Name**: Your app name
   - **OAuth Redirect URLs**: `http://localhost:3000/api/auth/callback/twitch`
   - **Category**: Choose appropriate category
4. Save your Client ID and Client Secret

## 📁 Project Structure

```
stream-analytics/
├── app/                    # Next.js app router
│   ├── api/               # API routes
│   ├── dashboard/         # Dashboard page
│   └── page.tsx          # Landing page
├── components/            # React components
├── lib/                  # Utility functions
├── public/               # Static assets
└── ...config files
```

## 🎨 Tech Stack

- **Framework**: Next.js 13+ (App Router)
- **Authentication**: NextAuth.js
- **Styling**: Tailwind CSS + shadcn/ui
- **Language**: TypeScript
- **API**: Twitch Helix API

## 📱 Features Overview

### Landing Page
- Beautiful hero section with animated game covers
- Twitch OAuth login button
- Feature showcase

### Dashboard
- Streaming statistics overview
- Game library with cover art
- Total streaming time and session counts
- Responsive grid layout

### Analytics
- Game-wise streaming duration
- Stream frequency analysis
- Visual data representation

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Configure environment variables in Vercel dashboard
4. Deploy!

Make sure to update your `NEXTAUTH_URL` to your production domain.

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- AWS Amplify
- DigitalOcean App Platform

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Twitch for providing the excellent Helix API
- The Next.js team for the amazing framework
- shadcn/ui for the beautiful component library
- The streaming community for inspiration

---

Made with ❤️ for the streaming community