export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-black to-black">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-white mb-8">About Stream Analytics</h1>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20">
            <p className="text-gray-300 text-lg mb-6">
              Stream Analytics helps Twitch streamers understand their gaming habits and streaming patterns. 
              By connecting your Twitch account, you can visualize which games you've played, how much time 
              you've spent streaming each title, and discover insights about your content creation journey.
            </p>
            
            <h2 className="text-2xl font-semibold text-white mb-4">Features</h2>
            <ul className="text-gray-300 space-y-2 mb-6">
              <li>• Secure Twitch OAuth authentication</li>
              <li>• Stream history analysis</li>
              <li>• Game metadata and cover art</li>
              <li>• Beautiful data visualizations</li>
              <li>• Responsive design for all devices</li>
            </ul>
            
            <h2 className="text-2xl font-semibold text-white mb-4">Privacy</h2>
            <p className="text-gray-300">
              We only access your public streaming data and never store your Twitch credentials. 
              Your data is processed securely and used solely for generating your personal analytics.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}