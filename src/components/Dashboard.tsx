import React, { useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { BarChart3, TrendingUp } from 'lucide-react';

interface DashboardProps {
    logs: any[];
}

const Dashboard: React.FC<DashboardProps> = ({ logs }) => {
    const chartData = useMemo(() => {
        // Group logs by hour for energy distribution
        const hours = Array.from({ length: 24 }, (_, i) => ({
            hour: `${i}:00`,
            avgEnergy: 0,
            count: 0
        }));

        logs.forEach(log => {
            const date = new Date(log.timestamp);
            const hour = date.getHours();
            hours[hour].avgEnergy += log.energy_level;
            hours[hour].count += 1;
        });

        return hours.map(h => ({
            hour: h.hour,
            energy: h.count > 0 ? Number((h.avgEnergy / h.count).toFixed(1)) : 0
        }));
    }, [logs]);

    const activityData = useMemo(() => {
        const counts: Record<string, number> = {};
        logs.forEach(log => {
            counts[log.activity_name] = (counts[log.activity_name] || 0) + 1;
        });
        return Object.entries(counts)
            .map(([name, count]) => ({ name, count }))
            .sort((a, b) => b.count - a.count)
            .slice(0, 5);
    }, [logs]);

    if (logs.length === 0) {
        return (
            <div className="glass-card flex flex-col items-center justify-center p-20 text-center">
                <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mb-4">
                    <BarChart3 className="text-purple-400" size={32} />
                </div>
                <h3 className="text-xl font-semibold mb-2">No Behavioral Data Yet</h3>
                <p className="text-slate-400 max-w-xs">
                    Start logging your activities to visualize your energy patterns and productivity windows.
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
                <div className="md:col-span-2 glass-card">
                    <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
                        <TrendingUp size={18} className="text-emerald-400" /> Energy Distribution (24h)
                    </h3>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={chartData}>
                                <defs>
                                    <linearGradient id="colorEnergy" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#a855f7" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#a855f7" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                                <XAxis
                                    dataKey="hour"
                                    stroke="#94a3b8"
                                    fontSize={12}
                                    tickLine={false}
                                    axisLine={false}
                                />
                                <YAxis
                                    stroke="#94a3b8"
                                    fontSize={12}
                                    tickLine={false}
                                    axisLine={false}
                                    domain={[0, 10]}
                                />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: '#1e1b4b',
                                        border: '1px solid rgba(255,255,255,0.1)',
                                        borderRadius: '8px'
                                    }}
                                    itemStyle={{ color: '#a855f7' }}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="energy"
                                    stroke="#a855f7"
                                    fillOpacity={1}
                                    fill="url(#colorEnergy)"
                                    strokeWidth={3}
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="glass-card">
                    <h3 className="text-lg font-semibold mb-6">Top Activities</h3>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={activityData} layout="vertical">
                                <XAxis type="number" hide />
                                <YAxis
                                    dataKey="name"
                                    type="category"
                                    stroke="#94a3b8"
                                    fontSize={12}
                                    width={80}
                                    tickLine={false}
                                    axisLine={false}
                                />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: '#1e1b4b',
                                        border: '1px solid rgba(255,255,255,0.1)',
                                        borderRadius: '8px'
                                    }}
                                />
                                <Bar dataKey="count" fill="#ec4899" radius={[0, 4, 4, 0]} barSize={20} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
