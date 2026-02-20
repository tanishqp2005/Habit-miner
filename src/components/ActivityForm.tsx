import React, { useState } from 'react';
import { Clock, Zap, Activity, Send } from 'lucide-react';

interface ActivityFormProps {
    onAddLog: (log: any) => void;
    isSubmitting: boolean;
}

const ActivityForm: React.FC<ActivityFormProps> = ({ onAddLog, isSubmitting }) => {
    const [activity, setActivity] = useState('');
    const [duration, setDuration] = useState('30');
    const [energy, setEnergy] = useState('5');
    const [timestamp, setTimestamp] = useState(new Date().toISOString().slice(0, 16));

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onAddLog({
            activity_name: activity,
            duration: parseInt(duration),
            energy_level: parseInt(energy),
            timestamp: new Date(timestamp).toISOString()
        });
        setActivity('');
    };

    return (
        <form onSubmit={handleSubmit} className="glass-card animate-fade-in">
            <h2 className="title-gradient mb-6 text-2xl flex items-center gap-2">
                <Activity className="text-purple-400" /> Log Activity
            </h2>

            <div className="space-y-4">
                <div>
                    <label className="block text-sm text-slate-400 mb-1">Activity Name</label>
                    <input
                        type="text"
                        value={activity}
                        onChange={(e) => setActivity(e.target.value)}
                        placeholder="e.g. Deep Work, Email, Gym"
                        required
                    />
                </div>

                <div className="flex gap-4">
                    <div className="flex-1">
                        <label className="block text-sm text-slate-400 mb-1">Duration (min)</label>
                        <div className="relative">
                            <Clock className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
                            <input
                                type="number"
                                value={duration}
                                onChange={(e) => setDuration(e.target.value)}
                                className="pl-10"
                                required
                            />
                        </div>
                    </div>
                    <div className="flex-1">
                        <label className="block text-sm text-slate-400 mb-1">Energy (1-10)</label>
                        <div className="relative">
                            <Zap className="absolute left-3 top-3 w-4 h-4 text-amber-400" />
                            <input
                                type="number"
                                min="1"
                                max="10"
                                value={energy}
                                onChange={(e) => setEnergy(e.target.value)}
                                className="pl-10"
                                required
                            />
                        </div>
                    </div>
                </div>

                <div>
                    <label className="block text-sm text-slate-400 mb-1">Date & Time</label>
                    <input
                        type="datetime-local"
                        value={timestamp}
                        onChange={(e) => setTimestamp(e.target.value)}
                        required
                    />
                </div>

                <button type="submit" disabled={isSubmitting} className="w-full flex justify-center items-center gap-2">
                    {isSubmitting ? 'Logging...' : <><Send size={18} /> Add Entry</>}
                </button>
            </div>
        </form>
    );
};

export default ActivityForm;
