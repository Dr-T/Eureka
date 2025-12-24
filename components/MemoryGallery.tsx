import React, { useMemo } from 'react';
import { Memory } from '../types';
import { ArrowLeft, Clock, Calendar, Activity, BookOpen, BrainCircuit, CheckCircle, RefreshCw, Atom } from 'lucide-react';

interface MemoryGalleryProps {
    memories: Memory[];
    onClose: () => void;
}

// Helper to calculate retention based on Ebbinghaus forgetting curve
// R = e^(-t/S), simplified for visualization
const calculateRetention = (days: number) => {
    // S is relative strength of memory, assume S=5 for this visualization
    return Math.exp(-days / 5);
};

const EbbinghausChart: React.FC<{ dateStr: string }> = ({ dateStr }) => {
    // 1. Calculate days elapsed
    const daysElapsed = useMemo(() => {
        try {
            const now = new Date();
            const currentYear = now.getFullYear();
            // Handle "MM/DD" format by appending current year
            const memDate = new Date(`${currentYear}/${dateStr}`);
            const diffTime = now.getTime() - memDate.getTime();
            const diffDays = diffTime / (1000 * 3600 * 24);
            return Math.max(0, diffDays);
        } catch (e) {
            return 1; // Default to 1 day if parsing fails
        }
    }, [dateStr]);

    // 2. SVG Dimensions
    const width = 260;
    const height = 50;
    const maxDays = 14; // Viewport of 2 weeks

    // 3. Generate Path Data
    const points = [];
    for (let x = 0; x <= width; x += 5) {
        const day = (x / width) * maxDays;
        const retention = calculateRetention(day); // 0..1
        const y = height * (1 - retention) + 5; // +5 padding
        points.push(`${x},${y}`);
    }
    const pathD = `M ${points.join(' L ')}`;

    // 4. Current Position Point
    const currentX = Math.min((daysElapsed / maxDays) * width, width);
    const currentRetention = calculateRetention(daysElapsed);
    const currentY = height * (1 - currentRetention) + 5;

    const retentionPercent = Math.round(currentRetention * 100);

    return (
        <div className="mb-6 p-4 bg-white/5 rounded-xl border border-white/5 relative overflow-hidden">
            {/* Header */}
            <div className="flex justify-between items-center mb-3">
                <div className="flex items-center text-[10px] text-purple-300 uppercase tracking-widest font-bold">
                    <BrainCircuit size={12} className="mr-2" /> 记忆保留率 (Retention)
                </div>
                <div className="text-xs font-mono text-purple-200">
                    {retentionPercent}%
                </div>
            </div>

            {/* Chart */}
            <div className="relative h-[60px] w-full">
                <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height + 10}`} className="overflow-visible">
                    {/* Gradient Defs */}
                    <defs>
                        <linearGradient id="curveGradient" x1="0" x2="1" y1="0" y2="0">
                            <stop offset="0%" stopColor="#8b5cf6" />
                            <stop offset="100%" stopColor="#3b82f6" />
                        </linearGradient>
                        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                            <feMerge>
                                <feMergeNode in="coloredBlur" />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>
                    </defs>

                    {/* The Curve */}
                    <path
                        d={pathD}
                        fill="none"
                        stroke="url(#curveGradient)"
                        strokeWidth="2"
                        filter="url(#glow)"
                        className="opacity-80"
                    />

                    {/* Current Position Dot */}
                    <circle cx={currentX} cy={currentY} r="3" fill="#fff" className="animate-pulse" />

                    {/* Current Position Drop Line */}
                    <line
                        x1={currentX} y1={currentY}
                        x2={currentX} y2={height + 10}
                        stroke="white"
                        strokeWidth="1"
                        strokeDasharray="2,2"
                        opacity="0.3"
                    />

                    {/* Axis Labels */}
                    <text x="0" y={height + 20} fill="#666" fontSize="8" fontFamily="monospace">Now</text>
                    <text x={width} y={height + 20} fill="#666" fontSize="8" fontFamily="monospace" textAnchor="end">14 Days</text>
                </svg>

                {/* Dynamic Label for elapsed time */}
                <div
                    className="absolute top-0 transform -translate-x-1/2 text-[9px] text-white/50 font-mono whitespace-nowrap bg-black/60 px-1 rounded backdrop-blur-sm border border-white/10"
                    style={{ left: currentX, top: currentY - 20 }}
                >
                    {daysElapsed < 1 ? 'Just now' : `${Math.floor(daysElapsed)}d ago`}
                </div>
            </div>
        </div>
    );
};

export const MemoryGallery: React.FC<MemoryGalleryProps> = ({ memories, onClose }) => {
    return (
        <div className="absolute inset-0 z-50 bg-slate-950 flex flex-col font-sans">
            {/* Background Ambient 
            <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-indigo-900/20 to-transparent pointer-events-none"></div>

            <div className="p-6 flex items-center justify-between border-b border-white/5 bg-slate-900/50 backdrop-blur-xl z-10 sticky top-0">
                <div className="flex items-center gap-4">
                    <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors group">
                        <ArrowLeft size={20} className="text-slate-400 group-hover:text-white transition-colors" />
                    </button>
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 rounded-lg flex items-center justify-center border border-cyan-500/30">
                            <BookOpen className="w-4 h-4 text-cyan-400" />
                        </div>
                        <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
                            知识结晶 <span className="text-sm font-light text-slate-500 ml-2 tracking-wider">KNOWLEDGE CRYSTALS</span>
                        </h1>
                    </div>
                </div>
            </div>
*/}
            <div className="flex-1 overflow-x-auto p-8 flex items-center space-x-8 scrollbar-hide">
                {memories.length === 0 && (
                    <div className="w-full text-center text-white/30 italic">
                        暂无知识结晶。请先完成一次费曼学习会话。
                    </div>
                )}

                {memories.map((mem) => (
                    <div key={mem.id} className="min-w-[400px] w-[400px] h-[650px] bg-slate-900/80 border border-slate-700/50 rounded-3xl flex flex-col relative group hover:border-cyan-500/50 transition-all duration-300 shadow-2xl backdrop-blur-xl hover:-translate-y-2 hover:shadow-[0_20px_50px_-12px_rgba(6,182,212,0.25)]">

                        {/* Header: Chapter and Metadata */}
                        <div className="px-8 py-6 border-b border-white/5 flex flex-col items-start gap-4">
                            <div className="flex justify-between w-full items-start">
                                <div className="px-3 py-1 bg-gradient-to-r from-indigo-500/10 to-blue-500/10 border border-indigo-500/20 rounded-full text-[10px] text-indigo-300 tracking-wider font-bold uppercase flex items-center shadow-inner shadow-indigo-500/5">
                                    <BookOpen size={10} className="mr-2 text-indigo-400" />
                                    {mem.chapter}
                                </div>
                                <div className="flex items-center space-x-3 text-xs text-slate-500 font-mono">
                                    <span className="flex items-center"><Calendar size={12} className="mr-1.5" /> {mem.date}</span>
                                </div>
                            </div>

                            {/* Mastery Status Badges */}
                            {mem.status === 'mastered' && (
                                <div className="flex items-center text-[10px] text-emerald-400 font-bold tracking-wider bg-emerald-500/10 px-2 py-1 rounded border border-emerald-500/20">
                                    <CheckCircle size={12} className="mr-1.5" /> 已熟练掌握 (Mastered)
                                </div>
                            )}
                            {mem.status === 'review_needed' && (
                                <div className="flex items-center text-[10px] text-amber-400 font-bold tracking-wider bg-amber-500/10 px-2 py-1 rounded border border-amber-500/20">
                                    <RefreshCw size={12} className="mr-1.5" /> 加入下一轮复习 (Review Queue)
                                </div>
                            )}
                        </div>

                        {/* Content */}
                        <div className="p-8 flex-1 flex flex-col overflow-y-auto custom-scrollbar">
                            <h3 className="text-2xl font-bold text-white mb-4 leading-tight group-hover:text-cyan-200 transition-colors tracking-tight">{mem.title}</h3>

                            <p className="text-sm text-slate-300/80 line-clamp-4 leading-relaxed font-light mb-8 italic pl-4 border-l-2 border-slate-700 group-hover:border-cyan-500/50 transition-colors">
                                "{mem.content}"
                            </p>

                            {/* Scores */}
                            {mem.assessment && (
                                <div className="grid grid-cols-3 gap-4 mb-6 p-4 bg-white/5 rounded-xl border border-white/5">
                                    <div className="text-center">
                                        <div className="text-xl font-mono text-white mb-1">{mem.assessment.formulaUnderstanding}</div>
                                        <div className="text-[9px] text-white/40 uppercase tracking-widest">公式</div>
                                    </div>
                                    <div className="text-center border-l border-white/10">
                                        <div className="text-xl font-mono text-white mb-1">{mem.assessment.logicRigor}</div>
                                        <div className="text-[9px] text-white/40 uppercase tracking-widest">逻辑</div>
                                    </div>
                                    <div className="text-center border-l border-white/10">
                                        <div className="text-xl font-mono text-white mb-1">{mem.assessment.application}</div>
                                        <div className="text-[9px] text-white/40 uppercase tracking-widest">应用</div>
                                    </div>
                                </div>
                            )}

                            {/* Ebbinghaus Forgetting Curve */}
                            <EbbinghausChart dateStr={mem.date} />

                            {mem.assessment?.advice && (
                                <div className="mt-auto pt-4 border-t border-white/10">
                                    <div className="text-[10px] text-emerald-400/80 uppercase tracking-widest mb-3 flex items-center font-bold">
                                        <Activity size={12} className="mr-2" /> 落地建议 (Next Steps)
                                    </div>
                                    <p className="text-xs text-white/70 leading-relaxed font-sans text-justify">
                                        {mem.assessment.advice}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};