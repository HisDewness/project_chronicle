export default function Roadmap() {
  const roadmapItems = [
    {
      status: "completed",
      title: "Twitch OAuth Authentication",
      description: "Secure login with Twitch accounts"
    },
    {
      status: "completed",
      title: "Stream History Analysis",
      description: "Fetch and analyze past streaming data"
    },
    {
      status: "completed",
      title: "Game Metadata Integration",
      description: "Display game cover art and information"
    },
    {
      status: "in-progress",
      title: "Advanced Analytics",
      description: "Detailed insights and trending analysis"
    },
    {
      status: "planned",
      title: "Data Export",
      description: "Export your streaming data in various formats"
    },
    {
      status: "planned",
      title: "Custom Time Ranges",
      description: "Filter data by specific time periods"
    },
    {
      status: "planned",
      title: "Comparison Features",
      description: "Compare your stats with other streamers"
    },
    {
      status: "planned",
      title: "Mobile App",
      description: "Native mobile application for iOS and Android"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500";
      case "in-progress":
        return "bg-yellow-500";
      case "planned":
        return "bg-gray-500";
      default:
        return "bg-gray-500";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "completed":
        return "Completed";
      case "in-progress":
        return "In Progress";
      case "planned":
        return "Planned";
      default:
        return "Unknown";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-black to-black">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-white mb-8">Development Roadmap</h1>
          
          <p className="text-gray-300 text-lg mb-12">
            Here's what we're working on to make Stream Analytics even better. 
            We're constantly improving the platform based on user feedback.
          </p>
          
          <div className="space-y-6">
            {roadmapItems.map((item, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-4">
                    <div className={`w-3 h-3 rounded-full ${getStatusColor(item.status)} mt-2`}></div>
                  </div>
                  <div className="flex-grow">
                    <div className="flex items-center mb-2">
                      <h3 className="text-xl font-semibold text-white mr-3">{item.title}</h3>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        item.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                        item.status === 'in-progress' ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-gray-500/20 text-gray-400'
                      }`}>
                        {getStatusText(item.status)}
                      </span>
                    </div>
                    <p className="text-gray-300">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <p className="text-gray-300">
              Have suggestions for new features? We'd love to hear your feedback!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}