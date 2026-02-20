import React from 'react';
import { Target, Skull, CalendarCheck, Sparkles } from 'lucide-react';

interface InsightCardProps {
    analysis: {
        productivity_killers: any[];
        high_output_windows: any[];
        restructured_schedule: any[];
        narrative_insight: string;
    };
}

const InsightCard: React.FC<InsightCardProps> = ({ analysis }) => {
    return (
        <div className="space-y-6 animate-fade-in">
            <div className="glass-card">
                <h2 className="title-gradient mb-4 text-2xl flex items-center gap-2">
                    <Sparkles className="text-yellow-400" /> Behavioral Insight
                </h2>
                <p className="text-slate-300 leading-relaxed italic">
                    "{analysis.narrative_insight}"
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                <div className="glass-card border-red-500/20">
                    <h3 className="text-red-400 flex items-center gap-2 mb-4 font-bold">
                        <Skull size={20} /> Productivity Killers
                    </h3>
                    <ul className="space-y-3">
                        {analysis.productivity_killers.map((p, i) => (
                            <li key={i} className="bg-white/5 p-3 rounded-lg border border-white/5">
                                <div className="font-semibold text-red-200">{p.name}</div>
                                <div className="text-xs text-slate-400">{p.time_range}</div>
                                <p className="text-sm text-slate-400 mt-1">{p.description}</p>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="glass-card border-emerald-500/20">
                    <h3 className="text-emerald-400 flex items-center gap-2 mb-4 font-bold">
                        <Target size={20} /> High-Output Windows
                    </h3>
                    <ul className="space-y-3">
                        {analysis.high_output_windows.map((w, i) => (
                            <li key={i} className="bg-white/5 p-3 rounded-lg border border-white/5">
                                <div className="font-semibold text-emerald-200">{w.name}</div>
                                <div className="text-xs text-slate-400">{w.time_range}</div>
                                <p className="text-sm text-slate-400 mt-1">{w.description}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className="glass-card">
                <h3 className="text-purple-400 flex items-center gap-2 mb-6 font-bold">
                    <CalendarCheck size={20} /> Restructured Master Schedule
                </h3>
                <div className="overflow-hidden rounded-xl border border-white/10">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-white/5">
                            <tr>
                                <th className="p-4 text-sm font-semibold text-slate-300">Time</th>
                                <th className="p-4 text-sm font-semibold text-slate-300">Activity</th>
                                <th className="p-4 text-sm font-semibold text-slate-300">Strategy</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {analysis.restructured_schedule.map((s, i) => (
                                <tr key={i} className="hover:bg-white/5 transition-colors">
                                    <td className="p-4 text-emerald-400 font-medium tabular-nums">{s.time}</td>
                                    <td className="p-4 text-slate-200">{s.activity}</td>
                                    <td className="p-4 text-sm text-slate-400">{s.note}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default InsightCard;
