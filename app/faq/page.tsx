export default function FAQ() {
  const faqs = [
    {
      question: "How does Stream Analytics work?",
      answer: "We use Twitch's API to fetch your streaming history and analyze which games you've played. The data is processed to show you insights about your streaming habits."
    },
    {
      question: "Is my data secure?",
      answer: "Yes! We use OAuth authentication and never store your Twitch credentials. All data processing happens securely, and we only access publicly available information."
    },
    {
      question: "Why can't I see all my streams?",
      answer: "Twitch's API has limitations on historical data. We can typically access your most recent streams, but older content may not be available through the API."
    },
    {
      question: "Can I export my data?",
      answer: "This feature is planned for a future update. Currently, you can view your analytics within the dashboard."
    },
    {
      question: "What games are supported?",
      answer: "All games available on Twitch are supported. We fetch game metadata including cover art and titles automatically."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-black to-black">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-white mb-8">Frequently Asked Questions</h1>
          
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <h2 className="text-xl font-semibold text-white mb-3">{faq.question}</h2>
                <p className="text-gray-300">{faq.answer}</p>
              </div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <p className="text-gray-300">
              Have more questions? Feel free to reach out to us for support.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}