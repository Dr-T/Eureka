import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Mic } from 'lucide-react';

interface SubtitleViewProps {
  userText: string;
  modelText: string;
  isUserSpeaking?: boolean;
  isModelSpeaking: boolean;
}

export const SubtitleView: React.FC<SubtitleViewProps> = ({ 
  userText, 
  modelText, 
  isUserSpeaking,
  isModelSpeaking 
}) => {
  const modelTextRef = useRef<HTMLDivElement>(null);

  // Auto-scroll for long model text
  useEffect(() => {
    if (modelTextRef.current) {
      modelTextRef.current.scrollTop = modelTextRef.current.scrollHeight;
    }
  }, [modelText]);

  return (
    <div className="absolute inset-0 z-20 pointer-events-none flex flex-col justify-between pb-32 pt-24 px-4 md:px-12">
      
      {/* AI Model Output (The "Oracle" Voice) */}
      <div className="flex-1 flex items-center justify-center relative">
        <AnimatePresence mode="wait">
          {modelText && (
            <motion.div
              key="model-text"
              initial={{ opacity: 0, y: 10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, filter: 'blur(10px)' }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="max-w-4xl w-full text-center relative"
            >
              {/* Decorative Glow behind text */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-blue-900/20 blur-[100px] rounded-full -z-10"></div>
              
              <div 
                ref={modelTextRef}
                className="max-h-[50vh] overflow-y-auto scrollbar-hide"
              >
                <p className="text-2xl md:text-4xl lg:text-5xl font-serif italic leading-relaxed tracking-wide text-transparent bg-clip-text bg-gradient-to-b from-white via-blue-100 to-blue-300 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                  {modelText}
                </p>
              </div>
              
              {isModelSpeaking && (
                 <motion.div 
                   initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                   className="mt-4 flex justify-center items-center space-x-2"
                 >
                    <Sparkles size={16} className="text-blue-300 animate-pulse" />
                    <span className="text-[10px] uppercase tracking-[0.3em] text-blue-300/60 font-mono">
                      Stardust Transmitting
                    </span>
                    <Sparkles size={16} className="text-blue-300 animate-pulse" />
                 </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* User Input (The "Explorer" HUD) */}
      <div className="min-h-[80px] flex justify-center items-end">
        <AnimatePresence>
          {(userText || isUserSpeaking) && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="relative max-w-2xl w-full"
            >
              <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-xl p-4 shadow-[0_4px_30px_rgba(0,0,0,0.5)] flex items-start space-x-4">
                <div className="mt-1 min-w-[24px]">
                  <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center border border-blue-400/30">
                    <Mic size={12} className="text-blue-300" />
                  </div>
                </div>
                <div className="flex-1">
                   {/* Updated font class: Removed font-mono for general text to allow better Chinese character rendering, kept it only for structure/fallback */}
                   <p className="text-lg text-blue-100/90 leading-snug break-words font-sans tracking-wide">
                      {userText}
                      {/* Cursor for active input */}
                      <span className="inline-block w-2 h-5 ml-1 bg-blue-400/70 align-middle animate-pulse"></span>
                   </p>
                </div>
              </div>
              
              {/* Decorative HUD Lines */}
              <div className="absolute -top-2 left-4 w-2 h-2 border-t border-l border-blue-400/50"></div>
              <div className="absolute -top-2 right-4 w-2 h-2 border-t border-r border-blue-400/50"></div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};