import { useState, useEffect } from 'react'
import { Brain, LayoutDashboard, History, Sparkles, Loader2, AlertCircle, Zap } from 'lucide-react'
import ActivityForm from './components/ActivityForm'
import Dashboard from './components/Dashboard'
import InsightCard from './components/InsightCard'
import { useMining } from './hooks/useMining'

function App() {
  const [logs, setLogs] = useState<any[]>([])
  const { analyzeHabits, loading, error, analysis } = useMining()
  const [activeTab, setActiveTab] = useState<'dashboard' | 'history'>('dashboard')

  // Mock initial data if empty to show the possibilities
  useEffect(() => {
    const savedLogs = localStorage.getItem('behavior_logs')
    if (savedLogs) {
      setLogs(JSON.parse(savedLogs))
    }
  }, [])

  const handleAddLog = (newLog: any) => {
    const updatedLogs = [newLog, ...logs]
    setLogs(updatedLogs)
    localStorage.setItem('behavior_logs', JSON.stringify(updatedLogs))
  }

  const handleAnalyze = () => {
    analyzeHabits(logs)
  }

  const clearLogs = () => {
    setLogs([])
    localStorage.removeItem('behavior_logs')
  }

  return (
    <div className="container min-h-screen">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 py-8 border-b border-white/5">
        <div>
          <h1 className="text-4xl font-extrabold flex items-center gap-3 mb-2">
            <Brain size={40} className="text-purple-500" />
            <span className="title-gradient">Habit Miner</span>
          </h1>
          <p className="text-slate-400">Identify patterns. Optimize schedule. Peak performance.</p>
        </div>

        <div className="flex bg-white/5 p-1 rounded-xl border border-white/10">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`px-6 py-2 rounded-lg flex items-center gap-2 transition-all ${activeTab === 'dashboard' ? 'bg-purple-600 shadow-lg shadow-purple-900/20' : 'bg-transparent text-slate-400'}`}
          >
            <LayoutDashboard size={18} /> Dashboard
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`px-6 py-2 rounded-lg flex items-center gap-2 transition-all ${activeTab === 'history' ? 'bg-purple-600 shadow-lg shadow-purple-900/20' : 'bg-transparent text-slate-400'}`}
          >
            <History size={18} /> Log Feed
          </button>
        </div>
      </header>

      <main className="grid lg:grid-cols-12 gap-8 items-start">
        {/* Sidebar / Input Area */}
        <div className="lg:col-span-4 space-y-8">
          <ActivityForm onAddLog={handleAddLog} isSubmitting={false} />

          <div className="glass-card bg-gradient-to-br from-purple-900/20 to-pink-900/20">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Sparkles size={20} className="text-yellow-400" /> AI Habit Analysis
            </h3>
            <p className="text-sm text-slate-400 mb-6">
              Run the behavioral miner to detect energy sinks and productivity peaks using Gemini Pro.
            </p>
            <button
              onClick={handleAnalyze}
              disabled={loading || logs.length < 7}
              className="w-full flex justify-center items-center gap-2 py-4 shadow-xl shadow-purple-500/10"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  Mining Patterns...
                </>
              ) : (
                <>
                  <Brain size={20} />
                  Run Habit Miner {logs.length < 7 && `(${7 - logs.length} more logs)`}
                </>
              )}
            </button>
            {logs.length > 0 && (
              <button
                onClick={clearLogs}
                className="w-full mt-4 bg-transparent border border-white/10 text-slate-400 text-xs py-2"
              >
                Clear All Logs
              </button>
            )}
          </div>
        </div>

        {/* Presentation Area */}
        <div className="lg:col-span-8 space-y-8">
          {error && (
            <div className="glass-card border-red-500/20 flex items-center gap-3 text-red-400">
              <AlertCircle size={20} /> {error}
            </div>
          )}

          {analysis ? (
            <InsightCard analysis={analysis} />
          ) : activeTab === 'dashboard' ? (
            <Dashboard logs={logs} />
          ) : (
            <div className="glass-card">
              <h3 className="text-xl font-bold mb-6">Recent Activities</h3>
              <div className="space-y-4">
                {logs.length === 0 ? (
                  <p className="text-slate-500">No logs found. Start by adding one from the sidebar.</p>
                ) : (
                  logs.map((log, i) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5">
                      <div className="flex gap-4 items-center">
                        <div className={`p-3 rounded-lg ${log.energy_level > 7 ? 'bg-emerald-500/20 text-emerald-400' : 'bg-purple-500/20 text-purple-400'}`}>
                          <Sparkles size={20} />
                        </div>
                        <div>
                          <div className="font-semibold">{log.activity_name}</div>
                          <div className="text-xs text-slate-500">{new Date(log.timestamp).toLocaleString()}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium">{log.duration} min</div>
                        <div className="text-xs text-amber-400 flex items-center justify-end gap-1">
                          <Zap size={12} /> {log.energy_level}/10
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      </main>

      <footer className="mt-20 py-10 border-t border-white/5 text-center text-slate-500 text-sm">
        Built with Gemini Pro & Supabase &bull; AntiGravity Behavioral Science
      </footer>
    </div>
  )
}

export default App
