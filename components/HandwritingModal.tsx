import React, { useRef, useState, useEffect } from 'react';
import { XCircle, CheckCircle2, Repeat, Pen } from './Icons';

interface HandwritingModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (imageBase64: string) => void;
    isProcessing: boolean;
    error?: string | null;
}

export const HandwritingModal = ({ isOpen, onClose, onConfirm, isProcessing, error }: HandwritingModalProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [hasDrawing, setHasDrawing] = useState(false);

    // Initialize canvas size
    useEffect(() => {
        if (isOpen && containerRef.current && canvasRef.current) {
            const canvas = canvasRef.current;
            const container = containerRef.current;

            // precise sizing
            const rect = container.getBoundingClientRect();
            canvas.width = rect.width;
            canvas.height = rect.height; // Make it square-ish or fill container

            const ctx = canvas.getContext('2d');
            if (ctx) {
                ctx.lineCap = 'round';
                ctx.lineJoin = 'round';
                ctx.strokeStyle = '#fff'; // White ink for dark mode
                ctx.lineWidth = 4;
            }
        }
    }, [isOpen]);

    const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
        setIsDrawing(true);
        setHasDrawing(true);
        draw(e);
    };

    const stopDrawing = () => {
        setIsDrawing(false);
        const canvas = canvasRef.current;
        if (canvas) {
            const ctx = canvas.getContext('2d');
            if (ctx) ctx.beginPath(); // Reset path
        }
    };

    const draw = (e: React.MouseEvent | React.TouchEvent) => {
        if (!isDrawing) return;

        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const rect = canvas.getBoundingClientRect();
        let clientX, clientY;

        if ('touches' in e) {
            clientX = e.touches[0].clientX;
            clientY = e.touches[0].clientY;
        } else {
            clientX = (e as React.MouseEvent).clientX;
            clientY = (e as React.MouseEvent).clientY;
        }

        const x = clientX - rect.left;
        const y = clientY - rect.top;

        ctx.lineTo(x, y);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(x, y);
    };

    const clearCanvas = () => {
        const canvas = canvasRef.current;
        if (canvas) {
            const ctx = canvas.getContext('2d');
            if (ctx) {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
            }
            setHasDrawing(false);
        }
    };

    const handleConfirm = () => {
        const canvas = canvasRef.current;
        if (canvas) {
            // Get base64 string
            // Ideally we might want to invert colors if the model expects black on white,
            // but Gemini Vision usually handles white on black fine.
            // Let's send as is first.
            const dataUrl = canvas.toDataURL('image/png');
            onConfirm(dataUrl);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in">
            <div className="bg-slate-900 border border-slate-700 w-full max-w-md rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[500px]">
                {/* Header */}
                <div className="p-4 border-b border-white/10 flex items-center justify-between bg-slate-800/50">
                    <div className="flex items-center gap-2">
                        <Pen className="w-5 h-5 text-cyan-400" />
                        <h3 className="text-white font-bold">手写输入</h3>
                    </div>
                    <button onClick={onClose} disabled={isProcessing} className="text-slate-400 hover:text-white transition-colors">
                        <XCircle className="w-6 h-6" />
                    </button>
                </div>

                {/* Canvas Area */}
                <div ref={containerRef} className="flex-1 relative bg-slate-950 touch-none cursor-crosshair">
                    {error && (
                        <div className="absolute top-4 left-4 right-4 z-10 bg-rose-500/90 text-white p-3 rounded-xl text-sm flex items-center justify-between animate-in fade-in slide-in-from-top-2">
                            <span>{error}</span>
                            <button onClick={() => { }} className="text-white/80 hover:text-white"><XCircle className="w-4 h-4" /></button>
                        </div>
                    )}
                    {!hasDrawing && (
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <span className="text-slate-600 text-sm">在此区域书写...</span>
                        </div>
                    )}
                    <canvas
                        ref={canvasRef}
                        className="block w-full h-full"
                        onMouseDown={startDrawing}
                        onMouseUp={stopDrawing}
                        onMouseOut={stopDrawing}
                        onMouseMove={draw}
                        onTouchStart={startDrawing}
                        onTouchEnd={stopDrawing}
                        onTouchMove={draw}
                    />
                </div>

                {/* Footer */}
                <div className="p-4 border-t border-white/10 bg-slate-800/50 flex items-center justify-between gap-4">
                    <button
                        onClick={clearCanvas}
                        disabled={isProcessing}
                        className="flex items-center gap-2 px-4 py-2 rounded-xl text-slate-400 hover:bg-white/5 transition-colors"
                    >
                        <Repeat className="w-4 h-4" />
                        <span>重写</span>
                    </button>

                    <button
                        onClick={handleConfirm}
                        disabled={!hasDrawing || isProcessing}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white rounded-xl font-bold shadow-lg shadow-cyan-500/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-95"
                    >
                        {isProcessing ? (
                            <>
                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                <span>识别中...</span>
                            </>
                        ) : (
                            <>
                                <CheckCircle2 className="w-4 h-4" />
                                <span>确认输入</span>
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};
