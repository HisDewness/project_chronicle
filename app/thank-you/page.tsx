export default function ThankYou() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-black to-black">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-white mb-8">Thank You!</h1>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20">
            <p className="text-gray-300 text-lg mb-6">
              Thank you for using Stream Analytics! We're passionate about helping streamers 
              understand their content and grow their communities.
            </p>
            
            <h2 className="text-2xl font-semibold text-white mb-4">Special Thanks</h2>
            <div className="text-gray-300 space-y-4 mb-8">
              <p>• The Twitch developer community for their amazing API</p>
              <p>• All the streamers who provide feedback and suggestions</p>
              <p>• The open-source community for the tools that make this possible</p>
              <p>• Every user who trusts us with their streaming data</p>
            </div>
            
            <h2 className="text-2xl font-semibold text-white mb-4">Support the Project</h2>
            <p className="text-gray-300 mb-6">
              Stream Analytics is built with love by developers who care about the streaming community. 
              If you find this tool useful, consider sharing it with other streamers or contributing to its development.
            </p>
            
            <div className="bg-purple-600/20 rounded-lg p-6 border border-purple-400/30">
              <p className="text-purple-300 font-semibold">
                "Understanding your content is the first step to improving it."
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}