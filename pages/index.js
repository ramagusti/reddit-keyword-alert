import { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';

export default function Home() {
  const [keywords, setKeywords] = useState('');
  const [subreddits, setSubreddits] = useState('');
  const [email, setEmail] = useState('');
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const res = await fetch('/api/create-alert', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          keywords: keywords.split(',').map(k => k.trim()),
          subreddits: subreddits.split(',').map(s => s.trim()),
          email
        })
      });

      const data = await res.json();
      
      if (res.ok) {
        setMessage('✅ Alert created successfully!');
        fetchAlerts();
      } else {
        setMessage(`❌ Error: ${data.error}`);
      }
    } catch (e) {
      setMessage('❌ Failed to create alert');
    } finally {
      setLoading(false);
    }
  };

  const fetchAlerts = async () => {
    try {
      const res = await fetch('/api/alerts');
      const data = await res.json();
      setAlerts(data);
    } catch (e) {
      console.error('Failed to fetch alerts');
    }
  };

  useEffect(() => {
    fetchAlerts();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      <Head>
        <title>Reddit Keyword Alert - Monitor Reddit for Keywords</title>
        <meta name="description" content="Get notified when keywords appear on Reddit" />
        <link rel="icon" type="image/png" href="/favicon.png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </Head>

      <main className="max-w-4xl mx-auto px-4 py-12">
        {/* Logo and Title */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="relative w-20 h-20">
              <Image
                src="/logo.png"
                alt="Reddit Alert"
                fill
                className="object-contain"
                priority
              />
            </div>
            <h1 className="text-5xl font-extrabold text-gray-900">
              Reddit <span className="text-[#FF4500]">Alert</span>
            </h1>
          </div>
          <p className="text-xl text-gray-600">
            Monitor Reddit for keywords and get instant notifications
          </p>
        </div>

        {/* Create Alert Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border-t-4 border-[#FF4500]">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <span className="w-8 h-8 bg-[#FF4500] rounded-full flex items-center justify-center text-white text-sm">1</span>
            Create New Alert
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Keywords to Monitor <span className="text-[#FF4500]">*</span>
              </label>
              <input
                type="text"
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
                placeholder="e.g., startup, saas, marketing"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0079D3] focus:border-[#0079D3] outline-none transition-all"
              />
              <p className="text-sm text-gray-500 mt-1">
                Enter keywords separated by commas
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Subreddits to Monitor <span className="text-gray-400">(optional)</span>
              </label>
              <input
                type="text"
                value={subreddits}
                onChange={(e) => setSubreddits(e.target.value)}
                placeholder="e.g., startups, marketing, entrepreneur"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0079D3] focus:border-[#0079D3] outline-none transition-all"
              />
              <p className="text-sm text-gray-500 mt-1">
                Leave empty to monitor all of Reddit
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email for Notifications <span className="text-[#FF4500]">*</span>
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0079D3] focus:border-[#0079D3] outline-none transition-all"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-[#FF4500] text-white font-bold rounded-lg hover:bg-[#E03D00] disabled:opacity-50 transition-colors shadow-lg"
            >
              {loading ? 'Creating Alert...' : 'Create Alert'}
            </button>
          </form>

          {message && (
            <div className={`mt-4 p-4 rounded-lg ${message.includes('✅') ? 'bg-green-100 text-green-800 border border-green-200' : 'bg-red-100 text-red-800 border border-red-200'}`}>
              {message}
            </div>
          )}
        </div>

        {/* How It Works */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border-t-4 border-[#0079D3]">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-2">
            <span className="w-8 h-8 bg-[#0079D3] rounded-full flex items-center justify-center text-white text-sm">2</span>
            How It Works
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-4">
              <div className="w-16 h-16 bg-gradient-to-br from-[#FF4500] to-[#FF6B35] rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Add Keywords</h3>
              <p className="text-gray-600 text-sm">Enter keywords you want to monitor on Reddit</p>
            </div>

            <div className="text-center p-4">
              <div className="w-16 h-16 bg-gradient-to-br from-[#0079D3] to-[#3293D3] rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <span className="text-2xl font-bold text-white">2</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">We Monitor</h3>
              <p className="text-gray-600 text-sm">Our system scans Reddit every few minutes</p>
            </div>

            <div className="text-center p-4">
              <div className="w-16 h-16 bg-gradient-to-br from-[#FF4500] to-[#0079D3] rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <span className="text-2xl font-bold text-white">3</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Get Notified</h3>
              <p className="text-gray-600 text-sm">Receive email alerts when keywords are found</p>
            </div>
          </div>
        </div>

        {/* Active Alerts */}
        {alerts.length > 0 && (
          <div className="mt-8 bg-white rounded-2xl shadow-xl p-8 border-t-4 border-[#FF4500]">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <span className="w-8 h-8 bg-[#FF4500] rounded-full flex items-center justify-center text-white text-sm">3</span>
              Your Active Alerts
            </h2>
            <div className="space-y-4">
              {alerts.map((alert, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4 hover:border-[#0079D3] transition-colors">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium text-gray-900">
                        <span className="text-[#FF4500]">Keywords:</span> {alert.keywords.join(', ')}
                      </p>
                      <p className="text-sm text-gray-600 mt-1">
                        <span className="text-[#0079D3]">Subreddits:</span> {alert.subreddits.join(', ') || 'All of Reddit'}
                      </p>
                      <p className="text-sm text-gray-500 mt-1">{alert.email}</p>
                    </div>
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium border border-green-200">
                      Active
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="relative w-8 h-8">
              <Image src="/logo.png" alt="Reddit Alert" fill className="object-contain" />
            </div>
            <span className="font-bold text-xl">Reddit <span className="text-[#FF4500]">Alert</span></span>
          </div>
          <p className="text-gray-400 text-sm">
            Monitor Reddit keywords and never miss important conversations
          </p>
        </div>
      </footer>
    </div>
  );
}
