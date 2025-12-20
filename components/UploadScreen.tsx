import React from 'react';
import { Orbit, Upload } from 'lucide-react';

interface UploadScreenProps {
  onImageSelect: (file: File) => void;
}

export const UploadScreen: React.FC<UploadScreenProps> = ({ onImageSelect }) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onImageSelect(e.target.files[0]);
    }
  };

  return (
    <div className="absolute inset-0 z-40 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="relative group p-[1px] rounded-xl bg-gradient-to-b from-blue-500/20 to-purple-500/5 overflow-hidden">
        <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
        <div className="bg-black/90 px-12 py-16 rounded-xl flex flex-col items-center text-center border border-white/10">
          <div className="w-20 h-20 mb-6 rounded-full bg-white/5 flex items-center justify-center border border-white/10 shadow-[0_0_15px_rgba(100,200,255,0.1)]">
            <Orbit className="text-blue-300/70 animate-spin-slow" size={32} />
          </div>
          <h2 className="text-3xl font-serif text-white mb-2 italic tracking-wide">Newton's Stardust</h2>
          <p className="text-blue-200/50 text-xs font-mono tracking-widest uppercase mb-6">Feynman Learning Module</p>
          <p className="text-white/50 text-sm max-w-xs mb-8 leading-relaxed">
            Upload your physics notes or textbook snapshot.
            I will test your understanding of Gravity & Kepler's Laws through the cosmos.
          </p>
          
          <label className="relative cursor-pointer group/btn">
            <span className="px-8 py-3 bg-white text-black text-sm font-medium rounded-full group-hover/btn:bg-blue-100 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.2)]">
              Initialize Knowledge
            </span>
            <input 
              type="file" 
              accept="image/*" 
              onChange={handleFileChange} 
              className="hidden" 
            />
          </label>
        </div>
      </div>
    </div>
  );
};