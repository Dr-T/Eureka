import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// --- Inline Icons (No external dependencies) ---

const IconWrapper = ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        {children}
    </svg>
);

const Microscope = ({ className }: { className?: string }) => (
    <IconWrapper className={className}>
        <path d="M6 18h8" />
        <path d="M3 22h18" />
        <path d="M14 22a7 7 0 1 0 0-14h-1" />
        <path d="M9 14h2" />
        <path d="M9 12a2 2 0 0 1-2-2V6h6v4a2 2 0 0 1-2 2Z" />
        <path d="M12 6V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3" />
    </IconWrapper>
);

const Box = ({ className }: { className?: string }) => (
    <IconWrapper className={className}>
        <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
        <path d="m3.3 7 8.7 5 8.7-5" />
        <path d="M12 22V12" />
    </IconWrapper>
);

const Scale = ({ className }: { className?: string }) => (
    <IconWrapper className={className}>
        <path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" />
        <path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" />
        <path d="M7 21h10" />
        <path d="M12 3v18" />
        <path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2" />
    </IconWrapper>
);

const ArrowLeft = ({ className }: { className?: string }) => (
    <IconWrapper className={className}>
        <path d="m12 19-7-7 7-7" />
        <path d="M19 12H5" />
    </IconWrapper>
);

const Info = ({ className }: { className?: string }) => (
    <IconWrapper className={className}>
        <circle cx="12" cy="12" r="10" />
        <path d="M12 16v-4" />
        <path d="M12 8h.01" />
    </IconWrapper>
);

const Bot = ({ className }: { className?: string }) => (
    <IconWrapper className={className}>
        <rect width="18" height="10" x="3" y="11" rx="2" />
        <circle cx="12" cy="5" r="2" />
        <path d="M12 7v4" />
        <line x1="8" x2="8" y1="16" y2="16" />
        <line x1="16" x2="16" y1="16" y2="16" />
    </IconWrapper>
);

const Sparkles = ({ className }: { className?: string }) => (
    <IconWrapper className={className}>
        <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
        <path d="M5 3v4" />
        <path d="M9 5H5" />
    </IconWrapper>
);

const Eye = ({ className }: { className?: string }) => (
    <IconWrapper className={className}>
        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
        <circle cx="12" cy="12" r="3" />
    </IconWrapper>
);

const EyeOff = ({ className }: { className?: string }) => (
    <IconWrapper className={className}>
        <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
        <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
        <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
        <line x1="2" x2="22" y1="2" y2="22" />
    </IconWrapper>
);

// --- Oxygen Molecule Component ---
const OxygenMolecule = ({ className, style }: { className?: string, style?: React.CSSProperties }) => (
    <div className={`flex items-center justify-center ${className}`} style={style}>
        <div className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-rose-500 shadow-[0_0_5px_rgba(244,63,94,0.6)] animate-pulse"></div>
        <div className="w-2 h-1 bg-slate-400"></div>
        <div className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-rose-500 shadow-[0_0_5px_rgba(244,63,94,0.6)] animate-pulse" style={{ animationDelay: '0.1s' }}></div>
    </div>
);

// --- Main Page Component ---
export default function OneMoleOxygenLesson() {
    const navigate = useNavigate();
    const [viewMode, setViewMode] = useState<'macro' | 'micro'>('macro');
    const [moles, setMoles] = useState(1);

    // --- Agent Challenge Logic ---
    const [isAiControlling, setIsAiControlling] = useState(false);
    const [challengeMode, setChallengeMode] = useState(false);
    const [answerHidden, setAnswerHidden] = useState(false);
    const [aiMessage, setAiMessage] = useState("想试试你的直觉吗？点击“考考我”，我来出题！");

    // Constants
    const AVOGADRO = 6.02; // Simplified for display

    const startAiChallenge = () => {
        setIsAiControlling(true);
        setChallengeMode(true);
        setAnswerHidden(true);
        setAiMessage("好，注意看！我要开始调整氧气瓶了...");

        // Simulate AI thinking delay
        setTimeout(() => {
            // AI "Moves" the slider
            const randomMoles = Math.floor((Math.random() * 4.5 + 0.5) * 10) / 10;
            setMoles(randomMoles);
            setAiMessage(`搞定！现在的氧气瓶里有 ${randomMoles} mol 氧气。`);

            // AI asks question
            setTimeout(() => {
                setIsAiControlling(false);
                setAiMessage(`请心算：里面大概有多少个分子？算好后点击下方“揭晓答案”。`);
            }, 800);
        }, 1000);
    };

    const revealAnswer = () => {
        setAnswerHidden(false);
        setAiMessage("答对了吗？ 记住公式：N = n × NA 。");
    };

    const exitChallenge = () => {
        setChallengeMode(false);
        setAnswerHidden(false);
        setAiMessage("做得好！随时可以再来找我挑战。");
    };

    return (
        <div className="fixed inset-0 overflow-y-auto bg-slate-950 text-white font-sans selection:bg-cyan-500/30">

            {/* Header */}
            <header className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-white/10 px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <button onClick={() => navigate(-1)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                        <ArrowLeft className="w-5 h-5 text-slate-400" />
                    </button>
                    <h1 className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
                        微观探秘：1 mol 氧气
                    </h1>
                </div>
                <div className="text-xs text-slate-400 border border-slate-700 px-3 py-1 rounded-full">
                    必修一 / 2.3 物质的量
                </div>
            </header>

            <main className="max-w-4xl mx-auto p-6 space-y-12">

                {/* Section 1: The Core Question */}
                <section className="text-center space-y-4 pt-8">
                    <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">
                        1 mol 氧气到底有多少？
                    </h2>
                    <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto">
                        我们知道 1 mol 氧气重 32克，标准状况下体积是 22.4升。<br />
                        但如果我们要<span className="text-rose-400 font-bold">数一数</span>里面有多少个氧气分子呢？
                    </p>
                </section>

                {/* Section 2: Interactive Visualization (Macro vs Micro) */}
                <section className="relative bg-slate-900 rounded-3xl overflow-hidden border border-slate-800 shadow-2xl">
                    {/* Toggle Controls */}
                    <div className="absolute top-6 right-6 z-20 flex bg-slate-800/80 backdrop-blur rounded-full p-1 border border-slate-700">
                        <button
                            onClick={() => setViewMode('macro')}
                            className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${viewMode === 'macro' ? 'bg-cyan-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
                        >
                            宏观视角 (Macro)
                        </button>
                        <button
                            onClick={() => setViewMode('micro')}
                            className={`px-4 py-2 rounded-full text-sm font-bold transition-all flex items-center gap-2 ${viewMode === 'micro' ? 'bg-rose-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
                        >
                            <Microscope className="w-4 h-4" />
                            微观视角 (Micro)
                        </button>
                    </div>

                    {/* Visualization Area */}
                    <div className="h-[400px] md:h-[500px] relative flex items-center justify-center transition-all duration-1000 overflow-hidden">

                        {/* Background Grid */}
                        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px]"></div>

                        {/* MACRO VIEW: Gas Tank */}
                        <div className={`transition-all duration-700 transform ${viewMode === 'macro' ? 'scale-100 opacity-100' : 'scale-[3] opacity-0 blur-md'}`}>
                            <div className="relative group cursor-pointer" onClick={() => setViewMode('micro')}>
                                {/* The Gas Container */}
                                <div className="w-48 h-64 md:w-64 md:h-80 border-4 border-slate-600 bg-slate-800/30 rounded-2xl relative backdrop-blur-sm flex items-center justify-center overflow-hidden">
                                    <div className="absolute inset-0 bg-cyan-400/5 animate-pulse"></div>
                                    {/* Label */}
                                    <div className="text-center z-10">
                                        <h3 className="text-4xl font-black text-cyan-400 mb-2">O₂</h3>
                                        <div className="text-sm font-mono text-slate-300 bg-slate-900/80 px-3 py-1 rounded inline-block">
                                            Gas (g)
                                        </div>
                                    </div>
                                    {/* Floating Gas Particles Hint */}
                                    {[...Array(8)].map((_, i) => (
                                        <div key={i} className="absolute w-2 h-2 bg-slate-500/20 rounded-full animate-ping" style={{
                                            top: `${Math.random() * 80 + 10}%`,
                                            left: `${Math.random() * 80 + 10}%`,
                                            animationDuration: `${Math.random() * 2 + 2}s`
                                        }}></div>
                                    ))}
                                </div>
                                {/* Hover Hint */}
                                <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-cyan-400 text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                    点击放大观察微观世界
                                </div>
                            </div>
                        </div>

                        {/* MICRO VIEW: Molecules */}
                        <div className={`absolute inset-0 flex flex-wrap items-center justify-center content-center gap-8 md:gap-12 transition-all duration-700 ${viewMode === 'micro' ? 'opacity-100 scale-100' : 'opacity-0 scale-0 pointer-events-none'}`}>
                            {/* Generate many molecules */}
                            {[...Array(24)].map((_, i) => (
                                <OxygenMolecule
                                    key={i}
                                    className="transform transition-transform hover:scale-150 duration-300"
                                    style={{
                                        transform: `translate(${Math.random() * 20 - 10}px, ${Math.random() * 20 - 10}px) rotate(${Math.random() * 360}deg)`,
                                    }}
                                />
                            ))}
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent pointer-events-none"></div>
                            <div className="absolute bottom-10 text-center">
                                <h3 className="text-2xl font-bold text-rose-400 mb-2">这里有无数个氧气分子！</h3>
                                <p className="text-slate-300 text-sm">它们在不停地做无规则热运动</p>
                            </div>
                        </div>

                    </div>

                    {/* Stats Panel */}
                    <div className="bg-slate-800 border-t border-slate-700 p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center text-blue-400">
                                <Box className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="text-xs text-slate-400 uppercase font-bold tracking-wider">体积 (STP)</p>
                                <p className="text-xl font-mono text-white">{(moles * 22.4).toFixed(1)} L</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center text-purple-400">
                                <Scale className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="text-xs text-slate-400 uppercase font-bold tracking-wider">质量</p>
                                <p className="text-xl font-mono text-white">{(moles * 32).toFixed(1)} g</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 border-l-2 border-slate-700 pl-6 bg-slate-800/50 relative overflow-hidden group">
                            <div className={`absolute inset-0 bg-slate-900/90 flex items-center justify-center z-10 backdrop-blur-sm transition-all duration-300 ${answerHidden ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                                <div className="flex items-center gap-2 text-rose-400 font-bold">
                                    <EyeOff className="w-5 h-5" />
                                    <span>结果已隐藏</span>
                                </div>
                            </div>

                            <div className="w-12 h-12 bg-rose-500/20 rounded-xl flex items-center justify-center text-rose-400">
                                <Microscope className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="text-xs text-slate-400 uppercase font-bold tracking-wider">分子数 N</p>
                                <p className="text-xl font-mono text-rose-400 font-bold">{(moles * AVOGADRO).toFixed(2)} × 10²³ 个</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Section 3: Analogy (The Dozen vs The Mole) */}
                <section className="grid md:grid-cols-2 gap-8 items-center py-12">
                    <div className="space-y-6">
                        <div className="flex items-center gap-2 text-cyan-400 mb-2">
                            <Info className="w-5 h-5" />
                            <span className="font-bold uppercase tracking-wider text-sm">直观类比</span>
                        </div>
                        <h3 className="text-3xl font-bold text-white">
                            “摩尔”其实就是化学界的“打”
                        </h3>
                        <div className="space-y-4 text-slate-300 leading-relaxed">
                            <p>
                                如果你去买铅笔，你说“给我<b>一打</b>”，老板会给你 <b>12</b> 支。
                            </p>
                            <p>
                                如果你去买氧气分子，你说“给我<b>一摩尔</b>”，大自然会给你 <b>6.02 × 10²³</b> 个。
                            </p>
                            <p className="bg-slate-800/50 p-4 rounded-xl border-l-4 border-cyan-500">
                                <b>为什么这个数字这么大？</b><br />
                                因为分子太小了！我们需要凑齐足够多（约6000万亿亿个）的分子，才能凑出仅仅 32克 的重量。
                            </p>
                        </div>
                    </div>
                    <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800 relative">
                        {/* Comparison Cards */}
                        <div className="grid gap-4">
                            <div className="bg-slate-800 p-4 rounded-xl flex items-center justify-between group hover:bg-slate-700 transition-colors">
                                <div className="flex items-center gap-4">
                                    <div className="text-4xl">✏️</div>
                                    <div>
                                        <div className="font-bold text-white">1 打铅笔</div>
                                        <div className="text-xs text-slate-400">日常单位</div>
                                    </div>
                                </div>
                                <div className="text-2xl font-mono text-cyan-400 font-bold">12 <span className="text-sm text-slate-500">个</span></div>
                            </div>

                            <div className="flex justify-center text-slate-500">
                                <div className="w-0.5 h-8 bg-slate-700"></div>
                            </div>

                            <div className="bg-slate-800 p-4 rounded-xl flex items-center justify-between border-2 border-rose-500/20 group hover:border-rose-500/50 transition-colors">
                                <div className="flex items-center gap-4">
                                    <div className="text-4xl animate-pulse">⚛️</div>
                                    <div>
                                        <div className="font-bold text-white">1 mol 氧气</div>
                                        <div className="text-xs text-slate-400">化学单位</div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="text-2xl font-mono text-rose-400 font-bold">6.02 × 10²³ <span className="text-sm text-slate-500">个</span></div>
                                    <div className="text-[10px] text-slate-500">阿伏伽德罗常数 (NA)</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Section 4: Interactive Calculator with AI Agent Control */}
                <section className="bg-gradient-to-br from-indigo-900 to-slate-900 rounded-3xl p-8 border border-indigo-500/30 text-center space-y-8 relative overflow-hidden">
                    {/* AI Agent Avatar */}
                    <div className="flex flex-col items-center gap-4 relative z-10">
                        <div className="flex items-start gap-4 max-w-lg">
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 ${isAiControlling ? 'bg-rose-500 shadow-lg shadow-rose-500/50 scale-110' : 'bg-indigo-600 shadow-lg shadow-indigo-600/30'}`}>
                                <Bot className={`w-7 h-7 text-white ${isAiControlling ? 'animate-bounce' : ''}`} />
                            </div>
                            <div className="bg-white/10 backdrop-blur-md rounded-2xl rounded-tl-none p-4 text-left border border-white/5 relative">
                                <p className="text-sm md:text-base text-slate-100 leading-relaxed transition-all duration-300">
                                    {aiMessage}
                                </p>
                                {/* Triangle */}
                                <div className="absolute top-0 -left-2 w-0 h-0 border-t-[10px] border-t-white/10 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent transform -rotate-90"></div>
                            </div>
                        </div>

                        {!challengeMode && (
                            <button
                                onClick={startAiChallenge}
                                className="mt-2 px-6 py-2 bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-400 hover:to-orange-400 rounded-full font-bold text-white shadow-lg shadow-rose-500/30 flex items-center gap-2 transition-all active:scale-95"
                            >
                                <Sparkles className="w-4 h-4" />
                                考考我 (Agent Challenge)
                            </button>
                        )}
                    </div>

                    <div className="max-w-xl mx-auto space-y-8 relative z-10">
                        {/* Slider */}
                        <div className={`space-y-4 transition-all duration-500 ${isAiControlling ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}>
                            <div className="flex justify-between text-sm font-bold text-slate-400">
                                <span>0.1 mol</span>
                                <span>5.0 mol</span>
                            </div>
                            <input
                                type="range"
                                min="0.1"
                                max="5.0"
                                step="0.1"
                                value={moles}
                                onChange={(e) => {
                                    if (!challengeMode) {
                                        setMoles(parseFloat(e.target.value));
                                    }
                                }}
                                disabled={challengeMode}
                                className={`w-full h-4 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-500 hover:accent-cyan-400 transition-all ${isAiControlling ? 'accent-rose-500' : ''}`}
                            />
                            {isAiControlling && (
                                <div className="text-xs text-rose-400 animate-pulse font-bold">
                                    AI 正在调整数值...
                                </div>
                            )}
                        </div>

                        {/* Result Display */}
                        <div className="bg-slate-950/50 p-6 rounded-2xl border border-white/10 backdrop-blur-sm grid md:grid-cols-3 gap-4 items-center relative">

                            <div className="text-center">
                                <p className="text-slate-500 text-xs uppercase font-bold mb-1">物质的量 (n)</p>
                                <p className="text-4xl font-mono text-cyan-400 font-bold">{moles} <span className="text-lg">mol</span></p>
                            </div>

                            <div className="text-slate-600 font-black text-xl">× NA =</div>

                            <div className="text-center relative">
                                <p className="text-slate-500 text-xs uppercase font-bold mb-1">分子总数 (N)</p>

                                {/* Answer Mask */}
                                <div className={`absolute inset-0 bg-slate-900 flex flex-col items-center justify-center rounded-lg z-10 transition-all duration-500 ${answerHidden ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform -translate-y-2 pointer-events-none'}`}>
                                    <p className="text-rose-500 font-black text-2xl tracking-widest">???</p>
                                </div>

                                <p className="text-3xl font-mono text-rose-400 font-bold">
                                    {(moles * AVOGADRO).toFixed(2)} × 10²³
                                </p>
                            </div>
                        </div>

                        {/* Challenge Actions */}
                        {challengeMode && (
                            <div className="flex justify-center gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                {answerHidden ? (
                                    <button
                                        onClick={revealAnswer}
                                        className="px-8 py-3 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-cyan-500/20"
                                    >
                                        <Eye className="w-5 h-5" />
                                        揭晓答案
                                    </button>
                                ) : (
                                    <div className="flex gap-3">
                                        <button
                                            onClick={startAiChallenge}
                                            className="px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-xl font-bold transition-colors"
                                        >
                                            再来一题
                                        </button>
                                        <button
                                            onClick={exitChallenge}
                                            className="px-6 py-3 bg-rose-600 hover:bg-rose-500 text-white rounded-xl font-bold transition-colors"
                                        >
                                            退出挑战
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}

                        {!challengeMode && (
                            <div className="text-sm text-slate-400">
                                对应质量：<span className="text-white font-mono">{(moles * 32).toFixed(1)} g</span> &nbsp;|&nbsp;
                                对应体积(STP)：<span className="text-white font-mono">{(moles * 22.4).toFixed(1)} L</span>
                            </div>
                        )}
                    </div>
                </section>

                {/* Footer Quiz */}
                <div className="text-center pt-8 border-t border-slate-800">
                    <p className="text-slate-500 mb-4">学懂了吗？思考一下：</p>
                    <div className="inline-block bg-slate-800 px-6 py-3 rounded-full text-slate-300 hover:text-white transition-colors cursor-help">
                        ❓ 如果我有 2 mol 的水 (H₂O)，里面有多少个水分子？
                    </div>
                </div>

            </main>
        </div>
    );
}